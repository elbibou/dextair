(() => {
  const frame = document.getElementById('app');
  function install(d){
    if(!d || d.getElementById('dextairMobileResponsive')) return;
    const style = d.createElement('style');
    style.id = 'dextairMobileResponsive';
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box;min-width:0}
      html,body{width:100%;max-width:100%;margin:0;overflow-x:hidden;overscroll-behavior-x:none}
      body{position:relative;-webkit-text-size-adjust:100%;text-size-adjust:100%}
      img,svg,video,canvas{max-width:100%;height:auto}
      button,input,select{font-size:16px;max-width:100%}
      button{min-height:44px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
      input,select{min-height:46px}
      .wrap,main section,.showcase-section,.terminal-section{width:min(1180px,calc(100% - 32px));max-width:100%;margin-left:auto;margin-right:auto}
      .booking,.checkout-panel,.departure-option,.connection-card,.tool-box,.promo,.twocol,.fleet-grid,.cards,.manage-grid{width:100%;max-width:100%}
      .seat-map-wrap{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
      .seat-map{width:max-content;max-width:none}
      .destination-grid{max-width:100%;overflow-x:hidden}

      @media (max-width:900px){
        .utility-inner{align-items:flex-start;max-width:100%}
        .utility-links{gap:8px 12px;flex-wrap:wrap}
        header{padding-left:16px;padding-right:16px;max-width:100%}
        header nav{display:none!important}
        .hero{min-height:auto;padding-bottom:40px;overflow-x:hidden}
        .wrap{padding-top:118px}
        .hero h1{font-size:clamp(40px,9vw,62px);overflow-wrap:anywhere}
        .lead{font-size:16px;line-height:1.5}
        .booking{margin-top:24px;border-radius:16px}
        .grid{grid-template-columns:1fr 1fr!important;padding:16px;gap:12px}
        .grid>*{min-width:0}
        .search{width:100%;min-height:48px}
        .tabs,.trip-tabs,.product-tabs{display:flex;flex-wrap:wrap;white-space:normal;overflow:visible;gap:8px}
        .product-tab,.trip-tab{min-width:0;max-width:100%}
        .promo,.twocol,.terminal-section,.manage-grid{grid-template-columns:1fr!important}
        .fleet-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
        .extras{grid-template-columns:1fr!important}
        .checkout{align-items:stretch;flex-direction:column;gap:12px}
        .checkout button{width:100%}
        .showcase-head{align-items:flex-start!important;flex-direction:column!important}
      }

      @media (max-width:600px){
        html,body{width:100%;max-width:100%;overflow-x:hidden!important}
        body{touch-action:pan-y}
        .utilitybar{padding:7px 12px;max-width:100%;overflow:hidden}
        .utility-inner{display:block;width:100%;max-width:100%}
        .utility-links{margin-top:4px;display:flex;flex-wrap:wrap;gap:4px 10px;white-space:normal;overflow:visible;padding-bottom:0}
        .utility-links a{max-width:100%;overflow-wrap:anywhere;font-size:11px}
        header{top:66px;height:60px;padding-left:12px;padding-right:12px;width:100%;max-width:100%}
        header .brand-logo img{width:42px;height:42px}
        .brand-logo,.brand-text{min-width:0}
        .brand-name{font-size:17px}
        .brand-tagline{font-size:8px}
        header button{padding:8px 11px;flex:0 0 auto;min-height:42px}
        .wrap,main section,.showcase-section,.terminal-section{width:calc(100% - 20px);max-width:100%;margin-left:auto;margin-right:auto}
        .wrap{padding-top:146px}
        .hero h1{font-size:38px;line-height:1.03;max-width:100%;margin-bottom:10px}
        .lead{font-size:15px}
        .hero-logo-chip{max-width:100%;flex-wrap:wrap}
        .booking{border-radius:14px}
        .grid{grid-template-columns:1fr!important;padding:12px;width:100%;gap:10px}
        .grid label{width:100%}
        .grid input,.grid select,.search{width:100%}
        .trip-tabs{padding:0 12px}
        .trip-tab{margin-right:0;padding:13px 4px 11px}
        .tabs{padding:12px;gap:6px 10px}
        .perks{padding:10px 12px;line-height:1.55;font-size:12px}
        main section,.showcase-section,.terminal-section{padding-top:42px;padding-bottom:42px}
        h2{font-size:28px;line-height:1.1;overflow-wrap:anywhere}
        .destination-grid,.fleet-grid,.cards,.twocol,.terminal-facts,.summary-grid,.traveler-form{grid-template-columns:1fr!important}
        .departure-option,.connection-card,.tool-box{border-radius:14px;padding:14px!important;width:100%;max-width:100%;overflow:hidden}
        .result-top,.top{align-items:flex-start;gap:8px;flex-direction:column}
        .times{grid-template-columns:1fr!important;gap:6px!important;margin:14px 0!important;width:100%}
        .times .line{display:none}
        .times strong{font-size:24px}
        .fares{grid-template-columns:1fr!important;width:100%;gap:10px}
        .fares button{min-height:68px;width:100%;padding:13px}
        .segment{grid-template-columns:1fr!important;gap:6px;width:100%}
        .segment-mid{text-align:left!important}
        .segment-line{display:none}
        .checkout-modal{padding:0;align-items:flex-end;overflow-x:hidden}
        .checkout-panel{width:100%;max-width:100%;max-height:92dvh;border-radius:20px 20px 0 0;padding:18px 14px calc(18px + env(safe-area-inset-bottom));overflow-x:hidden}
        .checkout-actions{position:sticky;bottom:0;background:#fff;padding-top:10px;flex-direction:column-reverse}
        .checkout-actions button{width:100%;min-height:48px}
        .seat-map-wrap{width:100%;max-width:100%;margin-left:0;margin-right:0;padding-bottom:8px}
        .seat-btn{min-width:40px;min-height:40px}
        .seat-passenger-tabs{display:flex;flex-wrap:wrap;white-space:normal;overflow:visible}
        .fleet-total{width:100%;min-width:0}
        .terminal-visual{height:230px;width:100%;max-width:100%}
        .terminal-sign{font-size:28px}
        .boarding-pass-body{grid-template-columns:1fr 1fr!important;gap:8px!important}
        .boarding-pass-head{gap:10px;align-items:flex-start;flex-wrap:wrap}
        .booking-card{padding:14px!important;overflow:hidden}
        footer{padding:22px 12px calc(22px + env(safe-area-inset-bottom));gap:8px;max-width:100%;overflow:hidden;flex-direction:column;align-items:flex-start}
      }

      @media (max-width:400px){
        .wrap,main section,.showcase-section,.terminal-section{width:calc(100% - 16px)}
        .hero h1{font-size:34px}
        .brand-tagline{display:none}
        .departure-option{padding:12px!important}
        .flight-option-label{font-size:9px}
        .times strong{font-size:22px}
        .status-line{align-items:flex-start;flex-direction:column}
        .boarding-pass-body{grid-template-columns:1fr!important}
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
