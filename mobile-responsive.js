(() => {
  const frame = document.getElementById('app');
  function install(d){
    if(!d || d.getElementById('dextairMobileResponsive')) return;
    const style = d.createElement('style');
    style.id = 'dextairMobileResponsive';
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box;min-width:0}
      html,body{width:100%;max-width:100%;margin:0;overflow-x:clip;overscroll-behavior-x:none}
      body{position:relative}
      img,svg,video,canvas{max-width:100%;height:auto}
      button,input,select{font-size:16px;max-width:100%}
      button{min-height:44px;touch-action:manipulation}
      input,select{min-height:46px}
      .wrap,main section,.showcase-section,.terminal-section{width:min(1180px,calc(100% - 32px));max-width:100%;margin-left:auto;margin-right:auto}
      .booking,.checkout-panel,.departure-option,.connection-card,.tool-box,.promo,.twocol,.fleet-grid,.cards,.manage-grid{width:100%;max-width:100%}
      .seat-map-wrap{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
      .seat-map{width:max-content;max-width:none}
      .destination-grid{max-width:100%;overflow-x:hidden}

      @media (max-width:900px){
        .utility-inner{align-items:flex-start;max-width:100%}
        .utility-links{gap:10px;flex-wrap:wrap}
        header{padding-left:16px;padding-right:16px;max-width:100%}
        header nav{display:none!important}
        .hero{min-height:auto;padding-bottom:48px;overflow-x:clip}
        .wrap{padding-top:122px}
        .hero h1{font-size:clamp(42px,10vw,64px);overflow-wrap:anywhere}
        .lead{font-size:16px;line-height:1.5}
        .booking{margin-top:28px;border-radius:16px}
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
        html,body{width:100%;max-width:100%;overflow-x:clip!important}
        .utilitybar{padding:8px 14px;max-width:100%;overflow:hidden}
        .utility-inner{display:block;width:100%;max-width:100%}
        .utility-links{margin-top:6px;display:flex;flex-wrap:wrap;gap:6px 10px;white-space:normal;overflow:visible;padding-bottom:2px}
        .utility-links a{max-width:100%;overflow-wrap:anywhere}
        header{top:74px;height:64px;padding-left:14px;padding-right:14px;width:100%;max-width:100%}
        header .brand-logo img{width:46px;height:46px}
        .brand-logo,.brand-text{min-width:0}
        .brand-name{font-size:18px}
        .brand-tagline{font-size:9px}
        header button{padding:9px 12px;flex:0 0 auto}
        .wrap,main section,.showcase-section,.terminal-section{width:calc(100% - 24px);max-width:100%;margin-left:auto;margin-right:auto}
        .wrap{padding-top:158px}
        .hero h1{font-size:42px;line-height:1.02;max-width:100%}
        .hero-logo-chip{max-width:100%;flex-wrap:wrap}
        .grid{grid-template-columns:1fr!important;padding:14px;width:100%}
        .trip-tabs{padding:0 14px}
        .trip-tab{margin-right:0}
        .tabs{padding:14px}
        .perks{padding:12px 14px;line-height:1.6}
        main section,.showcase-section,.terminal-section{padding-top:48px;padding-bottom:48px}
        h2{font-size:30px;line-height:1.08;overflow-wrap:anywhere}
        .destination-grid,.fleet-grid,.cards,.twocol,.terminal-facts,.summary-grid,.traveler-form{grid-template-columns:1fr!important}
        .departure-option,.connection-card,.tool-box{border-radius:14px;padding:16px!important;width:100%;max-width:100%;overflow:hidden}
        .result-top,.top{align-items:flex-start;gap:10px;flex-direction:column}
        .times{grid-template-columns:1fr!important;gap:8px!important;margin:16px 0!important;width:100%}
        .times .line{display:none}
        .times strong{font-size:26px}
        .fares{grid-template-columns:1fr!important;width:100%}
        .fares button{min-height:74px;width:100%}
        .segment{grid-template-columns:1fr!important;gap:8px;width:100%}
        .segment-mid{text-align:left!important}
        .segment-line{display:none}
        .checkout-modal{padding:0;align-items:flex-end;overflow-x:hidden}
        .checkout-panel{width:100%;max-width:100%;max-height:94vh;border-radius:20px 20px 0 0;padding:20px 16px calc(20px + env(safe-area-inset-bottom));overflow-x:hidden}
        .checkout-actions{position:sticky;bottom:0;background:#fff;padding-top:12px;flex-direction:column-reverse}
        .checkout-actions button{width:100%;min-height:48px}
        .seat-map-wrap{width:100%;max-width:100%;margin-left:0;margin-right:0;padding-bottom:8px}
        .seat-btn{min-width:38px;min-height:38px}
        .seat-passenger-tabs{display:flex;flex-wrap:wrap;white-space:normal;overflow:visible}
        .fleet-total{width:100%;min-width:0}
        .terminal-visual{height:260px;width:100%;max-width:100%}
        footer{padding:24px 14px calc(24px + env(safe-area-inset-bottom));gap:10px;max-width:100%;overflow:hidden}
      }

      @media (max-width:400px){
        .wrap,main section,.showcase-section,.terminal-section{width:calc(100% - 20px)}
        .hero h1{font-size:36px}
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
