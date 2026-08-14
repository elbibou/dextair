(() => {
  const frame = document.getElementById('app');
  function install(d){
    if(!d || d.getElementById('dextairMobileResponsive')) return;
    const style = d.createElement('style');
    style.id = 'dextairMobileResponsive';
    style.textContent = `
      html{scroll-behavior:smooth}
      body{overflow-x:hidden}
      img,svg,video,canvas{max-width:100%;height:auto}
      button,input,select{font-size:16px}
      button{min-height:44px;touch-action:manipulation}
      input,select{min-height:46px}
      .wrap, main section, .showcase-section, .terminal-section{width:min(1180px,92vw)}
      .booking,.checkout-panel,.departure-option,.connection-card,.tool-box{max-width:100%}
      .seat-map-wrap,.seat-map,.destination-grid{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}

      @media (max-width:900px){
        .utility-inner{align-items:flex-start}
        .utility-links{gap:10px}
        header{padding:0 4vw}
        header nav{display:none!important}
        .hero{min-height:auto;padding-bottom:48px}
        .wrap{padding-top:122px}
        .hero h1{font-size:clamp(42px,10vw,64px)}
        .lead{font-size:16px;line-height:1.5}
        .booking{margin-top:28px;border-radius:16px}
        .grid{grid-template-columns:1fr 1fr!important;padding:16px;gap:12px}
        .search{width:100%;min-height:48px}
        .tabs,.trip-tabs{overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch}
        .product-tabs{display:flex;overflow-x:auto;gap:8px;-webkit-overflow-scrolling:touch}
        .product-tab{min-width:max-content}
        .promo,.twocol,.terminal-section,.manage-grid{grid-template-columns:1fr!important}
        .fleet-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
        .extras{grid-template-columns:1fr!important}
        .checkout{align-items:stretch;flex-direction:column;gap:12px}
        .checkout button{width:100%}
        .showcase-head{align-items:flex-start!important;flex-direction:column!important}
      }

      @media (max-width:600px){
        .utilitybar{padding:8px 4vw}
        .utility-inner{display:block}
        .utility-links{margin-top:6px;display:flex;overflow-x:auto;white-space:nowrap;padding-bottom:2px}
        header{top:58px;height:64px;padding:0 4vw}
        header .brand-logo img{width:46px;height:46px}
        .brand-name{font-size:18px}
        .brand-tagline{font-size:9px}
        header button{padding:9px 12px}
        .wrap{width:92vw;padding-top:142px}
        .hero h1{font-size:44px;line-height:1.02}
        .hero-logo-chip{max-width:100%}
        .grid{grid-template-columns:1fr!important;padding:14px}
        .trip-tabs{padding:0 14px}
        .trip-tab{margin-right:18px}
        .tabs{padding:14px}
        .perks{padding:12px 14px;line-height:1.6}
        main section,.showcase-section,.terminal-section{width:92vw;padding:48px 0}
        h2{font-size:30px;line-height:1.08}
        .destination-grid,.fleet-grid,.cards,.twocol,.terminal-facts,.summary-grid,.traveler-form{grid-template-columns:1fr!important}
        .departure-option,.connection-card,.tool-box{border-radius:14px;padding:16px!important}
        .result-top,.top{align-items:flex-start;gap:10px;flex-direction:column}
        .times{grid-template-columns:1fr!important;gap:8px!important;margin:16px 0!important}
        .times .line{display:none}
        .times strong{font-size:26px}
        .fares{grid-template-columns:1fr!important}
        .fares button{min-height:74px}
        .segment{grid-template-columns:1fr!important;gap:8px}
        .segment-mid{text-align:left!important}
        .segment-line{display:none}
        .checkout-modal{padding:0;align-items:flex-end}
        .checkout-panel{width:100vw;max-width:none;max-height:94vh;border-radius:20px 20px 0 0;padding:20px 16px calc(20px + env(safe-area-inset-bottom));}
        .checkout-actions{position:sticky;bottom:0;background:#fff;padding-top:12px;flex-direction:column-reverse}
        .checkout-actions button{width:100%;min-height:48px}
        .seat-map-wrap{margin-left:-4px;margin-right:-4px;padding-bottom:8px}
        .seat-btn{min-width:38px;min-height:38px}
        .seat-passenger-tabs{overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch}
        .fleet-total{width:100%;min-width:0}
        .terminal-visual{height:260px}
        footer{padding:24px 4vw calc(24px + env(safe-area-inset-bottom));gap:10px}
      }

      @media (max-width:400px){
        .wrap,main section,.showcase-section,.terminal-section{width:94vw}
        .hero h1{font-size:38px}
        .brand-tagline{display:none}
        .departure-option{padding:14px!important}
        .flight-option-label{font-size:9px}
        .times strong{font-size:24px}
        .status-line{align-items:flex-start;flex-direction:column}
      }
    `;
    d.head.appendChild(style);
  }
  if(frame){
    frame.addEventListener('load',()=>install(frame.contentDocument));
    if(frame.contentDocument?.readyState==='complete') install(frame.contentDocument);
  } else if(document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded',()=>install(document));
  } else install(document);
})();
