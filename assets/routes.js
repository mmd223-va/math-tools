/* Turns the single-page tool switching into real URLs.
   Every page contains the same app; body[data-tool] says which tool this URL opens. */
(function () {
  var ROUTES = {
    'sequence-calculator': '/sequence-calculator/',
    'factorization': '/prime-factorization/',
    'calculator': '/calculator/',
    'fractions': '/fractions/',
    'gcd': '/gcd-lcm/',
    'prime': '/prime-checker/',
    'sieve': '/sieve-of-eratosthenes/',
    'extra-percent': '/percentage/',
    'extra-average': '/average/',
    'extra-equation': '/linear-equation/',
    'extra-quadratic': '/quadratic-equation/',
    'extra-base': '/number-base-converter/',
    'extra-line': '/line-equation/',
    'extra-simplify': '/simplify-fraction/',
    'extra-geometry': '/area-perimeter/',
    'extra-comb': '/permutation-combination/',
    'extra-ratio': '/rule-of-three/',
    'extra-system': '/linear-system/'
  };
  var here = document.body.getAttribute('data-tool') || 'home';
  var origShow = window.showPage;
  var origExtra = window.openExtra;

  window.showPage = function (id) {
    if (id === here) return origShow.apply(this, arguments);
    if (id === 'home') { location.href = '/'; return; }
    if (ROUTES[id]) { location.href = ROUTES[id]; return; }
    return origShow.apply(this, arguments);
  };

  window.openExtra = function (kind) {
    var id = 'extra-' + kind;
    if (id !== here && ROUTES[id]) { location.href = ROUTES[id]; return; }
    return origExtra.apply(this, arguments);
  };

  // Pages for the two generated tools (percentage, average) are built by JS.
  if (here === 'extra-percent') origExtra('percent');
  if (here === 'extra-average') origExtra('average');
  if (here === 'extra-equation') origExtra('equation');
  if (here === 'extra-quadratic') window.openMathTool('quadratic');
  if (here === 'extra-base') window.openMathTool('base');
  ['line', 'simplify', 'geometry', 'comb', 'ratio', 'system'].forEach(function (k) {
    if (here === 'extra-' + k) window.openMathTool(k);
  });
})();

/* brand name follows the language toggle */
(function () {
  function brand() {
    var b = document.querySelector('.brand-name');
    if (b) b.textContent = document.documentElement.lang === 'en' ? 'Math Tools' : 'ابزارهای ریاضی';
  }
  brand();
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'languageToggle') setTimeout(brand, 80);
  });
})();
