/* Feedback popup: the "suggestion" and "report a problem" buttons open a small dialog
   with the author's messenger links instead of sending people to GitHub Issues. */
(function () {
  var dialog = document.getElementById('feedbackDialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;   // no <dialog>: the plain links still work
  var ID = '@mmdd_223';
  function en() { return document.documentElement.lang === 'en'; }
  function t(fa, en_) { return en() ? en_ : fa; }
  var $ = function (id) { return document.getElementById(id); };

  var COPY = {
    suggestion: {
      title: ['💡 ثبت پیشنهاد', '💡 Send a suggestion'],
      text: ['پیشنهادت را در یکی از پیام‌رسان‌های زیر برای من بفرست.', 'Send me your suggestion on any of these messengers.'],
      note: ['مثلاً ابزاری که دوست داری به سایت اضافه شود.', 'For example, a tool you would like to see on the site.']
    },
    report: {
      title: ['🐞 گزارش مشکل', '🐞 Report a problem'],
      text: ['مشکل را در یکی از پیام‌رسان‌های زیر برای من بفرست.', 'Send me the problem on any of these messengers.'],
      note: ['اگر می‌شود، عکس صفحه، نام ابزار و مدل گوشی یا مرورگرت را هم بفرست.', 'If you can, include a screenshot, the tool name and your phone or browser.']
    }
  };

  function open(kind) {
    var c = COPY[kind] || COPY.suggestion;
    $('fbTitle').textContent = t(c.title[0], c.title[1]);
    $('fbText').textContent = t(c.text[0], c.text[1]);
    $('fbNote').textContent = t(c.note[0], c.note[1]);
    $('fbIdLabel').textContent = t('آیدی من در هر سه:', 'My username on all three:');
    $('fbCopy').textContent = t('کپی آیدی', 'Copy');
    $('fbClose').setAttribute('aria-label', t('بستن', 'Close'));
    dialog.querySelector('.fb-telegram span').textContent = t('تلگرام', 'Telegram');
    dialog.querySelector('.fb-bale span').textContent = t('بله', 'Bale');
    dialog.querySelector('.fb-eitaa span').textContent = t('ایتا', 'Eitaa');
    dialog.showModal();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-feedback]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.getAttribute('data-feedback'));
  });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  $('fbClose').addEventListener('click', function () { dialog.close(); });

  $('fbCopy').addEventListener('click', function () {
    var btn = this;
    function done(ok) {
      btn.textContent = ok ? t('کپی شد ✓', 'Copied ✓') : t('کپی نشد', 'Could not copy');
      setTimeout(function () { btn.textContent = t('کپی آیدی', 'Copy'); }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ID).then(function () { done(true); }, function () { done(false); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = ID; document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (err) {}
      ta.remove(); done(ok);
    }
  });
})();
