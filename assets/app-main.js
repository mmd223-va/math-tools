

function calculateSequence() {
  const startText = document.getElementById("seqStart").value.trim();
  const endText = document.getElementById("seqEnd").value.trim();
  const stepText = document.getElementById("seqStep").value.trim();
  const operation = document.getElementById("seqOperation").value;
  const result = document.getElementById("sequenceResult");
  result.hidden = false;
  result.classList.remove("error");
  if (!startText || !endText || !stepText) {
    result.classList.add("error");
    result.textContent = "لطفاً هر سه مقدار را وارد کن.";
    return;
  }
  const start = Number(startText), end = Number(endText), step = Number(stepText);
  if (![start, end, step].every(Number.isSafeInteger) || step <= 0 || end < start) {
    result.classList.add("error");
    result.textContent = "عدد شروع و پایان باید عدد صحیح معتبر باشند؛ فاصله باید عدد صحیح مثبت باشد و پایان نباید از شروع کوچک‌تر باشد.";
    return;
  }
  const count = Math.floor((end - start) / step) + 1;
  if (count > 5000) {
    result.classList.add("error");
    result.textContent = "این دنباله بیش از ۵۰۰۰ عدد دارد. لطفاً فاصله را بیشتر یا بازه را کوچک‌تر کن.";
    return;
  }
  const numbers = Array.from({length: count}, (_, i) => start + i * step);
  if (operation === "divide" && numbers.slice(1).some(n => n === 0)) {
    result.classList.add("error");
    result.textContent = "تقسیم بر صفر امکان‌پذیر نیست. دنباله را طوری تغییر بده که بعد از عدد اول، صفر نداشته باشد.";
    return;
  }
  let total = numbers[0];
  const expression = [String(numbers[0])];
  for (let i = 1; i < numbers.length; i++) {
    let op;
    if (operation === "add") op = "+";
    else if (operation === "subtract") op = "−";
    else if (operation === "multiply") op = "×";
    else if (operation === "divide") op = "÷";
    else if (operation === "alternate-add") op = i % 2 === 1 ? "+" : "−";
    else op = i % 2 === 1 ? "−" : "+";
    expression.push(op, String(numbers[i]));
    if (op === "+") total += numbers[i];
    else if (op === "−") total -= numbers[i];
    else if (op === "×") total *= numbers[i];
    else total /= numbers[i];
    if (!Number.isFinite(total) || Math.abs(total) > Number.MAX_SAFE_INTEGER) {
      result.classList.add("error");
      result.textContent = "نتیجه بیش از محدوده قابل محاسبه است.";
      return;
    }
  }
  const formatted = Number(total.toPrecision(12)).toLocaleString("en-US", {maximumFractionDigits: 10});
  result.replaceChildren();

  const stepsDetails = document.createElement("details");
  stepsDetails.open = true;
  const stepsHeading = document.createElement("summary");
  stepsHeading.textContent = "نمایش مراحل محاسبه";
  const steps = document.createElement("p");
  steps.style.direction = "ltr";
  steps.style.textAlign = "left";
  steps.style.overflowWrap = "anywhere";
  if (numbers.length <= 20) {
    steps.textContent = expression.join(" ");
  } else {
    steps.textContent = expression.slice(0, 19).join(" ") + "  …  " + expression.slice(-9).join(" ");
    const stepsNote = document.createElement("p");
    stepsNote.textContent = "برای جلوگیری از شلوغ شدن صفحه، فقط ۱۰ عدد اول و ۵ عدد آخر نمایش داده شده‌اند.";
    stepsDetails.append(stepsHeading, steps, stepsNote);
  }
  if (numbers.length <= 20) stepsDetails.append(stepsHeading, steps);
  const answerHeading = document.createElement("strong");
  answerHeading.textContent = "جواب نهایی:";
  const answer = document.createElement("p");
  answer.style.fontSize = "1.4rem";
  answer.style.fontWeight = "800";
  answer.textContent = formatted;
  const countText = document.createElement("p");
  countText.textContent = "تعداد اعداد: " + numbers.length;
  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "action-button";
  copyButton.textContent = "کپی جواب";
  copyButton.addEventListener("click", async function() {
    try {
      await navigator.clipboard.writeText(formatted);
      copyButton.textContent = "کپی شد ✓";
    } catch (e) {
      copyButton.textContent = "کپی خودکار در دسترس نیست";
    }
  });
  result.append(stepsDetails, answerHeading, answer, countText, copyButton);
}
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const selected = document.getElementById(pageId);

  if (selected) {
    selected.classList.add("active");
  }

  if (pageId !== "sequence-calculator") {
    document.getElementById("seqStart").value = "";
    document.getElementById("seqEnd").value = "";
    document.getElementById("seqStep").value = "";
    document.getElementById("seqOperation").value = "add";
    const sequenceResult = document.getElementById("sequenceResult");
    sequenceResult.hidden = true;
    sequenceResult.replaceChildren();
    sequenceResult.classList.remove("error");
  }

  // پاک کردن نتیجه‌های ابزارها هنگام خروج از هر ابزار
  if (pageId !== "factorization") {
    const result = document.getElementById("factorResult");
    result.hidden = true;
    result.replaceChildren();
    result.classList.remove("error");
  }

  if (pageId !== "fractions") {
    const result = document.getElementById("fraction-result");
    result.hidden = true;
    result.replaceChildren();
    result.classList.remove("error");
  }

  if (pageId !== "sieve") {
    const result = document.getElementById("sieveResult");
    result.hidden = true;
    result.textContent = "";
    result.classList.remove("error");
    document.getElementById("sieveGrid").replaceChildren();
  }

  if (pageId !== "gcd") {
    const result = document.getElementById("gcdResult");
    result.hidden = true;
    result.textContent = "";
    result.classList.remove("error");
  }

  if (pageId !== "prime") {
    const result = document.getElementById("primeResult");
    result.hidden = true;
    result.textContent = "";
    result.classList.remove("error");
  }

  if (pageId !== "calculator") {
    const calculatorResult = document.getElementById("calculatorResult");
    calculatorResult.hidden = true;
    calculatorResult.textContent = "";
    calculatorResult.classList.remove("error");
  }

  // هنگام خروج از هر ابزار، ورودی‌های همان ابزار پاک شوند.
  const inputsByPage = {
    factorization: ["factorNumber"],
    fractions: ["fraction-num1", "fraction-den1", "fraction-num2", "fraction-den2"],
    sieve: ["sieveLimit"],
    gcd: ["num1", "num2"],
    prime: ["primeNumber"],
    calculator: ["calculatorDisplay"],
    "sequence-calculator": ["seqStart", "seqEnd", "seqStep"],
  };

  document.querySelectorAll(".page").forEach(page => {
    if (page.id === pageId) return;
    (inputsByPage[page.id] || []).forEach(id => {
      const input = document.getElementById(id);
      if (input) input.value = "";
    });
  });

  window.scrollTo(0, 0);
}

function sanitizeCalculatorInput(display) {
  const original = display.value;
  const originalCaret = display.selectionStart ?? original.length;
  const allowed = "0123456789.+−×÷()%⁰¹²³⁴⁵⁶⁷⁸⁹⁻^√ ";
  let cleaned = "";
  for (const char of original.replace(/-/g, "−").replace(/\*/g, "×").replace(/\//g, "÷")) {
    if (!allowed.includes(char)) continue;
    const previous = cleaned.trimEnd().slice(-1);
    const isOperator = "+−×÷^%".includes(char);
    const previousIsOperator = "+−×÷^%".includes(previous);
    // Minus is allowed as a sign at the beginning, after an opening parenthesis,
    // or after another operator (for example 5×−2).
    if (isOperator && previousIsOperator && !(char === "−" && "+×÷^".includes(previous))) continue;
    cleaned += char;
  }
  // Convert an exponent typed after ^ into superscript digits.
  cleaned = cleaned.replace(/\^(−?)(\d+)/g, (_, sign, digits) => (sign ? "⁻" : "") + [...digits].map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join(""));
  if (original !== cleaned) {
    const caret = Math.min(originalCaret, cleaned.length);
    display.value = cleaned;
    display.setSelectionRange(caret, caret);
  }
}
function calculatorInsert(value) {
  const display = document.getElementById("calculatorDisplay");
  const start = display.selectionStart ?? display.value.length;
  const end = display.selectionEnd ?? display.value.length;
  if (value === "-") value = "−";
  const before = display.value.slice(0, start);
  const previous = before.trimEnd().slice(-1);
  const operators = "+−×÷^%";
  const isOperator = operators.includes(value);
  const previousIsOperator = operators.includes(previous);
  const isUnaryMinus = value === "−" && (!previous || "(+×÷^".includes(previous));
  if (isOperator && previousIsOperator && !isUnaryMinus) return;
  if (/[A-Za-z]/.test(value)) value = value.replace(/sqrt\(/g, "√(");
  display.setRangeText(value, start, end, "end");
  sanitizeCalculatorInput(display);
  display.focus();
}
function calculatorBackspace() {
  const display = document.getElementById("calculatorDisplay");
  const start = display.selectionStart ?? display.value.length;
  const end = display.selectionEnd ?? display.value.length;
  if (start !== end) display.setRangeText("", start, end, "end");
  else if (start > 0) display.setRangeText("", start - 1, start, "end");
  display.focus();
}
function clearCalculator() {
  document.getElementById("calculatorDisplay").value = "";
  const result = document.getElementById("calculatorResult");
  result.hidden = true; result.textContent = ""; result.classList.remove("error");
  document.getElementById("calculatorDisplay").focus();
}
function calculateBasic() {
  const display = document.getElementById("calculatorDisplay");
  const result = document.getElementById("calculatorResult");
  const expression = display.value.trim()
    .replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
    .replace(/([⁻]?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_, sign, digits) => "^" + (sign ? "-" : "") + [...digits].map(d => String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(d))).join(""))
    .replace(/√/g, "sqrt").replace(/,/g, ".");
  result.hidden = false;
  result.classList.remove("error");
  if (!expression) {
    result.classList.add("error");
    result.textContent = "لطفاً یک عبارت ریاضی وارد کن.";
    return;
  }
  try {
    const tokens = expression.match(/sqrt|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?|[()+\-*/%^]/gi);
    if (!tokens || tokens.join("") !== expression.replace(/\s+/g, "")) throw new Error("عبارت ریاضی نامعتبر است.");
    let pos = 0;
    const steps = [];
    const fmt = value => Number(value.toPrecision(10)).toString();
    const peek = () => tokens[pos];
    const take = () => tokens[pos++];
    function primary() {
      const token = take();
      if (token === "+") return unary();
      if (token === "-") return -unary();
      if (token === "(") {
        const value = addSub();
        if (take() !== ")") throw new Error("پرانتزها کامل نیستند.");
        return value;
      }
      if (String(token).toLowerCase() === "sqrt") {
        if (take() !== "(") throw new Error("بعد از √ باید پرانتز باز بیاید.");
        const value = addSub();
        if (take() !== ")") throw new Error("پرانتز جذر کامل نیست.");
        if (value < 0) throw new Error("جذر عدد منفی در اعداد حقیقی تعریف نشده است.");
        const answer = Math.sqrt(value);
        steps.push("√(" + fmt(value) + ") = " + fmt(answer));
        return answer;
      }
      if (token === undefined || !/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(token)) throw new Error("عبارت ریاضی نامعتبر است.");
      return Number(token);
    }
    function unary() { return power(); }
    function power() {
      let value = primary();
      if (peek() === "^") {
        take();
        const exponent = unary();
        const before = value;
        value = Math.pow(value, exponent);
        steps.push(fmt(before) + " ^ " + fmt(exponent) + " = " + fmt(value));
      }
      while (peek() === "%") {
        take();
        const before = value;
        value /= 100;
        steps.push(fmt(before) + "% = " + fmt(value));
      }
      return value;
    }
    function mulDiv() {
      let value = unary();
      while (peek() === "*" || peek() === "/") {
        const op = take();
        const next = unary();
        if (op === "/" && next === 0) throw new Error("تقسیم بر صفر امکان‌پذیر نیست.");
        const before = value;
        value = op === "*" ? value * next : value / next;
        steps.push(fmt(before) + (op === "*" ? " × " : " ÷ ") + fmt(next) + " = " + fmt(value));
      }
      return value;
    }
    function addSub() {
      let value = mulDiv();
      while (peek() === "+" || peek() === "-") {
        const op = take();
        const next = mulDiv();
        const before = value;
        value = op === "+" ? value + next : value - next;
        steps.push(fmt(before) + (op === "+" ? " + " : " − ") + fmt(next) + " = " + fmt(value));
      }
      return value;
    }
    const answer = addSub();
    if (pos !== tokens.length) throw new Error("عبارت ریاضی نامعتبر است.");
    if (!Number.isFinite(answer)) throw new Error("نتیجه خارج از محدودهٔ قابل محاسبه است.");
    result.classList.remove("error");
    result.innerHTML = "";
    if (steps.length) {
      const heading = document.createElement("div");
      heading.className = "calc-steps-heading";
      heading.textContent = "مراحل محاسبه";
      result.appendChild(heading);
      const list = document.createElement("div");
      list.className = "calc-steps-list";
      steps.forEach((step, index) => {
        const item = document.createElement("div");
        item.className = "calc-step";
        const number = document.createElement("span");
        number.className = "calc-step-number";
        number.textContent = index + 1;
        const detail = document.createElement("span");
        detail.className = "calc-step-detail";
        detail.textContent = step;
        item.append(number, detail);
        list.appendChild(item);
      });
      result.appendChild(list);
    }
    const final = document.createElement("div");
    final.className = "calc-final-answer";
    const label = document.createElement("span");
    label.textContent = "جواب نهایی";
    const value = document.createElement("strong");
    value.dir = "ltr";
    value.textContent = fmt(answer);
    final.append(label, value);
    result.appendChild(final);
  } catch (error) {
    result.classList.add("error");
    result.textContent = error.message || "عبارت ریاضی نامعتبر است.";
  }
}


function readInteger(inputId, min, max) {
  const raw = document.getElementById(inputId).value.trim();

  if (raw === "") return { error: "لطفاً عدد را وارد کن." };

  const value = Number(raw);

  if (!Number.isSafeInteger(value))
    return { error: "لطفاً یک عدد صحیح معتبر وارد کن." };

  if (value < min || value > max)
    return { error: "عدد باید بین " + min + " و " + max + " باشد." };

  return { value };
}

function showResult(elementId, message, isError) {
  const element = document.getElementById(elementId);
  element.hidden = false;
  element.classList.toggle("error", Boolean(isError));
  element.textContent = message;
}

function runSieve() {
  const parsed = readInteger("sieveLimit", 2, 10000);
  const result = document.getElementById("sieveResult");
  const grid = document.getElementById("sieveGrid");

  grid.replaceChildren();

  if (parsed.error) {
    showResult("sieveResult", parsed.error, true);
    return;
  }

  const limit = parsed.value;
  const isPrime = new Array(limit + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let m = p * p; m <= limit; m += p) {
        isPrime[m] = false;
      }
    }
  }

  const primes = [];

  for (let n = 2; n <= limit; n++) {
    const cell = document.createElement("div");
    cell.className = "number-cell";
    cell.textContent = n;

    if (isPrime[n]) {
      primes.push(n);
      cell.classList.add("prime");
    } else {
      cell.classList.add("not-prime");
    }

    grid.appendChild(cell);
  }

  result.hidden = false;
  result.classList.remove("error");
  result.textContent =
    "تعداد اعداد اول تا " + limit + ": " + primes.length +
    " | اعداد اول: " + primes.join("، ");
}

function gcd(a, b) {
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function calculateGcdLcm() {
  const first = readInteger("num1", 0, 10000000);
const second = readInteger("num2", 0, 10000000);
  if (first.error) {
    showResult("gcdResult", first.error, true);
    return;
  }

  if (second.error) {
    showResult("gcdResult", second.error, true);
    return;
  }

  const a = first.value;
  const b = second.value;

  if (a === 0 && b === 0) {
    showResult(
      "gcdResult",
      "برای صفر و صفر، ب.م.م و ک.م.م در این محاسبه تعریف نمی‌شوند.",
      true
    );
    return;
  }

  const g = gcd(a, b);
  const l = a === 0 || b === 0 ? 0 : (a / g) * b;

  showResult("gcdResult", "ب.م.م = " + g + "\nک.م.م = " + l, false);
}

function isPrimeNumber(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let d = 3; d <= Math.floor(Math.sqrt(n)); d += 2) {
    if (n % d === 0) return false;
  }

  return true;
}

function checkPrime() {
  const parsed = readInteger("primeNumber", 2, 100000000);

  if (parsed.error) {
    showResult("primeResult", parsed.error, true);
    return;
  }

  const n = parsed.value;

  showResult(
    "primeResult",
    isPrimeNumber(n)
      ? n + " یک عدد اول است."
      : n + " عدد اول نیست؛ عددی مرکب است.",
    false
  );
}

function factorizeNumber() {
  const input = document.getElementById("factorNumber");
  const result = document.getElementById("factorResult");
  const raw = input.value.trim();
  const number = Number(raw);

  if (
    raw === "" ||
    !Number.isSafeInteger(number) ||
    number < 2 || number > 100000000
  ) {
    result.hidden = false;
    result.classList.add("error");
    result.textContent =
      "لطفاً یک عدد صحیح بین ۲ تا ۱۰۰٬۰۰۰٬۰۰۰ وارد کن.";
    return;
  }
if (isPrimeNumber(number)) {
  result.hidden = false;
  result.classList.remove("error");
  result.replaceChildren();

  const message = document.createElement("div");
  message.className = "factor-final";
  message.textContent =
    number + " یک عدد اول است و به عوامل اول کوچک‌تر تجزیه نمی‌شود.";

  result.appendChild(message);
  return;
}
  // محاسبه عوامل اول
  const factors = [];
  let remaining = number;

  for (
    let divisor = 2;
    divisor * divisor <= remaining;
    divisor++
  ) {
    while (remaining % divisor === 0) {
      factors.push(divisor);
      remaining /= divisor;
    }
  }

  if (remaining > 1) factors.push(remaining);

  // نمایش توان عوامل تکراری
  const powers = {};

  for (const factor of factors) {
    powers[factor] = (powers[factor] || 0) + 1;
  }

  const equation = Object.entries(powers)
    .map(([factor, power]) =>
      power === 1
        ? factor
        : `${factor}<sup>${power}</sup>`
    )
    .join(" × ");

  // ساخت درخت تجزیه
  function buildTree(value) {
    for (
      let divisor = 2;
      divisor * divisor <= value;
      divisor++
    ) {
      if (value % divisor === 0) {
        return {
          value,
          left: buildTree(divisor),
          right: buildTree(value / divisor)
        };
      }
    }

    return {
      value,
      left: null,
      right: null
    };
  }

  // تعیین مختصات مشترک برای عددها و انتهای شاخه‌ها
  function layoutTree(root) {
    const nodes = [];
    const edges = [];
    const leafGap = 76;
    const levelGap = 82;
    const margin = 35;
    let leafIndex = 0;

    function place(node, depth) {
      let x;

      if (node.left === null && node.right === null) {
        x = margin + leafIndex * leafGap;
        leafIndex++;
      } else {
        const left = place(node.left, depth + 1);
        const right = place(node.right, depth + 1);

        x = (left.x + right.x) / 2;

        edges.push({
          x1: x,
          y1: depth * levelGap + 28,
          x2: left.x,
          y2: (depth + 1) * levelGap + 28
        });

        edges.push({
          x1: x,
          y1: depth * levelGap + 28,
          x2: right.x,
          y2: (depth + 1) * levelGap + 28
        });
      }

      const item = {
        value: node.value,
        x,
        y: depth * levelGap + 28,
        leaf: node.left === null && node.right === null
      };

      nodes.push(item);
      return item;
    }

    place(root, 0);

    return {
      nodes,
      edges,
      width: Math.max(
        300,
        margin * 2 + Math.max(0, leafIndex - 1) * leafGap
      ),
      height:
        Math.max(...nodes.map(node => node.y)) + 45
    };
  }

  // رسم خطوط SVG و قرار دادن مرکز هر عدد روی مختصات گره
  function drawTree(root) {
    const layout = layoutTree(root);
    const canvas = document.createElement("div");

    canvas.className = "tree-canvas";
    canvas.dir = "ltr";
    canvas.style.width = layout.width + "px";
    canvas.style.height = layout.height + "px";

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute(
      "viewBox",
      `0 0 ${layout.width} ${layout.height}`
    );
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.setAttribute("aria-hidden", "true");

    for (const edge of layout.edges) {
      const line = document.createElementNS(svgNS, "line");

      line.setAttribute("x1", edge.x1);
      line.setAttribute("y1", edge.y1);
      line.setAttribute("x2", edge.x2);
      line.setAttribute("y2", edge.y2);
      line.setAttribute("class", "tree-line");

      svg.appendChild(line);
    }

    canvas.appendChild(svg);

    for (const node of layout.nodes) {
      const element = document.createElement("span");

      element.className = node.leaf
        ? "tree-leaf"
        : "tree-node";

      element.textContent = node.value;
      element.style.left = node.x + "px";
      element.style.top = node.y + "px";

      canvas.appendChild(element);
    }

    return canvas;
  }

  // نمایش نتیجه
  result.hidden = false;
  result.classList.remove("error");
  result.replaceChildren();

  const finalBox = document.createElement("div");
  finalBox.className = "factor-final";

  const title = document.createElement("h3");
  title.textContent = "تجزیه به عوامل اول";

  const equationBox = document.createElement("div");
  equationBox.className = "factor-equation";
  equationBox.dir = "ltr";
  equationBox.innerHTML = equation;

  finalBox.append(title, equationBox);

  const treeBox = document.createElement("div");
  treeBox.className = "factor-tree";

  const treeTitle = document.createElement("h3");
  treeTitle.textContent = "درخت تجزیه";

  treeBox.append(
    treeTitle,
    drawTree(buildTree(number))
  );

  result.append(finalBox, treeBox);
}

function calculateFractions() {
  const n1 = Number(document.getElementById("fraction-num1").value);
const d1 = Number(document.getElementById("fraction-den1").value);
const n2 = Number(document.getElementById("fraction-num2").value);
const d2 = Number(document.getElementById("fraction-den2").value);

  const operation = document.getElementById("fraction-operation").value;
  const result = document.getElementById("fraction-result");
result.replaceChildren();
result.classList.remove("error");
result.hidden = true;
  const inputs = ["fraction-num1", "fraction-den1", "fraction-num2", "fraction-den2"];

 if (inputs.some(id => document.getElementById(id).value.trim() === "")) {
  result.hidden = false;
  result.classList.add("error");
  result.textContent = "لطفاً صورت و مخرج هر دو کسر را وارد کن.";
  return;
}
  if (![n1, d1, n2, d2].every(Number.isSafeInteger)) {
  result.hidden = false;
  result.classList.add("error");
  result.textContent = "لطفاً برای صورت و مخرج کسرها عدد صحیح معتبر وارد کن.";
  return;
}
  if (d1 === 0 || d2 === 0) {
  result.hidden = false;
  result.classList.add("error");
  result.textContent = "مخرج کسر نمی‌تواند صفر باشد.";
  return;
}
  let numerator;
  let denominator;

  if (operation === "add") {
    numerator = n1 * d2 + n2 * d1;
    denominator = d1 * d2;
  } else if (operation === "subtract") {
    numerator = n1 * d2 - n2 * d1;
    denominator = d1 * d2;
  } else if (operation === "multiply") {
    numerator = n1 * n2;
    denominator = d1 * d2;
  } else {
  if (n2 === 0) {
  result.hidden = false;
  result.classList.add("error");
  result.textContent = "تقسیم بر کسر صفر امکان‌پذیر نیست.";
  return;
}
    numerator = n1 * d2;
    denominator = d1 * n2;
  }

  if (!Number.isSafeInteger(numerator) ||
    !Number.isSafeInteger(denominator)) {
  result.hidden = false;
  result.classList.add("error");
  result.textContent = "اعداد خیلی بزرگ هستند؛ لطفاً اعداد کوچک‌تری وارد کن.";
  return;
}

  if (denominator < 0) {
    numerator = -numerator;
    denominator = -denominator;
  }

  function gcdForFractions(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const remainder = a % b;
      a = b;
      b = remainder;
    }

    return a;
  }

  const divisor = gcdForFractions(numerator, denominator);
  numerator /= divisor || 1;
  denominator /= divisor || 1;

 
result.replaceChildren();
result.classList.remove("error");
result.hidden = false;
const title = document.createElement("div");
title.textContent = "جواب نهایی";
title.style.fontWeight = "800";
title.style.marginBottom = "12px";
result.appendChild(title);

if (denominator === 1) {
  const whole = document.createElement("div");
  whole.textContent = String(numerator);
  whole.style.fontSize = "28px";
  whole.style.fontWeight = "800";
  result.appendChild(whole);
} else {
  const fraction = document.createElement("span");
  fraction.style.display = "inline-flex";
  fraction.style.flexDirection = "column";
  fraction.style.alignItems = "center";
  fraction.style.fontSize = "24px";
  fraction.style.fontWeight = "800";

  const top = document.createElement("span");
  top.textContent = String(numerator);
  top.style.padding = "0 10px 4px";

  const line = document.createElement("span");
  line.style.width = "100%";
  line.style.borderTop = "2px solid currentColor";

  const bottom = document.createElement("span");
  bottom.textContent = String(denominator);
  bottom.style.padding = "4px 10px 0";

  fraction.append(top, line, bottom);
  result.appendChild(fraction);
}

}


/* فعال‌کردن محاسبه با Enter */
(function () {
  const tools = [
    { page: "sequence-calculator", inputs: ["seqStart", "seqEnd", "seqStep"], calculate: calculateSequence },
    { page: "factorization", inputs: ["factorNumber"], calculate: factorizeNumber },
    {
      page: "fractions",
      inputs: ["fraction-num1", "fraction-den1", "fraction-num2", "fraction-den2"],
      calculate: calculateFractions
    },
    { page: "sieve", inputs: ["sieveLimit"], calculate: runSieve },
    { page: "gcd", inputs: ["num1", "num2"], calculate: calculateGcdLcm },
    { page: "prime", inputs: ["primeNumber"], calculate: checkPrime }
  ];

  tools.forEach(function (tool) {
    tool.inputs.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;

      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && input.id.startsWith("calculator")) {
          event.preventDefault();
          calculateBasic();
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          tool.calculate();
        }
      });
    });
  });
})();

/* ورودی ابزارهای عددی: فقط رقم و علامت منفی مجاز است.
   نمایشگر ماشین‌حساب مستثناست چون عبارت ریاضی می‌پذیرد. */
(function () {
  const numericInputs = Array.from(document.querySelectorAll('input[type="number"]'))
    .filter(input => input.id !== "calculatorDisplay");

  numericInputs.forEach(input => {
    input.addEventListener("input", function () {
      const cleaned = this.value.replace(/[^0-9-]/g, "");
      const normalized = cleaned.startsWith("-")
        ? "-" + cleaned.slice(1).replace(/-/g, "")
        : cleaned.replace(/-/g, "");
      if (this.value !== normalized) {
        const start = this.selectionStart;
        const before = this.value;
        this.value = normalized;
        if (start !== null) {
          const removedBeforeCursor = before.slice(0, start).replace(/[0-9-]/g, "").length;
          const cursor = Math.max(0, start - removedBeforeCursor);
          try { this.setSelectionRange(cursor, cursor); } catch (_) {}
        }
      }
    });

    input.addEventListener("paste", function (event) {
      const pasted = (event.clipboardData || window.clipboardData).getData("text");
      if (/[^0-9-]/.test(pasted)) {
        event.preventDefault();
        const cleaned = pasted.replace(/[^0-9-]/g, "");
        const start = this.selectionStart ?? this.value.length;
        const end = this.selectionEnd ?? start;
        this.setRangeText(cleaned, start, end, "end");
        this.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });
})();

(function(){
 document.querySelectorAll('.seo-learning .guide-toggle').forEach(function(btn){
  btn.addEventListener('click',function(){
   var desc=btn.nextElementSibling;
   if(!desc)return;
   var opening=desc.hidden;
   desc.hidden=!opening;
   btn.setAttribute('aria-expanded',String(opening));
  });
 });
 function openToolCard(card){
  if(!card)return;
  var id=card.dataset.page;
  if(id==='extra-percent')openExtra('percent');
  else if(id==='extra-average')openExtra('average');
  else showPage(id);
 }
 document.querySelectorAll('.tool-card').forEach(function(card){
  card.style.cursor='pointer';
  card.addEventListener('click',function(e){
   if(e.target.closest('button'))return;
   openToolCard(card);
  });
  var btn=card.querySelector('.tool-open');
  if(btn)btn.addEventListener('click',function(e){
   e.preventDefault();
   e.stopPropagation();
   openToolCard(card);
  });
 });
})();
(function(){var search=document.getElementById('toolSearch'),cards=Array.from(document.querySelectorAll('.tool-card')),category='all',favorites=[];try{favorites=JSON.parse(localStorage.getItem('mathToolsFavorites')||'[]')}catch(e){}function render(){var q=(search.value||'').toLocaleLowerCase('fa').trim(),visible=0;cards.forEach(function(card){var text=card.innerText.toLocaleLowerCase('fa'),id=card.dataset.page||'',cat=(id==='calculator'||id==='fractions'||id==='gcd'||id==='sequence-calculator'||id.startsWith('extra-'))?'basic':'number',fav=document.getElementById('favoritesToggle').classList.contains('active');var ok=(!q||text.indexOf(q)>=0)&& (category==='all'||category===cat)&&(!fav||favorites.indexOf(id)>=0);card.hidden=!ok;if(ok)visible++});var empty=document.getElementById('emptySearch');if(!empty){empty=document.createElement('p');empty.id='emptySearch';empty.className='empty-search';empty.textContent='ابزاری پیدا نشد؛ عبارت دیگری امتحان کن.';document.querySelector('.tool-grid').after(empty)}empty.classList.toggle('show',visible===0)}search.addEventListener('input',render);document.querySelectorAll('.category-chip').forEach(function(b){b.addEventListener('click',function(){category=b.dataset.category;document.querySelectorAll('.category-chip').forEach(function(x){x.classList.toggle('active',x===b)});render()})});var favButton=document.getElementById('favoritesToggle');favButton.addEventListener('click',function(){favButton.classList.toggle('active');favButton.textContent=favButton.classList.contains('active')?'♥ نمایش همه ابزارها':'♡ علاقه‌مندی‌ها';render()});cards.forEach(function(card){var b=document.createElement('button');b.type='button';b.textContent='♡';b.title='افزودن به علاقه‌مندی‌ها';b.style.cssText='align-self:flex-end;border:0;background:transparent;color:#ff8fb4;font-size:22px;padding:2px 8px';b.addEventListener('click',function(e){e.stopPropagation();var id=card.dataset.page||'';favorites=favorites.indexOf(id)>=0?favorites.filter(function(x){return x!==id}):favorites.concat(id);try{localStorage.setItem('mathToolsFavorites',JSON.stringify(favorites))}catch(e){}b.textContent=favorites.indexOf(id)>=0?'♥':'♡';render()});card.prepend(b)});render()})();
