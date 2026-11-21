/* Persian / Arabic-Indic digits.
   <input type="number"> silently drops "۱۲۳", so on a Persian keyboard nothing could be typed.
   The number fields become text fields with a numeric keypad (inputmode) and every digit typed or
   pasted is converted to 0-9 on the fly. The calculator and other text fields get the same digit conversion. */
(function () {
  var DIGITS = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
                 '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
  function digitsOnly(s) { return s.replace(/[۰-۹٠-٩]/g, function (c) { return DIGITS[c]; }); }
  function numberText(s) {
    return digitsOnly(s).replace(/٫/g, '.').replace(/[−–—]/g, '-').replace(/٬/g, '').replace(/[^0-9.\-]/g, '');
  }
  function calcText(s) { return digitsOnly(s).replace(/٪/g, '%').replace(/٫/g, '.'); }

  function prepare(input) {
    if (!input || input.nodeName !== 'INPUT' || input.getAttribute('data-digits')) return;
    if (input.id === 'toolSearch') return;
    if (input.type === 'number') {
      input.type = 'text';
      input.setAttribute('inputmode', 'decimal');
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('data-digits', 'number');
    } else if (input.type === 'text') {
      input.setAttribute('data-digits', input.id === 'calculatorDisplay' ? 'calc' : 'text');
    }
  }
  function scan(root) {
    if (root.nodeName === 'INPUT') prepare(root);
    if (root.querySelectorAll) root.querySelectorAll('input').forEach(prepare);
  }

  document.addEventListener('input', function (e) {
    var el = e.target, mode = el && el.getAttribute && el.getAttribute('data-digits');
    if (!mode || e.isComposing) return;
    var before = el.value;
    var after = mode === 'number' ? numberText(before) : mode === 'calc' ? calcText(before) : digitsOnly(before);
    if (after === before) return;
    var pos = el.selectionStart;
    el.value = after;
    if (pos !== null && pos !== undefined) { var p = Math.max(0, pos - (before.length - after.length)); try { el.setSelectionRange(p, p); } catch (err) {} }
  }, true);

  scan(document.body);
  new MutationObserver(function (list) {
    list.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) scan(n); }); });
  }).observe(document.body, { childList: true, subtree: true });
})();
