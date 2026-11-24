/* Result text mixes Persian words with left-to-right maths ("مساحت = (10 + 6) × 4 ÷ 2").
   In a right-to-left paragraph the browser reorders such formulas and they read wrongly.
   Every formula-like run is wrapped in a left-to-right isolate so it keeps its own order. */
(function () {
  var LRI = '\u2066', PDI = '\u2069';
  function isolateLTR(text) {
    if (text.indexOf(LRI) !== -1) return text;
    return text.replace(/[^\u0600-\u06FF\u200c\n]+/g, function (run) {
      var m = run.match(/^([\s:.,;)\]»]*)([\s\S]*?)([\s:.,;(\[«]*)$/);
      var core = m[2];
      if (!/[A-Za-z0-9]/.test(core)) return run;
      return m[1] + LRI + core + PDI + m[3];
    });
  }
  var busy = false;
  function fix() {
    var el = document.getElementById('extraResult');
    if (!el || busy) return;
    var s = el.textContent, out = isolateLTR(s);
    if (out === s) return;
    busy = true; el.textContent = out; busy = false;
  }
  new MutationObserver(function () { if (!busy) fix(); })
    .observe(document.body, { childList: true, subtree: true, characterData: true });
})();
