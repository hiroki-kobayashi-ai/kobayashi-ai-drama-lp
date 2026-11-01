// 訪問・ボタンの計測（GA4）。流入元は ?src=mail などで区別
(function(){
  var GA_ID = "G-7YJV2J75LX";
  var src = "";
  try{ src = new URLSearchParams(location.search).get("src") || ""; if(src){ sessionStorage.setItem("src", src); } else { src = sessionStorage.getItem("src") || ""; } }catch(e){}
  window.__src = src;
  var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || []; function gtag(){ dataLayer.push(arguments); } window.gtag = gtag;
  gtag("js", new Date());
  var cfg = {}; if(src){ cfg.campaign_source = src; cfg.campaign_medium = (src==="mail"?"email":"referral"); }
  gtag("config", GA_ID, cfg);
  function send(n){ gtag("event", n, src ? {src: src} : {}); }
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a"); if(!a) return;
    var h = a.getAttribute("href") || "";
    if(h.indexOf("mailto:") === 0) send("drama_mail");
    else if(h.indexOf("tel:") === 0) send("drama_tel");
  }, true);
  document.addEventListener("play", function(e){ if(e.target.tagName==="VIDEO") send("video_play_" + (e.target.getAttribute("src")||"").replace(/^media\/|\.mp4$/g,"")); }, true);
})();
