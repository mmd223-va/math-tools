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

  var TOOLS = {
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
    page.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') { event.preventDefault(); document.getElementById('extraRun').click(); }
      });
    });
  }
  window.openMathTool = openTool;
})();
