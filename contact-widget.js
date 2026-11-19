// 採用LP（見本・スターターセット案内）用の「その場で相談」ブロック（2026-11-17 マキ）
// 見本を見た人が、ページを離れずに当社へ連絡できるようにする。
// 送信先：Googleフォーム「AIドラマ お問い合わせフォーム」（トップLPの #f と同じ）
// 計測：rk_contact_view / rk_contact_focus / rk_contact_submit / rk_bar_tap（src・page付き）
(function(){
  var FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSeqSxdcoNQ-sN2IJBdm4KhVXFNYUgRdQEr5HMT94SdHyJz-og/formResponse';
  var TEL = '050-3696-4531', MAIL = 'drama@kobayashijuku.co.jp';
  var s = document.currentScript;
  var after = s && s.getAttribute('data-after');          // このIDの要素の直後に入れる
  var replace = s && s.getAttribute('data-replace');      // このIDの要素と入れ替える
  var kind = (s && s.getAttribute('data-kind')) || '採用まるごとスターターセット';
  var title = (s && s.getAttribute('data-title')) || 'この採用ページと採用ドラマを、御社でも。';
  var barText = (s && s.getAttribute('data-bar')) || 'この採用ページを御社でも';
  var phName = (s && s.getAttribute('data-ph-name')) || '例：牧野 太郎';
  var phOrg = (s && s.getAttribute('data-org-label')) || '会社名・牧場名・事業所名';
  var phMsg = (s && s.getAttribute('data-ph-msg')) || '例：うちの牧場でも作りたい／料金をもう少し聞きたい';
  var moreHref = s && s.getAttribute('data-more-href');   // 料金・制作の流れへのリンク（任意）
  var moreLabel = (s && s.getAttribute('data-more-label')) || '料金・制作の流れを詳しく見る';
  var campaign = s && s.getAttribute('data-campaign');
  var why = s && s.getAttribute('data-why');              // 「なぜ専用ページが要るか」の説明（任意・HTML）    // キャンペーンの一文（任意）
  var page = location.pathname;
  function src(){ return window.__src || ''; }
  function ev(n, extra){ if(window.gtag){ var p = {src: src(), page: page}; for(var k in (extra||{})) p[k] = extra[k]; gtag('event', n, p); } }

  var css = document.createElement('style');
  css.textContent =
    '#rk-contact{background:#FFF6DF;color:#1E2B25;padding:56px 20px 64px;font-family:inherit;line-height:1.8}' +
    '#rk-contact .rk-w{max-width:720px;margin:0 auto}' +
    '#rk-contact .rk-tag{display:inline-block;background:#17402F;color:#fff;font-weight:900;font-size:14px;padding:4px 14px;border-radius:999px}' +
    '#rk-contact h2{font-weight:900;font-size:34px;line-height:1.35;margin:12px 0 8px;color:#17402F}' +
    '#rk-contact .rk-lead{font-size:18px;font-weight:700;margin:0 0 20px}' +
    '#rk-contact .rk-tel{display:flex;align-items:center;justify-content:center;gap:10px;background:#17402F;color:#fff;text-decoration:none;font-weight:900;font-size:22px;border-radius:14px;min-height:64px;padding:12px}' +
    '#rk-contact .rk-telnote{text-align:center;font-size:15px;margin:6px 0 22px;color:#5B6A63}' +
    '#rk-contact form{background:#fff;border:3px solid #E0A526;border-radius:20px;padding:26px;display:flex;flex-direction:column;gap:16px}' +
    '#rk-contact label{display:flex;flex-direction:column;gap:6px;font-weight:900;font-size:18px}' +
    '#rk-contact label i{font-style:normal;font-size:13px;font-weight:700;color:#fff;background:#C0392B;border-radius:6px;padding:1px 8px;margin-left:6px}' +
    '#rk-contact label i.o{background:#8A948F}' +
    '#rk-contact input,#rk-contact textarea{font:inherit;font-weight:500;font-size:18px;padding:13px;border:2px solid #B9B4A6;border-radius:12px;min-height:54px;width:100%;box-sizing:border-box}' +
    '#rk-contact button{font:inherit;font-weight:900;font-size:22px;background:#E0A526;color:#1E2B25;border:none;border-radius:14px;min-height:64px;cursor:pointer}' +
    '#rk-contact .rk-why{background:#fff;border-radius:16px;padding:18px 20px;margin:0 0 18px;border:2px solid #17402F}' +
    '#rk-contact .rk-why h3{margin:0 0 8px;font-size:20px;font-weight:900;color:#17402F;line-height:1.5}' +
    '#rk-contact .rk-why ol{margin:0;padding-left:1.3em}#rk-contact .rk-why li{margin:6px 0;font-size:16px}#rk-contact .rk-why li b{color:#17402F}' +
    '#rk-contact .rk-why p{margin:10px 0 0;font-size:15px;color:#5B6A63}' +
    '#rk-contact .rk-camp{background:#fff;border:3px dashed #C0392B;border-radius:16px;padding:14px 18px;margin:0 0 14px;font-weight:700;font-size:17px;line-height:1.7}' +
    '#rk-contact .rk-camp b{color:#C0392B;font-size:20px}' +
    '#rk-contact .rk-more{display:flex;align-items:center;justify-content:center;background:#fff;color:#17402F;border:3px solid #17402F;text-decoration:none;font-weight:900;font-size:19px;border-radius:14px;min-height:58px;padding:10px;margin:0 0 22px}' +
    '#rk-contact .rk-small{font-size:15px;color:#5B6A63;margin:0}' +
    '#rk-contact .rk-done{background:#E7EFE9;border-radius:14px;padding:18px;font-size:18px;font-weight:700;color:#17402F}' +
    '#rk-bar{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#17402F;color:#fff;display:flex;gap:8px;align-items:center;justify-content:center;padding:8px 10px calc(8px + env(safe-area-inset-bottom));box-shadow:0 -4px 16px rgba(0,0,0,.18);font-family:inherit}' +
    '#rk-bar span{font-weight:700;font-size:14px}' +
    '#rk-bar a{background:#E0A526;color:#1E2B25;text-decoration:none;font-weight:900;font-size:16px;border-radius:999px;padding:10px 18px;white-space:nowrap}' +
    '#rk-bar a.t{background:#fff;color:#17402F}' +
    'body{padding-bottom:72px}' +
    '@media (max-width:640px){#rk-contact h2{font-size:27px}#rk-bar span{display:none}}';
  document.head.appendChild(css);

  var box = document.createElement('section');
  box.id = 'rk-contact';
  box.innerHTML =
    '<div class="rk-w">' +
    '<span class="rk-tag">ここからは、制作会社（小林塾）へのご相談です</span>' +
    '<h2>' + title + '</h2>' +
    '<p class="rk-lead">見本を見て「うちでも」と思ったら、お電話か下の欄から。御社用の構成案（あらすじ）を無料でお送りします。お名前と連絡先だけで送れます。</p>' +
    (why ? '<div class="rk-why">' + why + '</div>' : '') +
    (campaign ? '<div class="rk-camp">' + campaign + '</div>' : '') +
    (moreHref ? '<a class="rk-more" id="rk-more" href="' + moreHref + '">' + moreLabel + ' →</a>' : '') +
    '<a class="rk-tel" href="tel:' + TEL.replace(/-/g,'') + '">📞 電話で相談する　' + TEL + '</a>' +
    '<p class="rk-telnote">担当：小林（AIショートドラマ制作）／ つながらないときは折り返します</p>' +
    '<form id="rk-form" novalidate>' +
    '<label><span>お名前<i>必須</i></span><input name="name" autocomplete="name" placeholder="' + phName + '"></label>' +
    '<label><span>' + phOrg + '<i class="o">任意</i></span><input name="company" autocomplete="organization"></label>' +
    '<label><span>電話番号またはメールアドレス<i>必須</i></span><input name="contact" autocomplete="email" inputmode="email" placeholder="どちらか1つでOKです"></label>' +
    '<label><span>ひとこと<i class="o">任意</i></span><textarea name="msg" rows="3" placeholder="' + phMsg + '"></textarea></label>' +
    '<button type="submit">無料で相談する（送信）</button>' +
    '<p class="rk-small">送信ボタンを押すだけで届きます。2営業日以内にご連絡します。メールの方は ' + MAIL + ' へ直接でも大丈夫です。</p>' +
    '</form></div>';

  var target = replace ? document.getElementById(replace) : (after ? document.getElementById(after) : null);
  if(target && replace){ target.parentNode.replaceChild(box, target); }
  else if(target){ target.parentNode.insertBefore(box, target.nextSibling); }
  else { var ft = document.querySelector('footer'); ft ? ft.parentNode.insertBefore(box, ft) : document.body.appendChild(box); }

  var more = document.getElementById('rk-more');
  if(more){ more.addEventListener('click', function(){ ev('rk_more_tap'); var sv = src() || 'souzoku_lp'; if(sv){ var u = new URL(more.href, location.href); if(!u.searchParams.get('src')) u.searchParams.set('src', sv); more.href = u.toString(); } }); }

  var bar = document.createElement('div');
  bar.id = 'rk-bar';
  bar.innerHTML = '<span>' + barText + '</span><a href="#rk-contact" data-b="form">無料で相談する</a><a class="t" href="tel:' + TEL.replace(/-/g,'') + '" data-b="tel">📞 電話</a>';
  document.body.appendChild(bar);
  bar.addEventListener('click', function(e){ var a = e.target.closest('a'); if(a) ev('rk_bar_tap', {btn: a.getAttribute('data-b')}); });

  if('IntersectionObserver' in window){
    var seen = false, io = new IntersectionObserver(function(es){ es.forEach(function(x){ if(x.isIntersecting && !seen){ seen = true; ev('rk_contact_view'); io.disconnect(); } }); }, {threshold: .3});
    io.observe(box);
  }

  var f = document.getElementById('rk-form'), focused = false;
  f.addEventListener('focusin', function(){ if(!focused){ focused = true; ev('rk_contact_focus'); } });
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var g = function(n){ return (f.elements[n].value || '').trim(); };
    var c = g('contact');
    if(!g('name') || !c){ alert('お名前と、電話番号またはメールアドレスを入れてください。'); return; }
    var isMail = c.indexOf('@') > 0;
    if(isMail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)){ alert('メールアドレスの形式をご確認ください。'); return; }
    if(!isMail && c.replace(/[^0-9]/g,'').length < 10){ alert('電話番号をご確認ください（市外局番から）。'); return; }
    var btn = f.querySelector('button'); if(btn.disabled) return; btn.disabled = true; btn.textContent = '送信中…';
    var p = new URLSearchParams();
    p.append('entry.1691360468', g('name'));
    p.append('entry.1948089370', g('company'));
    p.append('entry.2136815444', isMail ? c : '');
    p.append('entry.738409487', isMail ? '' : c);
    p.append('entry.241276529', '【' + kind + '・見本ページから】' + (g('msg') || '構成案希望') + '（ページ：' + page + '）');
    p.append('entry.648404663', kind);
    p.append('entry.1668225913', (src() || '(なし)') + '|rk' + page);
    fetch(FORM, {method:'POST', mode:'no-cors', body:p})
      .then(function(){
        ev('rk_contact_submit', {contact_type: isMail ? 'mail' : 'tel'});
        f.innerHTML = '<div class="rk-done">送信しました。ありがとうございます。<br>2営業日以内に、小林からご連絡します。<br>お急ぎの方はお電話で：' + TEL + '</div>';
      })
      .catch(function(){ btn.disabled = false; btn.textContent = '無料で相談する（送信）'; alert('通信エラーで送れませんでした。お手数ですが ' + TEL + ' へお電話いただくか、' + MAIL + ' へメールでお送りください。'); });
  });

  // 見本の応募フォーム（デモ）を押した人は、そのまま当社の相談欄へ案内する
  window.__rkGo = function(){ ev('rk_demo_to_contact'); box.scrollIntoView({behavior:'smooth', block:'start'}); };
})();
