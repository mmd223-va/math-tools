/* Feedback popup: tabs (suggestion / problem), a message box, optional technical info and
   the author's messenger links. Clicking a messenger copies the composed text and opens the chat. */
(function () {
  var dialog = document.getElementById('feedbackDialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;   // no <dialog>: the plain links still work
  var ID = '@mmdd_223', kind = 'suggestion', toastTimer = null;
  function en() { return document.documentElement.lang === 'en'; }
  function t(fa, en_) { return en() ? en_ : fa; }
  var $ = function (id) { return document.getElementById(id); };

  var COPY = {
    suggestion: {
      badge: '💡',
      title: ['ثبت پیشنهاد', 'Send a suggestion'],
      text: ['ایده‌ات را بنویس؛ از هر پیشنهادی ممنون می‌شوم.', 'Write your idea; every suggestion helps.'],
      ph: ['مثلاً: ابزار تبدیل واحد هم اضافه شود…', 'e.g. please add a unit converter…'],
      head: ['💡 پیشنهاد', '💡 Suggestion']
    },
    report: {
      badge: '🐞',
      title: ['گزارش مشکل', 'Report a problem'],
      text: ['بنویس چه اتفاقی افتاد و کدام ابزار بود.', 'Tell me what happened and which tool it was.'],
      ph: ['مثلاً: در ماشین‌حساب با زدن = جواب نمی‌آید…', 'e.g. the calculator shows nothing when I press =…'],
      head: ['🐞 گزارش مشکل', '🐞 Problem report']
    }
  };

  function setKind(k) {
    kind = COPY[k] ? k : 'suggestion';
    var c = COPY[kind];
    $('fbBadge').textContent = c.badge;
    $('fbTitle').textContent = t(c.title[0], c.title[1]);
    $('fbText').textContent = t(c.text[0], c.text[1]);
    $('fbMessage').setAttribute('placeholder', t(c.ph[0], c.ph[1]));
    $('fbTabS').setAttribute('aria-selected', String(kind === 'suggestion'));
    $('fbTabR').setAttribute('aria-selected', String(kind === 'report'));
    $('fbTech').checked = kind === 'report';
  }
  function labels() {
    $('fbTabS').textContent = t('💡 پیشنهاد', '💡 Suggestion');
    $('fbTabR').textContent = t('🐞 مشکل', '🐞 Problem');
    $('fbMsgLabel').textContent = t('۱. پیامت را بنویس', '1. Write your message');
    $('fbTechLabel').textContent = t('اطلاعات فنی (آدرس صفحه، مرورگر و اندازهٔ صفحه) هم ضمیمه شود', 'Attach technical info (page address, browser and screen size)');
    $('fbStep').textContent = t('۲. پیام‌رسانت را انتخاب کن؛ متن خودکار کپی می‌شود و کافی است در گفتگو Paste کنی.', '2. Pick your messenger; the text is copied automatically, just paste it in the chat.');
    $('fbIdLabel').textContent = t('آیدی من در هر سه:', 'My username on all three:');
    $('fbCopy').textContent = t('کپی آیدی', 'Copy');
    $('fbClose').setAttribute('aria-label', t('بستن', 'Close'));
    dialog.querySelector('.fb-telegram .fb-name').textContent = t('تلگرام', 'Telegram');
    dialog.querySelector('.fb-bale .fb-name').textContent = t('بله', 'Bale');
    dialog.querySelector('.fb-eitaa .fb-name').textContent = t('ایتا', 'Eitaa');
  }
  function toast(msg) {
    var el = $('fbToast');
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 6000);
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return false; });
    }
    return new Promise(function (resolve) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove(); resolve(ok);
    });
  }
  function compose() {
    var msg = $('fbMessage').value.trim();
    var lines = [];
    lines.push(kind === 'report' ? t('گزارش مشکل — ابزارهای ریاضی', 'Problem report — Math Tools') : t('پیشنهاد — ابزارهای ریاضی', 'Suggestion — Math Tools'));
    if (msg) lines.push('', msg);
    if ($('fbTech').checked) {
      lines.push('', '— — —',
        t('صفحه: ', 'Page: ') + location.href,
        t('مرورگر: ', 'Browser: ') + String(navigator.userAgent).slice(0, 180),
        t('اندازهٔ صفحه: ', 'Screen: ') + window.innerWidth + '×' + window.innerHeight,
        t('تم: ', 'Theme: ') + (document.body.classList.contains('dark') ? t('تیره', 'dark') : t('روشن', 'light')));
    }
    return { text: lines.join('\n'), hasMessage: !!msg };
  }

  function open(k) {
    labels(); setKind(k);
    $('fbToast').hidden = true;
    dialog.showModal();
    setTimeout(function () { $('fbMessage').focus(); }, 30);
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-feedback]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.getAttribute('data-feedback'));
  });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  $('fbClose').addEventListener('click', function () { dialog.close(); });
  $('fbTabS').addEventListener('click', function () { setKind('suggestion'); });
  $('fbTabR').addEventListener('click', function () { setKind('report'); });

  dialog.querySelectorAll('.fb-link').forEach(function (a) {
    a.addEventListener('click', function () {            // the link opens in a new tab as usual
      var c = compose();
      copyText(c.text).then(function (ok) {
        if (ok) toast(c.hasMessage ? t('متن کپی شد؛ در گفتگو Paste کن و بفرست.', 'Text copied; paste it in the chat and send.')
                                   : t('اطلاعات فنی کپی شد؛ پیامت را هم در گفتگو بنویس.', 'Technical info copied; add your message in the chat.'));
        else toast(t('کپی خودکار انجام نشد؛ پیامت را در گفتگو بنویس.', 'Could not copy automatically; write your message in the chat.'));
      });
    });
  });
  $('fbCopy').addEventListener('click', function () {
    var btn = this;
    copyText(ID).then(function (ok) {
      btn.textContent = ok ? t('کپی شد ✓', 'Copied ✓') : t('کپی نشد', 'Could not copy');
      setTimeout(function () { btn.textContent = t('کپی آیدی', 'Copy'); }, 1600);
    });
  });
})();
