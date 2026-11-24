/* Extra tools: quadratic equation solver and number-base converter.
   They reuse the markup and classes of the site's existing "extra" tools. */
(function () {
  'use strict';
  function isEn() { return document.documentElement.lang === 'en'; }
  function t(fa, en) { return isEn() ? en : fa; }
  function fmt(n) {
    var out;
    if (!isFinite(n)) out = String(n);
    else if (Number.isInteger(n)) out = String(n);
    else out = String(parseFloat(n.toFixed(6)));
    return out.replace('-', '\u2212');
  }
  function sgn(n) { return n < 0 ? '(' + fmt(n) + ')' : fmt(n); }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function latinDigits(s) {
    return s.replace(/[\u06F0-\u06F9]/g, function (c) { return String(c.charCodeAt(0) - 0x06F0); })
            .replace(/[\u0660-\u0669]/g, function (c) { return String(c.charCodeAt(0) - 0x0660); });
  }
  function record(tool, detail, result) {
    try {
      var k = 'mathToolsHistoryV1', h = JSON.parse(localStorage.getItem(k) || '[]');
      h.unshift({ tool: tool, detail: detail, result: result, time: new Date().toLocaleString('fa-IR') });
      localStorage.setItem(k, JSON.stringify(h.slice(0, 50)));
    } catch (e) {}
  }

  function runQuadratic() {
    var sa = val('exA'), sb = val('exB'), sc = val('exC');
    if (!sa || !sb || !sc) return { text: t('هر سه مقدار را وارد کن.', 'Enter all three values.') };
    var a = Number(sa), b = Number(sb), c = Number(sc);
    if (![a, b, c].every(isFinite)) return { text: t('مقدارهای معتبر وارد کن.', 'Enter valid numbers.') };
    if (a === 0) return { text: t('ضریب x² نباید صفر باشد؛ با a = 0 معادله درجه اول است.', 'The x² coefficient cannot be zero; with a = 0 the equation is linear.') };
    var d = b * b - 4 * a * c;
    if (Math.abs(d) < 1e-12) d = 0;
    var sep = t('، ', ', ');
    var steps = ['Δ = b² − 4ac = ' + sgn(b) + '² − 4 × ' + sgn(a) + ' × ' + sgn(c) + ' = ' + fmt(d)];
    var answer;
    if (d > 0) {
      var r = Math.sqrt(d), x1 = (-b + r) / (2 * a), x2 = (-b - r) / (2 * a);
      steps.push(t('Δ > 0، پس دو ریشهٔ حقیقی متمایز داریم.', 'Δ > 0, so there are two distinct real roots.'));
      steps.push('x = (−b ± √Δ) ÷ 2a = (' + fmt(-b) + ' ± ' + fmt(r) + ') ÷ ' + fmt(2 * a));
      answer = 'x₁ = ' + fmt(x1) + sep + 'x₂ = ' + fmt(x2);
    } else if (d === 0) {
      var x0 = -b / (2 * a);
      steps.push(t('Δ = 0، پس یک ریشهٔ مضاعف داریم.', 'Δ = 0, so there is one repeated root.'));
      steps.push('x = −b ÷ 2a = ' + fmt(-b) + ' ÷ ' + fmt(2 * a) + ' = ' + fmt(x0));
      answer = 'x = ' + fmt(x0);
    } else {
      var re = -b / (2 * a), im = Math.sqrt(-d) / (2 * Math.abs(a));
      steps.push(t('Δ < 0، پس ریشهٔ حقیقی نداریم.', 'Δ < 0, so there are no real roots.'));
      steps.push(t('در اعداد مختلط: x = ', 'In complex numbers: x = ') + fmt(re) + ' ± ' + fmt(im) + 'i');
      answer = t('ریشهٔ حقیقی ندارد', 'No real roots');
    }
    var detail = fmt(a) + 'x² + ' + fmt(b) + 'x + ' + fmt(c) + ' = 0';
    return {
      text: t('جواب: ', 'Answer: ') + answer + '\n' + t('مراحل حل:', 'Steps:') + '\n' + steps.join('\n'),
      detail: detail, result: answer
    };
  }

  function conv(v, radix) { return (v < 0n ? '-' : '') + (v < 0n ? -v : v).toString(radix).toUpperCase(); }

  function runBase() {
    var raw = latinDigits(val('exA')).replace(/\s+/g, '');
    var base = Number(val('exB') || 10);
    if (!raw) return { text: t('یک عدد وارد کن.', 'Enter a number.') };
    var neg = raw.charAt(0) === '-';
    var up = (neg ? raw.slice(1) : raw).toUpperCase();
    if (!up) return { text: t('یک عدد وارد کن.', 'Enter a number.') };
    var digits = '0123456789ABCDEF', v = 0n, B = BigInt(base), ds = [];
    for (var i = 0; i < up.length; i++) {
      var d = digits.indexOf(up.charAt(i));
      if (d < 0 || d >= base) {
        return { text: t('این عدد در مبنای ' + base + ' معتبر نیست.', 'This is not a valid base-' + base + ' number.') };
      }
      ds.push(d);
      v = v * B + BigInt(d);
    }
    if (neg) v = -v;
    var out = [
      t('مبنای ۲ (دودویی): ', 'Base 2 (binary): ') + conv(v, 2),
      t('مبنای ۸ (هشت‌هشتی): ', 'Base 8 (octal): ') + conv(v, 8),
      t('مبنای ۱۰ (دهدهی): ', 'Base 10 (decimal): ') + conv(v, 10),
      t('مبنای ۱۶ (شانزدهی): ', 'Base 16 (hexadecimal): ') + conv(v, 16)
    ];
    var steps = [];
    var abs = v < 0n ? -v : v;
    if (base !== 10 && ds.length <= 20) {
      var terms = ds.map(function (dv, idx) { return dv + '×' + base + '^' + (ds.length - 1 - idx); });
      steps.push(terms.join(' + ') + ' = ' + abs.toString(10));
    }
    if (base === 10 && abs > 0n && abs <= 1000000n) {
      var n = abs, bits = [];
      while (n > 0n && bits.length < 40) {
        var q = n / 2n, r = n % 2n;
        steps.push(n + ' ÷ 2 = ' + q + ' ' + t('باقی‌مانده', 'remainder') + ' ' + r);
        bits.unshift(String(r));
        n = q;
      }
      steps.push(t('باقی‌مانده‌ها را از پایین به بالا بخوان: ', 'Read the remainders from bottom to top: ') + bits.join(''));
    }
    var text = out.join('\n');
    if (steps.length) text += '\n' + t('مراحل حل:', 'Steps:') + '\n' + steps.join('\n');
    return { text: text, detail: raw + ' (' + t('مبنای ', 'base ') + base + ')', result: conv(v, 10) };
  }


  /* ====================== more tools ====================== */
  var PAIRS = [];                      // [persian, english] for static strings of the pages below
  function S(fa, en_) { PAIRS.push([fa, en_]); return fa; }
  function num(id) { var s = val(id); if (s === '' || s === '-' || s === '.' || s === '-.') return NaN; return Number(s); }
  function isInt(x) { return Number.isInteger(x); }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var r = a % b; a = b; b = r; } return a; }
  function numField(id, label, ph) {
    return '<label>' + label + '</label><input id="' + id + '" type="text" inputmode="decimal" autocomplete="off" data-digits="number" placeholder="' + ph + '">';
  }
  function need(ids, msg) { for (var i = 0; i < ids.length; i++) if (isNaN(num(ids[i]))) return { text: msg }; return null; }
  var MISSING = function () { return t('همهٔ مقدارها را به‌صورت عدد وارد کن.', 'Enter every value as a number.'); };

  /* ----- line through two points ----- */
  function term(c, v, first) {
    if (c === 0) return '';
    var mag = (Math.abs(c) === 1 && v) ? '' : fmt(Math.abs(c));
    if (first) return (c < 0 ? '\u2212' : '') + mag + v;
    return ' ' + (c < 0 ? '\u2212' : '+') + ' ' + mag + v;
  }
  function generalForm(A, B, C) {
    if ([A, B, C].every(isInt)) {
      var g = gcd(A, gcd(B, C)) || 1; A /= g; B /= g; C /= g;
      if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
    }
    var out = '', first = true, parts = [[A, 'x'], [B, 'y'], [C, '']];
    parts.forEach(function (p) { var s = term(p[0], p[1], first); if (s) { out += s; first = false; } });
    return (out || '0') + ' = 0';
  }
  function runLine() {
    var bad = need(['lx1', 'ly1', 'lx2', 'ly2'], MISSING()); if (bad) return bad;
    var x1 = num('lx1'), y1 = num('ly1'), x2 = num('lx2'), y2 = num('ly2');
    if (x1 === x2 && y1 === y2) return { text: t('دو نقطه باید متفاوت باشند.', 'The two points must be different.') };
    var dx = x2 - x1, dy = y2 - y1, lines = [], eq, slopeTxt, interY, interX;
    var A = dy, B = x1 - x2, C = x2 * y1 - x1 * y2;
    if (dx === 0) {
      eq = 'x = ' + fmt(x1); slopeTxt = t('تعریف نشده (خط قائم)', 'undefined (vertical line)');
      interY = x1 === 0 ? t('خط روی محور y است', 'the line is the y-axis') : t('ندارد', 'none');
      interX = fmt(x1);
    } else {
      var m = dy / dx, b = y1 - m * x1;
      var mm = m === 1 ? 'x' : m === -1 ? '\u2212x' : fmt(m) + 'x';
      eq = m === 0 ? 'y = ' + fmt(b) : 'y = ' + mm + (b === 0 ? '' : (b > 0 ? ' + ' + fmt(b) : ' \u2212 ' + fmt(-b)));
      slopeTxt = fmt(m);
      interY = fmt(b);
      interX = m === 0 ? (b === 0 ? t('خط روی محور x است', 'the line is the x-axis') : t('ندارد', 'none')) : fmt(-b / m);
      lines.push('m = (y₂ − y₁) ÷ (x₂ − x₁) = (' + fmt(y2) + ' − ' + sgn(y1) + ') ÷ (' + fmt(x2) + ' − ' + sgn(x1) + ') = ' + fmt(m));
      lines.push('b = y₁ − m × x₁ = ' + fmt(y1) + ' − ' + sgn(m) + ' × ' + sgn(x1) + ' = ' + fmt(b));
    }
    var dist = Math.sqrt(dx * dx + dy * dy);
    var head = t('معادلهٔ خط: ', 'Line equation: ') + eq;
    var body = [
      t('شیب: ', 'Slope: ') + slopeTxt,
      t('فرم کلی: ', 'General form: ') + (dx === 0 ? generalForm(1, 0, -x1) : generalForm(A, B, C)),
      t('عرض از مبدأ (برخورد با محور y): ', 'y-intercept: ') + interY,
      t('طول از مبدأ (برخورد با محور x): ', 'x-intercept: ') + interX,
      t('نقطهٔ وسط: ', 'Midpoint: ') + '(' + fmt((x1 + x2) / 2) + ', ' + fmt((y1 + y2) / 2) + ')',
      t('فاصلهٔ دو نقطه: ', 'Distance between the points: ') + fmt(dist)
    ];
    var text = head + '\n' + body.join('\n');
    if (lines.length) text += '\n' + t('مراحل حل:', 'Steps:') + '\n' + lines.join('\n');
    return { text: text, detail: '(' + fmt(x1) + ', ' + fmt(y1) + ') ' + t('و', 'and') + ' (' + fmt(x2) + ', ' + fmt(y2) + ')', result: eq };
  }

  /* ----- simplify a fraction ----- */
  function runSimplify() {
    var bad = need(['sn', 'sd'], MISSING()); if (bad) return bad;
    var n = num('sn'), d = num('sd');
    if (!isInt(n) || !isInt(d)) return { text: t('صورت و مخرج باید عدد صحیح باشند.', 'Numerator and denominator must be whole numbers.') };
    if (d === 0) return { text: t('مخرج نمی‌تواند صفر باشد.', 'The denominator cannot be zero.') };
    var sign = (n < 0) !== (d < 0) ? -1 : 1, an = Math.abs(n), ad = Math.abs(d), g = gcd(an, ad) || 1;
    var sn = an / g, sd = ad / g, shown = (sign < 0 && sn !== 0 ? '\u2212' : '') + sn + (sd === 1 ? '' : '/' + sd);
    var lines = [t('ب.م.م(', 'GCD(') + an + t('، ', ', ') + ad + ') = ' + g,
                 an + ' ÷ ' + g + ' = ' + sn + ' ، ' + ad + ' ÷ ' + g + ' = ' + sd];
    var value = sign * sn / sd, out = [t('کسر ساده‌شده: ', 'Simplified fraction: ') + shown];
    if (g === 1) out.push(t('این کسر از قبل ساده است.', 'This fraction is already in lowest terms.'));
    if (sd !== 1 && sn > sd) {
      var whole = Math.floor(sn / sd), rest = sn % sd;
      out.push(t('عدد مخلوط: ', 'Mixed number: ') + (sign < 0 ? '\u2212' : '') + whole + ' ' + (rest ? rest + '/' + sd : ''));
    }
    out.push(t('مقدار اعشاری: ', 'Decimal: ') + fmt(value));
    out.push(t('درصد: ', 'Percent: ') + fmt(value * 100) + '%');
    return { text: out.join('\n') + '\n' + t('مراحل حل:', 'Steps:') + '\n' + lines.join('\n'),
             detail: n + '/' + d, result: shown };
  }

  /* ----- combinatorics ----- */
  function fact(n) { var r = 1n; for (var i = 2n; i <= n; i++) r *= i; return r; }
  function big(x) {
    var s = x.toString();
    if (s.length <= 40) return s;
    return s.charAt(0) + '.' + s.slice(1, 6) + '×10^' + (s.length - 1) + ' (' + s.length + ' ' + t('رقم', 'digits') + ')';
  }
  function runComb() {
    var nRaw = val('cn'), rRaw = val('cr');
    var n = nRaw === '' ? NaN : Number(nRaw);
    if (isNaN(n) || !isInt(n) || n < 0) return { text: t('n را به‌صورت عدد صحیح نامنفی وارد کن.', 'Enter n as a non-negative whole number.') };
    if (n > 1000) return { text: t('n نباید از ۱۰۰۰ بیشتر باشد.', 'n must not exceed 1000.') };
    var N = BigInt(n), out = [n + '! = ' + big(fact(N))], steps = [];
    if (n <= 20) steps.push(n + '! = ' + (n === 0 ? '1' : Array.from({ length: n }, function (_, i) { return i + 1; }).join(' × ')) + ' = ' + fact(N));
    var result = n + '! = ' + big(fact(N));
    if (rRaw !== '') {
      var r = Number(rRaw);
      if (isNaN(r) || !isInt(r) || r < 0) return { text: t('r را به‌صورت عدد صحیح نامنفی وارد کن.', 'Enter r as a non-negative whole number.') };
      if (r > n) return { text: t('r نباید از n بزرگ‌تر باشد.', 'r must not be greater than n.') };
      var R = BigInt(r), P = fact(N) / fact(N - R), C = P / fact(R);
      out.push('P(' + n + ', ' + r + ') = ' + big(P));
      out.push('C(' + n + ', ' + r + ') = ' + big(C));
      if (n <= 20) {
        steps.push('P(' + n + ', ' + r + ') = ' + n + '! ÷ ' + (n - r) + '! = ' + fact(N) + ' ÷ ' + fact(N - R) + ' = ' + P);
        steps.push('C(' + n + ', ' + r + ') = ' + n + '! ÷ (' + r + '! × ' + (n - r) + '!) = ' + fact(N) + ' ÷ (' + fact(R) + ' × ' + fact(N - R) + ') = ' + C);
      }
      result = 'C(' + n + ', ' + r + ') = ' + big(C);
    }
    var text = out.join('\n');
    if (steps.length) text += '\n' + t('مراحل حل:', 'Steps:') + '\n' + steps.join('\n');
    return { text: text, detail: 'n = ' + n + (rRaw !== '' ? ', r = ' + rRaw : ''), result: result };
  }

  /* ----- rule of three ----- */
  function runRatio() {
    var bad = need(['ra', 'rb', 'rc'], MISSING()); if (bad) return bad;
    var a = num('ra'), b = num('rb'), c = num('rc'), inverse = val('rk') === 'inverse';
    var x, formula;
    if (inverse) {
      if (c === 0) return { text: t('در تناسب معکوس مقدار c نباید صفر باشد.', 'In inverse proportion c must not be zero.') };
      x = (a * b) / c; formula = 'x = (a × b) ÷ c = (' + fmt(a) + ' × ' + fmt(b) + ') ÷ ' + fmt(c);
    } else {
      if (a === 0) return { text: t('در تناسب مستقیم مقدار a نباید صفر باشد.', 'In direct proportion a must not be zero.') };
      x = (b * c) / a; formula = 'x = (b × c) ÷ a = (' + fmt(b) + ' × ' + fmt(c) + ') ÷ ' + fmt(a);
    }
    return { text: t('جواب: x = ', 'Answer: x = ') + fmt(x) + '\n' + t('مراحل حل:', 'Steps:') + '\n' + formula + ' = ' + fmt(x),
             detail: (inverse ? t('معکوس', 'inverse') : t('مستقیم', 'direct')) + ': ' + fmt(a) + ', ' + fmt(b) + ', ' + fmt(c), result: 'x = ' + fmt(x) };
  }

  /* ----- two equations, two unknowns (Cramer) ----- */
  function exact(n, d) {
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d) || 1; n /= g; d /= g;
    var shown = d === 1 ? String(n) : n + '/' + d;
    return d === 1 ? fmt(n) : shown.replace('-', '\u2212') + ' (' + fmt(n / d) + ')';
  }
  function runSystem() {
    var ids = ['a1', 'b1', 'c1', 'a2', 'b2', 'c2'].map(function (k) { return 'sy' + k; });
    var bad = need(ids, MISSING()); if (bad) return bad;
    var v = ids.map(num), a1 = v[0], b1 = v[1], c1 = v[2], a2 = v[3], b2 = v[4], c2 = v[5];
    var D = a1 * b2 - a2 * b1, Dx = c1 * b2 - c2 * b1, Dy = a1 * c2 - a2 * c1;
    var detail = fmt(a1) + 'x + ' + fmt(b1) + 'y = ' + fmt(c1) + ' ; ' + fmt(a2) + 'x + ' + fmt(b2) + 'y = ' + fmt(c2);
    var steps = 'D = a₁b₂ − a₂b₁ = ' + fmt(D) + '\nDₓ = c₁b₂ − c₂b₁ = ' + fmt(Dx) + '\nDᵧ = a₁c₂ − a₂c₁ = ' + fmt(Dy);
    var hdr = t('مراحل حل:', 'Steps:') + '\n';
    var rowBad = function (a, b, c) { return a === 0 && b === 0 && c !== 0; };
    if (rowBad(a1, b1, c1) || rowBad(a2, b2, c2)) {
      var m0 = t('دستگاه جواب ندارد.', 'The system has no solution.');
      return { text: m0, detail: detail, result: m0 };
    }
    if (D !== 0) {
      var ints = v.every(isInt);
      var xs = ints ? exact(Dx, D) : fmt(Dx / D), ys = ints ? exact(Dy, D) : fmt(Dy / D);
      var ans = 'x = ' + xs + t('، ', ', ') + 'y = ' + ys;
      return { text: t('جواب: ', 'Answer: ') + ans + '\n' + hdr + steps + '\nx = Dₓ ÷ D ، y = Dᵧ ÷ D', detail: detail, result: ans };
    }
    var inf = (Dx === 0 && Dy === 0);
    var msg = inf ? t('دستگاه بی‌شمار جواب دارد (دو معادله یک خط‌اند).', 'The system has infinitely many solutions (both equations describe the same line).')
                  : t('دستگاه جواب ندارد (دو خط موازی‌اند).', 'The system has no solution (the lines are parallel).');
    return { text: msg + '\n' + hdr + steps, detail: detail, result: msg };
  }

  /* ----- area and perimeter ----- */
  var SHAPES = {
    square:        { fa: S('مربع', 'Square'), f: [['a', S('طول ضلع', 'Side length')]] },
    rectangle:     { fa: S('مستطیل', 'Rectangle'), f: [['a', S('طول', 'Length')], ['b', S('عرض', 'Width')]] },
    circle:        { fa: S('دایره', 'Circle'), f: [['r', S('شعاع', 'Radius')]] },
    triangle:      { fa: S('مثلث (قاعده و ارتفاع)', 'Triangle (base and height)'), f: [['b', S('قاعده', 'Base')], ['h', S('ارتفاع', 'Height')]] },
    triangle3:     { fa: S('مثلث (سه ضلع)', 'Triangle (three sides)'), f: [['a', S('ضلع اول', 'First side')], ['b', S('ضلع دوم', 'Second side')], ['c', S('ضلع سوم', 'Third side')]] },
    parallelogram: { fa: S('متوازی‌الاضلاع', 'Parallelogram'), f: [['a', S('قاعده', 'Base')], ['b', S('ضلع کناری', 'Side')], ['h', S('ارتفاع', 'Height')]] },
    rhombus:       { fa: S('لوزی', 'Rhombus'), f: [['d1', S('قطر اول', 'First diagonal')], ['d2', S('قطر دوم', 'Second diagonal')]] },
    trapezoid:     { fa: S('ذوزنقه', 'Trapezoid'), f: [['a', S('قاعدهٔ بزرگ', 'Long base')], ['b', S('قاعدهٔ کوچک', 'Short base')], ['h', S('ارتفاع', 'Height')], ['c', S('ساق اول', 'First leg')], ['d', S('ساق دوم', 'Second leg')]] }
  };
  function shapeFields(kind) {
    var sh = SHAPES[kind], html = '';
    sh.f.forEach(function (p) { html += numField('g_' + p[0], p[1], t('مثلاً 5', 'e.g. 5')); });
    return html;
  }
  S('مثلاً 5', 'e.g. 5');
  function runGeometry() {
    var kind = val('exShape') || 'square', sh = SHAPES[kind], g = {};
    for (var i = 0; i < sh.f.length; i++) {
      var k = sh.f[i][0], x = num('g_' + k);
      if (isNaN(x) || x <= 0) return { text: t('همهٔ اندازه‌ها را به‌صورت عدد مثبت وارد کن.', 'Enter every measurement as a positive number.') };
      g[k] = x;
    }
    var area, per, form = '', pf = '', note = '';
    switch (kind) {
      case 'square': area = g.a * g.a; per = 4 * g.a; form = 'a² = ' + fmt(g.a) + '²'; pf = '4a = 4 × ' + fmt(g.a); break;
      case 'rectangle': area = g.a * g.b; per = 2 * (g.a + g.b); form = 'a × b = ' + fmt(g.a) + ' × ' + fmt(g.b); pf = '2(a + b) = 2 × (' + fmt(g.a) + ' + ' + fmt(g.b) + ')'; break;
      case 'circle': area = Math.PI * g.r * g.r; per = 2 * Math.PI * g.r; form = 'π × r² = π × ' + fmt(g.r) + '²'; pf = '2 × π × r = 2 × π × ' + fmt(g.r); break;
      case 'triangle': area = g.b * g.h / 2; form = '(b × h) ÷ 2 = (' + fmt(g.b) + ' × ' + fmt(g.h) + ') ÷ 2'; note = t('برای محاسبهٔ محیط، «مثلث (سه ضلع)» را انتخاب کن.', 'For the perimeter choose "Triangle (three sides)".'); break;
      case 'triangle3':
        if (g.a + g.b <= g.c || g.a + g.c <= g.b || g.b + g.c <= g.a) return { text: t('با این سه ضلع مثلث ساخته نمی‌شود (مجموع هر دو ضلع باید از ضلع سوم بزرگ‌تر باشد).', 'These three sides cannot form a triangle (any two sides must add up to more than the third).') };
        var s = (g.a + g.b + g.c) / 2; area = Math.sqrt(s * (s - g.a) * (s - g.b) * (s - g.c)); per = g.a + g.b + g.c;
        form = '√(s(s − a)(s − b)(s − c)) ، s = (a + b + c) ÷ 2 = ' + fmt(s); pf = 'a + b + c'; break;
      case 'parallelogram': area = g.a * g.h; per = 2 * (g.a + g.b); form = 'a × h = ' + fmt(g.a) + ' × ' + fmt(g.h); pf = '2(a + b) = 2 × (' + fmt(g.a) + ' + ' + fmt(g.b) + ')'; break;
      case 'rhombus':
        var side = Math.sqrt(Math.pow(g.d1 / 2, 2) + Math.pow(g.d2 / 2, 2)); area = g.d1 * g.d2 / 2; per = 4 * side;
        form = '(d₁ × d₂) ÷ 2 = (' + fmt(g.d1) + ' × ' + fmt(g.d2) + ') ÷ 2'; pf = t('۴ × ضلع = ۴ × ', '4 × side = 4 × ') + fmt(side) + t(' (ضلع = √((d₁÷2)² + (d₂÷2)²))', ' (side = √((d₁÷2)² + (d₂÷2)²))'); break;
      case 'trapezoid': area = (g.a + g.b) * g.h / 2; per = g.a + g.b + g.c + g.d; form = '((a + b) × h) ÷ 2 = ((' + fmt(g.a) + ' + ' + fmt(g.b) + ') × ' + fmt(g.h) + ') ÷ 2'; pf = 'a + b + c + d'; break;
    }
    var lines = [t('مساحت: ', 'Area: ') + fmt(area)];
    if (per !== undefined) lines.push(t('محیط: ', 'Perimeter: ') + fmt(per));
    var steps = [t('مساحت:', 'Area:'), form];
    if (pf) steps.push(t('محیط:', 'Perimeter:'), pf);
    if (note) steps.push(note);
    return { text: lines.join('\n') + '\n' + t('مراحل حل:', 'Steps:') + '\n' + steps.join('\n'),
             detail: (isEn() ? sh.fa : sh.fa), result: t('مساحت ', 'Area ') + fmt(area) };
  }
  function mountGeometry(page) {
    var holder = page.querySelector('#exShapeFields'), sel = page.querySelector('#exShape');
    function render() {
      holder.innerHTML = shapeFields(sel.value);
      translateStatic(holder);
      holder.querySelectorAll('input').forEach(function (i) { i.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); page.querySelector('#extraRun').click(); } }); });
    }
    sel.addEventListener('change', function () { render(); page.querySelector('#extraResult').hidden = true; });
    render();
  }

  /* translate the static strings of the pages above while the English UI is on */
  function translateStatic(root) {
    if (!isEn()) return;
    var map = {}; PAIRS.forEach(function (p) { map[p[0]] = p[1]; });
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, nodes = [];
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) { var k = node.nodeValue.trim(); if (map[k]) node.nodeValue = node.nodeValue.replace(k, map[k]); });
    root.querySelectorAll('[placeholder]').forEach(function (e) { var k = e.getAttribute('placeholder'); if (map[k]) e.setAttribute('placeholder', map[k]); });
  }
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'languageToggle') setTimeout(function () { var p = document.getElementById('extraToolPage'); if (p) translateStatic(p); }, 60);
  });

  var TOOLS = {

    line: {
      title: S('معادله خط', 'Line Equation'),
      desc: S('چطور معادلهٔ خط گذرنده از دو نقطه را بنویسیم؟', 'How do we write the equation of the line through two points?'),
      help: S('ابتدا شیب را از m = (y₂ − y₁) ÷ (x₂ − x₁) حساب کن. بعد یکی از نقطه‌ها را در y = mx + b بگذار تا b به دست بیاید. اگر x₁ و x₂ برابر باشند، خط قائم است و معادلهٔ آن x = عدد است.',
              'First compute the slope from m = (y₂ − y₁) ÷ (x₂ − x₁). Then put one of the points into y = mx + b to find b. If x₁ and x₂ are equal the line is vertical and its equation is x = a number.'),
      fields: numField('lx1', S('x₁ (طول نقطهٔ اول)', 'x₁ (first point, x)'), 'x₁') + numField('ly1', S('y₁ (عرض نقطهٔ اول)', 'y₁ (first point, y)'), 'y₁') +
              numField('lx2', S('x₂ (طول نقطهٔ دوم)', 'x₂ (second point, x)'), 'x₂') + numField('ly2', S('y₂ (عرض نقطهٔ دوم)', 'y₂ (second point, y)'), 'y₂'),
      button: S('پیدا کردن معادلهٔ خط', 'Find the line'),
      run: runLine
    },
    simplify: {
      title: S('ساده کردن کسر', 'Simplify a Fraction'),
      desc: S('چطور یک کسر را ساده کنیم؟', 'How do we simplify a fraction?'),
      help: S('ب.م.م صورت و مخرج را پیدا کن و هر دو را بر آن تقسیم کن. مخرج نباید صفر باشد.', 'Find the GCD of the numerator and denominator and divide both by it. The denominator must not be zero.'),
      fields: numField('sn', S('صورت', 'Numerator'), S('مثلاً 18', 'e.g. 18')) + numField('sd', S('مخرج', 'Denominator'), S('مثلاً 24', 'e.g. 24')),
      button: S('ساده کن', 'Simplify'),
      run: runSimplify
    },
    geometry: {
      title: S('مساحت و محیط اشکال', 'Area and Perimeter'),
      desc: S('مساحت و محیط چطور حساب می‌شود؟', 'How do we find area and perimeter?'),
      help: S('شکل را انتخاب کن و اندازه‌ها را وارد کن. مثلاً مساحت مستطیل برابر طول × عرض و محیط آن ۲ × (طول + عرض) است.', 'Choose a shape and enter its measurements. For example the area of a rectangle is length × width and its perimeter is 2 × (length + width).'),
      fields: '<label>' + S('شکل', 'Shape') + '</label><select id="exShape">' + Object.keys(SHAPES).map(function (k) { return '<option value="' + k + '">' + SHAPES[k].fa + '</option>'; }).join('') + '</select><div id="exShapeFields"></div>',
      button: S('محاسبه', 'Calculate'),
      run: runGeometry,
      mount: mountGeometry
    },
    comb: {
      title: S('فاکتوریل، جایگشت و ترکیب', 'Factorial, Permutation and Combination'),
      desc: S('فاکتوریل، جایگشت و ترکیب چطور حساب می‌شوند؟', 'How are factorials, permutations and combinations computed?'),
      help: S('n! حاصل‌ضرب عددهای ۱ تا n است. جایگشت P(n, r) = n! ÷ (n − r)! و ترکیب C(n, r) = n! ÷ (r! × (n − r)!) است. اگر r را خالی بگذاری فقط n! حساب می‌شود.',
              'n! is the product of the numbers from 1 to n. Permutations are P(n, r) = n! ÷ (n − r)! and combinations are C(n, r) = n! ÷ (r! × (n − r)!). Leave r empty to get only n!.'),
      fields: numField('cn', S('n (تعداد کل)', 'n (total)'), S('مثلاً 5', 'e.g. 5')) + numField('cr', S('r (تعداد انتخاب، اختیاری)', 'r (chosen, optional)'), S('مثلاً 2', 'e.g. 2')),
      button: S('محاسبه', 'Calculate'),
      run: runComb
    },
    ratio: {
      title: S('قاعده سه‌تایی', 'Rule of Three'),
      desc: S('قاعدهٔ سه‌تایی چطور کار می‌کند؟', 'How does the rule of three work?'),
      help: S('اگر a به b متناسب باشد، c به x متناسب است. در تناسب مستقیم x = (b × c) ÷ a و در تناسب معکوس x = (a × b) ÷ c است.',
              'If a corresponds to b, then c corresponds to x. In direct proportion x = (b × c) ÷ a and in inverse proportion x = (a × b) ÷ c.'),
      fields: '<label>' + S('نوع تناسب', 'Type of proportion') + '</label><select id="rk"><option value="direct">' + S('مستقیم', 'Direct') + '</option><option value="inverse">' + S('معکوس', 'Inverse') + '</option></select>' +
              numField('ra', S('a (مقدار اول)', 'a (first value)'), S('مثلاً 3', 'e.g. 3')) + numField('rb', S('b (متناظر با a)', 'b (matches a)'), S('مثلاً 45', 'e.g. 45')) + numField('rc', S('c (مقدار دوم)', 'c (second value)'), S('مثلاً 5', 'e.g. 5')),
      button: S('حساب کن', 'Solve'),
      run: runRatio
    },
    system: {
      title: S('حل دستگاه دو معادله دو مجهول', 'Solve a 2×2 System'),
      desc: S('دستگاه دو معادله دو مجهول چطور حل می‌شود؟', 'How do we solve a system of two equations?'),
      help: S('دستگاه را به شکل a₁x + b₁y = c₁ و a₂x + b₂y = c₂ بنویس. اگر D = a₁b₂ − a₂b₁ صفر نباشد، x = Dₓ ÷ D و y = Dᵧ ÷ D است.',
              'Write the system as a₁x + b₁y = c₁ and a₂x + b₂y = c₂. If D = a₁b₂ − a₂b₁ is not zero, then x = Dₓ ÷ D and y = Dᵧ ÷ D.'),
      fields: numField('sya1', S('a₁ (ضریب x در معادلهٔ اول)', 'a₁ (x in the first equation)'), 'a₁') + numField('syb1', S('b₁ (ضریب y در معادلهٔ اول)', 'b₁ (y in the first equation)'), 'b₁') + numField('syc1', S('c₁ (عدد سمت راست معادلهٔ اول)', 'c₁ (right side of the first)'), 'c₁') +
              numField('sya2', S('a₂ (ضریب x در معادلهٔ دوم)', 'a₂ (x in the second equation)'), 'a₂') + numField('syb2', S('b₂ (ضریب y در معادلهٔ دوم)', 'b₂ (y in the second equation)'), 'b₂') + numField('syc2', S('c₂ (عدد سمت راست معادلهٔ دوم)', 'c₂ (right side of the second)'), 'c₂'),
      button: S('حل دستگاه', 'Solve the system'),
      run: runSystem
    },
    quadratic: {
      title: 'حل معادله درجه دوم',
      desc: 'چطور معادله ax² + bx + c = 0 را حل کنیم؟',
      help: 'ابتدا Δ = b² − 4ac را حساب کن. اگر Δ مثبت باشد دو ریشه، اگر صفر باشد یک ریشهٔ مضاعف و اگر منفی باشد ریشهٔ حقیقی نداریم. ریشه‌ها از x = (−b ± √Δ) ÷ 2a به دست می‌آیند.',
      fields: '<label>ضریب x² یعنی a</label><input id="exA" type="number" step="any" placeholder="مثلاً 1"><label>ضریب x یعنی b</label><input id="exB" type="number" step="any" placeholder="مثلاً -5"><label>عدد c</label><input id="exC" type="number" step="any" placeholder="مثلاً 6">',
      button: 'حل معادله',
      title2: 'حل معادله درجه دوم',
      run: runQuadratic
    },
    base: {
      title: 'تبدیل مبنای اعداد',
      desc: 'چطور عدد را از یک مبنا به مبنای دیگر ببریم؟',
      help: 'برای تبدیل به مبنای ۱۰، هر رقم را در توان مبنا ضرب و همه را جمع کن. برای تبدیل از مبنای ۱۰، عدد را پشت‌سرهم بر مبنا تقسیم کن و باقی‌مانده‌ها را از پایین به بالا بخوان.',
      fields: '<label>عدد</label><input id="exA" type="text" inputmode="text" autocomplete="off" placeholder="مثلاً 1011"><label>مبنای عدد</label><select id="exB"><option value="2">مبنای ۲ (دودویی)</option><option value="8">مبنای ۸ (هشت‌هشتی)</option><option value="10" selected>مبنای ۱۰ (دهدهی)</option><option value="16">مبنای ۱۶ (شانزدهی)</option></select>',
      button: 'تبدیل عدد',
      run: runBase
    }
  };

  function openTool(kind) {
    var cfg = TOOLS[kind];
    if (!cfg) return;
    var old = document.getElementById('extraToolPage');
    if (old) old.remove();
    var page = document.createElement('section');
    page.id = 'extraToolPage';
    page.className = 'page active';
    page.innerHTML = '<button class="back-button" type="button" id="extraBack">← بازگشت</button><h2>' + cfg.title +
      '</h2><details class="reveal-help"><summary>' + cfg.desc + '</summary><div class="help-content">' + cfg.help +
      '</div></details>' + cfg.fields + '<button class="action-button" type="button" id="extraRun">' + cfg.button +
      '</button><div class="result" id="extraResult" hidden></div>';
    document.querySelector('main').appendChild(page);
    document.querySelectorAll('.page').forEach(function (p) { if (p !== page) p.classList.remove('active'); });
    document.getElementById('extraBack').onclick = function () { page.remove(); window.showPage('home'); };
    document.getElementById('extraRun').onclick = function () {
      var res = cfg.run(), out = document.getElementById('extraResult');
      out.hidden = false;
      out.textContent = res.text;
      if (res.detail) record(cfg.title, res.detail, res.result);
    };
    if (cfg.mount) cfg.mount(page);
    translateStatic(page);
    page.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') { event.preventDefault(); document.getElementById('extraRun').click(); }
      });
    });
  }
  window.openMathTool = openTool;
})();
