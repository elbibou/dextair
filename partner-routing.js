(() => {
  // Fictional Dextair codeshare/interline layer for the airline simulation.
  // Partner sectors are marketed by Dextair and operated by American Airlines.
  const partnerAirports = [
    {code:'BWI',city:'Baltimore',country:'United States',duration:155,tz:0},
    {code:'SMF',city:'Sacramento',country:'United States',duration:335,tz:-180},
    {code:'SJC',city:'San Jose',country:'United States',duration:335,tz:-180},
    {code:'ORF',city:'Norfolk / Virginia Beach',country:'United States',duration:135,tz:0},
    {code:'BDL',city:'Hartford',country:'United States',duration:180,tz:0},
    {code:'PVD',city:'Providence',country:'United States',duration:185,tz:0},
    {code:'OMA',city:'Omaha',country:'United States',duration:205,tz:-60},
    {code:'TUL',city:'Tulsa',country:'United States',duration:190,tz:-60},
    {code:'BOI',city:'Boise',country:'United States',duration:300,tz:-120}
  ];
  const partnerByCode = Object.fromEntries(partnerAirports.map(a => [a.code,a]));
  const partnerAircraft = ['Boeing 737-800','Airbus A320-200','Boeing 737-800'];

  if (typeof airports === 'undefined' || typeof airportMap === 'undefined' || typeof routeFreq === 'undefined' || typeof aircraftPlans === 'undefined') return;

  partnerAirports.forEach(p => {
    if (!airportMap[p.code]) {
      const a={code:p.code,city:p.city,country:p.country,type:'partner'};
      airports.push(a);
      airportMap[p.code]=a;
    }
    // Three daily partner-operated codeshare opportunities provide useful FLL bank connectivity.
    routeFreq[p.code]=21;
    aircraftPlans[p.code]=partnerAircraft.slice();
  });

  const originalMinutesFor = minutesFor;
  minutesFor = function(code){ return partnerByCode[code]?.duration ?? originalMinutesFor(code); };

  const originalTzOffsetMinutes = tzOffsetMinutes;
  tzOffsetMinutes = function(code,date){ return partnerByCode[code]?.tz ?? originalTzOffsetMinutes(code,date); };

  const originalMakeSegment = makeSegment;
  makeSegment = function(from,to,date,time,index,direction){
    const s=originalMakeSegment(from,to,date,time,index,direction);
    const other=from==='FLL'?to:from;
    const p=partnerByCode[other];
    if(!p) return s;
    const seed=hashString(`${other}-${dateISO(date)}-${direction}-${index}`);
    s.partner=true;
    s.operator='American Airlines';
    s.operatingCarrier='AA';
    s.partnerFlightNo=1000+(seed%7000);
    // Dextair-marketed codeshare number. Keeps the reservation, seat and check-in flow unified.
    s.flightNo=8000+(seed%900);
    return s;
  };

  // Keep same-day FLL connections, but also publish protected overnight options when
  // the banks do not line up. This is especially important for west-to-Florida trips
  // such as LAX -> FLL -> TPA, where the inbound transcon reaches FLL in the evening.
  const originalBuildOptions = buildOptions;
  buildOptions = function(from,to,date){
    const options=originalBuildOptions(from,to,date);
    if(from==='FLL'||to==='FLL') return options;

    const nextDate=addDays(date,1);
    if(nextDate>SIM_END) return options;
    const firstTimes=timesFor(from,date,'in');
    const secondTimes=timesFor(to,nextDate,'out');
    const intl=INTERNATIONAL.has(from)||INTERNATIONAL.has(to);
    const minConnect=intl?120:75;
    const maxOvernight=900; // up to 15 hours, still sold as one protected itinerary
    const overnight=[];

    firstTimes.forEach((t1,i)=>{
      const s1=makeSegment(from,'FLL',date,t1,i,'in');
      const arr=arrivalRawMinutes(s1);
      secondTimes.forEach((t2,j)=>{
        const connection=(1440+t2)-arr;
        if(connection<minConnect||connection>maxOvernight)return;
        const s2=makeSegment('FLL',to,nextDate,t2,j,'out');
        const p1=priceFor(from,date,i,'in',s1.aircraft);
        const p2=priceFor(to,nextDate,j,'out',s2.aircraft);
        overnight.push({
          segments:[s1,s2],
          connection,
          overnightConnection:true,
          totalMinutes:minutesFor(from)+connection+minutesFor(to),
          price:Math.max(149,Math.round((p1+p2)*.84)),
          label:'1 stop via FLL · overnight'
        });
      });
    });

    overnight.sort((a,b)=>a.connection-b.connection||a.price-b.price);
    return [...options,...overnight.slice(0,3)];
  };

  const originalSegmentHTML = segmentHTML;
  segmentHTML = function(s){
    let html=originalSegmentHTML(s);
    if(!s.partner) return html;
    const needle=`<b>DX ${s.flightNo}</b>`;
    const replacement=`<b>DX ${s.flightNo} · American partner</b><small class="partner-operator">Operated by American Airlines · AA ${s.partnerFlightNo}</small>`;
    return html.replace(needle,replacement);
  };

  const originalGateForFlight = gateForFlight;
  gateForFlight = function(f){
    if(f?.partner || f?.operator==='American Airlines') return {terminal:'Terminal 4',gate:String(40+(Number(f.flightNo)||0)%6+1)};
    return originalGateForFlight(f);
  };

  renderDestinations = function(filter='all'){
    const grid=document.getElementById('destinationGrid'); if(!grid)return;
    const list=airports.filter(a=>a.code!=='FLL'&&(filter==='all'||a.type===filter));
    grid.innerHTML=list.map(a=>{
      const label=a.type==='international'?'International':a.type==='shuttle'?'Dextair Shuttle':a.type==='partner'?'American partner':'Mainline';
      return `<article class="destination-card"><span class="tag ${a.type==='partner'?'partner-tag':''}">${label}</span><b>${a.city} (${a.code})</b><small>${a.country}${a.type==='partner'?' · bookable on Dextair codeshare':''}</small></article>`;
    }).join('');
  };

  function appendPartnerOptions(){
    ['from','to'].forEach(id=>{
      const select=document.getElementById(id); if(!select || select.querySelector('option[data-partner="1"]'))return;
      const group=document.createElement('optgroup');group.label='American Airlines partner destinations';
      partnerAirports.forEach(p=>{const o=document.createElement('option');o.value=p.code;o.dataset.partner='1';o.textContent=`${p.city} (${p.code}) · American partner`;group.appendChild(o);});
      select.appendChild(group);
    });
    const perks=document.querySelector('.perks');
    if(perks && !perks.dataset.partnerNote){perks.dataset.partnerNote='1';perks.insertAdjacentHTML('beforeend',' · <b>American Airlines partner connections available</b>');}
  }
  appendPartnerOptions();

  const style=document.createElement('style');
  style.textContent=`.partner-operator{display:block;color:#6f7681;margin-top:4px;font-weight:800}.partner-tag{color:#1d4f91!important}.partner-note{background:#f2f6fb;border:1px solid #d9e4f2;border-radius:12px;padding:10px 12px;color:#31455f;font-size:12px;font-weight:800;margin:10px 0}.overnight-note{background:#fff8e8;border-color:#ead8a6;color:#6b5420}`;
  document.head.appendChild(style);

  const originalOptionHTML = optionHTML;
  optionHTML = function(opt,index,leg){
    let html=originalOptionHTML(opt,index,leg);
    if(opt.overnightConnection){
      const h=Math.floor(opt.connection/60),m=opt.connection%60;
      html=html.replace(`Connect at FLL · ${opt.connection} minutes`,`Overnight connection at FLL · ${h}h ${m}m · protected itinerary`);
      html=html.replace('<div class="result-top">','<div class="partner-note overnight-note">This itinerary connects the following morning at FLL. The connection remains protected on one Dextair reservation.</div><div class="result-top">');
    }
    if(opt.segments?.some(s=>s.partner)){
      html=html.replace('<div class="result-top">','<div class="partner-note">Through-ticketed Dextair itinerary with an American Airlines-operated codeshare segment. Bags and connection protection carry through the reservation.</div><div class="result-top">');
    }
    return html;
  };

  confirmationText = function(ref,first,last){
    const segs=selectedSegments(),n=travelerCount();let lines=[`Dextair booking ${ref}`,`${first} ${last}`,`Route: ${document.getElementById('sumRoute').textContent}`,`Total: $${bookingState.total}`,''];
    segs.forEach(s=>{const seats=bookingState.seats[segmentKey(s)]||{};const op=s.partner?` · operated by American Airlines (AA ${s.partnerFlightNo})`:'';lines.push(`DX ${s.flightNo} ${s.from}-${s.to} on ${s.date} at ${hhmm(s.time)} · ${s.aircraft}${op}${s.heritage?' · Heritage special flight':''}`);lines.push(`Seats: ${Array.from({length:n},(_,i)=>`Traveler ${i+1} ${seats[i]}`).join(', ')}`);});
    lines.push('','Free checked bag · Free carry-on · Free seat selection','Partner-operated segments remain on the same Dextair reservation and are protected for connections.','This is a fictional Dextair booking confirmation.');return lines.join('\n');
  };

  emailHTML = function(ref,first,last){return `<h2>Dextair booking confirmed</h2><p>Thanks, ${first}. Your fictional Dextair booking <b>${ref}</b> is confirmed.</p><p><b>${document.getElementById('sumRoute').textContent}</b><br>Total: $${bookingState.total}</p><p>${selectedSegments().map(s=>`DX ${s.flightNo} ${s.from}→${s.to} · ${s.date} ${hhmm(s.time)} · ${s.aircraft}${s.partner?` · operated by American Airlines (AA ${s.partnerFlightNo})`:''}${s.heritage?' · Heritage special flight':''}`).join('<br>')}</p><p>Free checked bag · Free carry-on · Free seat selection</p><p>Partner-operated segments stay on the same protected Dextair itinerary.</p><small>Fictional Dextair booking website.</small>`;};
})();
