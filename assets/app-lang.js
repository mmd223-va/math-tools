(function(){
  const translations = {
    "معادله خط":"Line Equation",
    "ساده کردن کسر":"Simplify a Fraction",
    "مساحت و محیط اشکال":"Area and Perimeter",
    "فاکتوریل، جایگشت و ترکیب":"Factorial, Permutation and Combination",
    "قاعده سه‌تایی":"Rule of Three",
    "حل دستگاه دو معادله دو مجهول":"Solve a 2×2 System",
    "✓ رایگان":"✓ Free",
    "✓ بدون ثبت‌نام":"✓ No sign-up",
    "✓ همراه با مراحل حل":"✓ With step-by-step solutions",
    "✓ فارسی و English":"✓ Persian and English",
    "ابزارهای ریاضی":"Math Tools",
    "نظرت برای ما مهم است":"Your feedback matters",
    "ایده‌ای برای یک ابزار جدید داری یا چیزی درست کار نمی‌کند؟ به من خبر بده تا سایت را بهتر کنم.":"Have an idea for a new tool, or something not working? Let me know so I can improve the site.",
    "ثبت پیشنهاد":"Send a suggestion",
    "ایده برای ابزار یا بهبود سایت":"An idea for a tool or the site",
    "گزارش مشکل":"Report a problem",
    "چیزی درست کار نمی‌کند؟":"Is something not working?",
    "حل معادله درجه دوم":"Solve a Quadratic Equation",
    "چطور معادله ax² + bx + c = 0 را حل کنیم؟":"How do we solve ax² + bx + c = 0?",
    "ابتدا Δ = b² − 4ac را حساب کن. اگر Δ مثبت باشد دو ریشه، اگر صفر باشد یک ریشهٔ مضاعف و اگر منفی باشد ریشهٔ حقیقی نداریم. ریشه‌ها از x = (−b ± √Δ) ÷ 2a به دست می‌آیند.":"First compute Δ = b² − 4ac. If Δ is positive there are two roots, if it is zero there is one repeated root, and if it is negative there are no real roots. The roots come from x = (−b ± √Δ) ÷ 2a.",
    "ضریب x² یعنی a":"Coefficient of x² (a)",
    "ضریب x یعنی b":"Coefficient of x (b)",
    "تبدیل مبنای اعداد":"Number Base Converter",
    "چطور عدد را از یک مبنا به مبنای دیگر ببریم؟":"How do we convert a number from one base to another?",
    "برای تبدیل به مبنای ۱۰، هر رقم را در توان مبنا ضرب و همه را جمع کن. برای تبدیل از مبنای ۱۰، عدد را پشت‌سرهم بر مبنا تقسیم کن و باقی‌مانده‌ها را از پایین به بالا بخوان.":"To convert to base 10, multiply each digit by the base raised to its position and add them up. To convert from base 10, divide the number by the base repeatedly and read the remainders from bottom to top.",
    "مبنای عدد":"Base of the number",
    "مبنای ۲ (دودویی)":"Base 2 (binary)",
    "مبنای ۸ (هشت‌هشتی)":"Base 8 (octal)",
    "مبنای ۱۰ (دهدهی)":"Base 10 (decimal)",
    "مبنای ۱۶ (شانزدهی)":"Base 16 (hexadecimal)",
    "تبدیل عدد":"Convert",
    "مثلاً 1":"e.g. 1",
    "مثلاً -5":"e.g. -5",
    "مثلاً 6":"e.g. 6",
    "مثلاً 1011":"e.g. 1011",
    "تغییر حالت ظاهری":"Change appearance",
    "حالت تیره":"Dark mode","حالت روشن":"Light mode",
    "✦ همراه هوشمند ریاضی تو":"✦ Your smart math companion",
    "ابزارهای ریاضی آنلاین؛ محاسبه آسان و رایگان":"Online Math Tools — Easy and Free Calculations",
    "با ۱۸ ابزار رایگان ریاضی، محاسباتی مثل کسر و درصد، میانگین، ب.م.م و ک.م.م و پیدا کردن اعداد اول را آنلاین انجام بده؛ بدون نیاز به نصب برنامه.":"Use 18 free online math tools to calculate fractions, percentages, averages, GCD and LCM, and find prime numbers — no installation required.",
    "شروع با تجزیه اعداد":"Start Factoring Numbers","جعبه‌ابزار ریاضی":"Math Toolbox",
    "ابزار موردنیازت را انتخاب کن.":"Choose the tool you need.","18 ابزار":"18 tools",
    "جست‌وجوی ابزار":"Search tools","♡ علاقه‌مندی‌ها":"♡ Favorites",
    "همه":"All","محاسبات پایه":"Basic calculations","نظریه اعداد":"Number theory",
    "باز کردن ابزار ←":"Open tool →","ماشین‌حساب دنباله‌ای":"Sequence Calculator",
    "تجزیه عدد به عوامل اول":"Prime Factorization","ماشین‌حساب":"Calculator",
    "محاسبه کسرها":"Fraction Calculator","ب.م.م و ک.م.م":"GCD & LCM",
    "تشخیص عدد اول":"Prime Checker","غربال اراتستن":"Sieve of Eratosthenes",
    "محاسبه درصد":"Percentage Calculator","میانگین":"Average",
    "راهنمای کوتاه ابزارهای ریاضی":"A Quick Guide to Math Tools",
    "در این مجموعه می‌توانی محاسبات رایج ریاضی را آنلاین انجام بدهی و برای تمرین‌های درسی از ابزارهای رایگان استفاده کنی.":"Use these free tools to perform common math calculations online and practice what you learn.",
    "ب.م.م و ک.م.م چیست؟":"What are GCD and LCM?",
    "تجزیه عدد به عوامل اول":"Prime Factorization",
    "چطور بفهمیم یک عدد اول است؟":"How can you tell if a number is prime?",
    "غربال اراتستن چیست؟":"What is the Sieve of Eratosthenes?",
    "محاسبه کسرها و چهار عمل اصلی":"Fractions and the Four Basic Operations",
    "💬 پیشنهادی داری؟ یا مشکلی پیدا کردی؟":"💬 Have a suggestion or found a problem?",
    "نظرت کمک می‌کند ابزارهای ریاضی را بهتر کنیم. برای ثبت پیشنهاد یا گزارش مشکل، یکی از گزینه‌ها را انتخاب کن.":"Your feedback helps us improve these math tools. Choose an option to send a suggestion or report a problem.",
    "💡 ثبت پیشنهاد":"💡 Submit a suggestion","🐞 گزارش مشکل":"🐞 Report a problem",
    "ساخته‌شده برای یادگیری بهتر ریاضی":"Made to make learning math easier",
    "✦ یاد بگیر، محاسبه کن، پیشرفت کن":"✦ Learn, calculate, improve",
    "مشاهده مخزن سایت در GitHub":"View the website repository on GitHub",
    "طراحی و توسعه توسط":"Designed and developed by",
    "← بازگشت":"← Back","← بازگشت به صفحه اصلی":"← Back to home",
    "عدد شروع، عدد پایان و فاصله را وارد کن؛ سپس عملیات موردنظرت را روی دنباله انجام بده.":"Enter the start, end, and step values, then choose an operation for the sequence.",
    "یک عدد صحیح بزرگ‌تر یا مساوی ۲ وارد کن.":"Enter an integer greater than or equal to 2.",
    "دو کسر وارد کن و عمل ریاضی موردنظرت رو انتخاب کن.":"Enter two fractions and choose the operation you want.",
    "یک عدد صحیح بین ۲ تا ۱۰۰۰۰ وارد کن تا اعداد اول را پیدا کنیم.":"Enter an integer between 2 and 10,000 to find prime numbers.",
    "دو عدد صحیح نامنفی وارد کن؛ حداقل یکی باید بزرگ‌تر از صفر باشد.":"Enter two non-negative integers; at least one must be greater than zero.",
    "عبارت دلخواهت را با چند عدد، پرانتز و عملگرهای ریاضی وارد کن.":"Enter an expression using numbers, parentheses, and mathematical operators.",
    "با ماشین‌حساب می‌توانی جمع، تفریق، ضرب و تقسیم را انجام بدهی و با ابزار محاسبه کسرها، حاصل عملیات روی دو کسر را به دست بیاوری.":"Use the calculator for addition, subtraction, multiplication, and division. The fraction calculator performs operations on two fractions.",
    "عدد شروع و پایان باید عدد صحیح معتبر باشند؛ فاصله باید عدد صحیح مثبت باشد و پایان نباید از شروع کوچک‌تر باشد.":"Start and end must be valid integers. The step must be a positive integer, and the end must not be smaller than the start.",
    "ابزاری پیدا نشد؛ عبارت دیگری امتحان کن.":"No tools found; try another search.",
    "تغییر حالت ظاهری":"Change appearance",
    "عدد شروع":"Start number","عدد پایان":"End number","فاصله بین عددها":"Step",
    "نوع عملیات":"Operation","جمع همه عددها":"Add all numbers","تفریق پشت‌سرهم":"Subtract in sequence",
    "ضرب همه عددها":"Multiply all numbers","تقسیم پشت‌سرهم":"Divide in sequence",
    "یکی‌درمیان، با جمع شروع شود":"Alternate, starting with addition",
    "یکی‌درمیان، با تفریق شروع شود":"Alternate, starting with subtraction",
    "محاسبه":"Calculate","یک عدد صحیح بزرگ‌تر یا مساوی ۲ وارد کن.":"Enter an integer greater than or equal to 2.",
    "تجزیه عدد":"Factorize","دو کسر وارد کن و عمل ریاضی موردنظرت رو انتخاب کن.":"Enter two fractions and choose the operation you want.",
    "کسر اول":"First fraction","کسر دوم":"Second fraction","صورت":"Numerator","مخرج":"Denominator",
    "عملیات":"Operation","جمع (+)":"Addition (+)","تفریق (−)":"Subtraction (−)",
    "ضرب (×)":"Multiplication (×)","تقسیم (÷)":"Division (÷)",
    "یک عدد صحیح بین ۲ تا ۱۰۰۰۰ وارد کن تا اعداد اول را پیدا کنیم.":"Enter an integer between 2 and 10,000 to find prime numbers.",
    "پیدا کردن اعداد اول":"Find prime numbers","دو عدد صحیح نامنفی وارد کن؛ حداقل یکی باید بزرگ‌تر از صفر باشد.":"Enter two non-negative integers; at least one must be greater than zero.",
    "عدد اول":"First number","عدد دوم":"Second number","بررسی عدد":"Check number",
    "عبارت دلخواهت را با چند عدد، پرانتز و عملگرهای ریاضی وارد کن.":"Enter an expression using numbers, parentheses, and mathematical operators.",
    "عبارت ریاضی":"Math expression","چهار عمل اصلی، پرانتز، درصد، توان و جذر. با Enter محاسبه کن.":"The four basic operations, parentheses, percentages, powers, and square roots. Press Enter to calculate.",
    "مثلاً 4":"e.g. 4","مثلاً 10":"e.g. 10","مثلاً 2":"e.g. 2","مثلاً 60":"e.g. 60",
    "مثلاً 30":"e.g. 30","مثلاً 17":"e.g. 17","عدد اول":"First number",
    "لطفاً هر سه مقدار را وارد کن.":"Please enter all three values.",
    "عدد شروع و پایان باید عدد صحیح معتبر باشند؛ فاصله باید عدد صحیح مثبت باشد و پایان نباید از شروع کوچک‌تر باشد.":"Start and end must be valid integers. The step must be a positive integer, and the end must not be smaller than the start.",
    "این دنباله بیش از ۵۰۰۰ عدد دارد. لطفاً فاصله را بیشتر یا بازه را کوچک‌تر کن.":"This sequence contains more than 5,000 numbers. Increase the step or reduce the range.",
    "تقسیم بر صفر امکان‌پذیر نیست. دنباله را طوری تغییر بده که بعد از عدد اول، صفر نداشته باشد.":"Division by zero is not possible. Change the sequence so that no zero appears after the first number.",
    "نتیجه بیش از محدوده قابل محاسبه است.":"The result is outside the supported calculation range.",
    "نمایش مراحل محاسبه":"Show calculation steps","برای جلوگیری از شلوغ شدن صفحه، فقط ۱۰ عدد اول و ۵ عدد آخر نمایش داده شده‌اند.":"To keep the page readable, only the first 10 and last 5 numbers are shown.",
    "جواب نهایی:":"Final answer:","تعداد اعداد: ":"Number of values: ","کپی جواب":"Copy answer",
    "کپی شد ✓":"Copied ✓","کپی خودکار در دسترس نیست":"Automatic copying is unavailable",
    "لطفاً یک عبارت ریاضی وارد کن.":"Please enter a mathematical expression.",
    "عبارت ریاضی نامعتبر است.":"Invalid mathematical expression.",
    "پرانتزها کامل نیستند.":"The parentheses are not balanced.",
    "بعد از √ باید پرانتز باز بیاید.":"An opening parenthesis must follow √.",
    "پرانتز جذر کامل نیست.":"The square-root parentheses are not balanced.",
    "جذر عدد منفی در اعداد حقیقی تعریف نشده است.":"The square root of a negative number is not defined in the real numbers.",
    "تقسیم بر صفر امکان‌پذیر نیست.":"Division by zero is not possible.",
    "نتیجه خارج از محدودهٔ قابل محاسبه است.":"The result is outside the supported calculation range.",
    "لطفاً عدد را وارد کن.":"Please enter a number.",
    "لطفاً یک عدد صحیح معتبر وارد کن.":"Please enter a valid integer.",
    "عدد باید بین ":"The number must be between ",
    "تعداد اعداد اول تا ":"Number of primes up to ",
    " | اعداد اول: ":" | Prime numbers: ",
    "برای صفر و صفر، ب.م.م و ک.م.م در این محاسبه تعریف نمی‌شوند.":"GCD and LCM are undefined for zero and zero in this calculation.",
    "ب.م.م = ":"GCD = ","ک.م.م = ":"LCM = ",
    " یک عدد اول است.":" is a prime number."," عدد اول نیست؛ عددی مرکب است.":" is not prime; it is composite.",
    "لطفاً یک عدد صحیح بین ۲ تا ۱۰۰٬۰۰۰٬۰۰۰ وارد کن.":"Please enter an integer between 2 and 100,000,000.",
    " یک عدد اول است و به عوامل اول کوچک‌تر تجزیه نمی‌شود.":" is prime and cannot be factored into smaller prime factors.",
    "تجزیه به عوامل اول":"Prime factorization","درخت تجزیه":"Factor tree",
    "لطفاً صورت و مخرج هر دو کسر را وارد کن.":"Please enter the numerator and denominator of both fractions.",
    "لطفاً برای صورت و مخرج کسرها عدد صحیح معتبر وارد کن.":"Please enter valid integers for the numerators and denominators.",
    "مخرج کسر نمی‌تواند صفر باشد.":"A fraction's denominator cannot be zero.",
    "تقسیم بر کسر صفر امکان‌پذیر نیست.":"Division by a zero fraction is not possible.",
    "اعداد خیلی بزرگ هستند؛ لطفاً اعداد کوچک‌تری وارد کن.":"The numbers are too large. Please enter smaller numbers.",
    "جواب نهایی":"Final answer",
    "چطور کار می‌کند؟":"How does it work?",
    "ابزاری پیدا نشد؛ عبارت دیگری امتحان کن.":"No tools found; try another search.",
    "♥ نمایش همه ابزارها":"♥ Show all tools","افزودن به علاقه‌مندی‌ها":"Add to favorites",
    "🕘 تاریخچه محاسبات":"🕘 Calculation history","⚙️ تنظیمات ظاهری":"⚙️ Appearance settings",
    "محاسبه میانگین":"Calculate average","حل معادله درجه اول":"Linear equation solver",
    "چطور درصد یک عدد را حساب کنیم؟":"How do you calculate a percentage of a number?",
    "میانگین چند عدد چگونه به دست می‌آید؟":"How do you calculate the average of several numbers?",
    "چطور معادله ax + b = c را حل کنیم؟":"How do you solve the equation ax + b = c?",
    "درصد موردنظر را بر ۱۰۰ تقسیم کن و در عدد اصلی ضرب کن.":"Divide the percentage by 100 and multiply it by the original number.",
    "بزرگ‌ترین مقسوم‌علیه مشترک (ب.م.م) بزرگ‌ترین عددی است که دو عدد را بدون باقی‌مانده تقسیم می‌کند. کوچک‌ترین مضرب مشترک (ک.م.م) کوچک‌ترین مضرب مثبت مشترک دو عدد است. با ابزار ب.م.م و ک.م.م می‌توانی هر دو را محاسبه کنی.":"The greatest common divisor (GCD) is the largest number that divides two numbers without a remainder. The least common multiple (LCM) is the smallest positive multiple shared by two numbers. Use the GCD & LCM tool to calculate both.",
    "در تجزیه به عوامل اول، یک عدد مرکب را به حاصل‌ضرب عددهای اول می‌نویسیم. برای نمونه، ۱۲ برابر با ۲ × ۲ × ۳ است. ابزار تجزیه، عوامل اول و درخت تجزیه عدد را نمایش می‌دهد.":"Prime factorization expresses a composite number as a product of prime numbers. For example, 12 = 2 × 2 × 3. The factorization tool displays the prime factors and a factor tree.",
    "عدد اول عدد صحیح بزرگ‌تر از ۱ است که فقط دو مقسوم‌علیه مثبت دارد: ۱ و خودش. از ابزار تشخیص عدد اول استفاده کن تا اول یا مرکب بودن عدد را بررسی کنی.":"A prime number is an integer greater than 1 with exactly two positive divisors: 1 and itself. Use the prime checker to find out whether a number is prime or composite.",
    "غربال اراتستن روشی برای پیدا کردن اعداد اول تا یک حد مشخص است. در این روش، مضرب‌های عددهای اول را خط می‌زنیم و عددهایی که باقی می‌مانند، اول هستند. ابزار غربال اراتستن این فرایند را به‌صورت دیداری نشان می‌دهد.":"The Sieve of Eratosthenes is a method for finding all prime numbers up to a chosen limit. Multiples of prime numbers are crossed out, and the remaining numbers are prime. This tool illustrates the process.",
    "با ماشین‌حساب می‌توانی جمع، تفریق، ضرب و تقسیم را انجام بدهی و با ابزار محاسبه کسرها، حاصل عملیات روی دو کسر را به دست بیاوری.":"Use the calculator for addition, subtraction, multiplication, and division. The fraction calculator performs operations on two fractions.",
    "عدد":"Number","درصد":"Percentage","عددها را با ویرگول جدا کن":"Separate numbers with commas",
    "ضریب x یعنی a":"Coefficient of x (a)","عدد b":"Value of b","عدد c":"Value of c","حل معادله":"Solve equation",
    "همه عددها را جمع کن و حاصل را بر تعداد عددها تقسیم کن.":"Add all the numbers and divide the sum by how many numbers there are.",
    "ابتدا b را از دو طرف کم کن، سپس دو طرف را بر a تقسیم کن؛ a نباید صفر باشد.":"First subtract b from both sides, then divide both sides by a. a must not be zero.",
    "هر دو مقدار را وارد کن.":"Please enter both values.","چند عدد معتبر وارد کن و آن‌ها را با ویرگول جدا کن.":"Enter valid numbers separated by commas.",
    "هر سه مقدار را وارد کن.":"Please enter all three values.","ضریب x نباید صفر باشد.":"The coefficient of x must not be zero.",
    "جواب: ":"Answer: ","مراحل حل: ":"Solution steps: ","مجموع عددها: ":"Sum: ","؛ تعداد: ":"; Count: ","؛ میانگین = ":"; Average = ",
    "این ابزار چگونه کار می‌کند؟":"How does this tool work?",
    "تاریخچه محاسبات":"Calculation history","پاک کردن تاریخچه":"Clear history",
    "هنوز محاسبه‌ای در تاریخچه ثبت نشده است.":"No calculations have been saved in the history yet.",
    "نتیجه:":"Result:","ثبت شد":"Saved",
    "تنظیمات ظاهری":"Appearance settings","نمایش فشرده‌تر":"Compact layout",
    "نوشته‌های بزرگ‌تر":"Larger text","این ابزار چگونه کار می‌کند؟":"How does this tool work?"
  };
  const exact = value => translations[value] || value;
  // فهرست ترجمه‌ها فقط یک‌بار ساخته و مرتب می‌شود تا تغییر زبان سریع‌تر باشد.
  const translationKeys = Object.keys(translations).sort((a,b)=>b.length-a.length);
  function translateText(value){
    if(!value || !/[\u0600-\u06FF]/.test(value)) return value;
    if(translations[value]) return translations[value];
    let out=value;
    for(const key of translationKeys){if(key.length>2 && out.includes(key)) out=out.split(key).join(translations[key]);}
    return out;
  }
  function translateNode(node){
    if(node.nodeType===Node.TEXT_NODE){const v=translateText(node.nodeValue);if(v!==node.nodeValue)node.nodeValue=v;return;}
    if(node.nodeType!==Node.ELEMENT_NODE)return;
    if(node.id==="languageToggle" || node.closest("#language-switch-script"))return;
    for(const attr of ["placeholder","aria-label","title"]){
      if(node.hasAttribute(attr)){const v=translateText(node.getAttribute(attr));if(v!==node.getAttribute(attr))node.setAttribute(attr,v);}
    }
    if(node.tagName==="OPTION" || node.tagName==="BUTTON" || node.tagName==="LABEL" || node.tagName==="P" || node.tagName==="H1" || node.tagName==="H2" || node.tagName==="H3" || node.tagName==="SPAN" || node.tagName==="SUMMARY" || node.tagName==="STRONG" || node.tagName==="A"){
      for(const child of Array.from(node.childNodes))translateNode(child);
    } else if(node.tagName!=="SCRIPT" && node.tagName!=="STYLE" && node.tagName!=="INPUT" && node.tagName!=="TEXTAREA"){
      for(const child of Array.from(node.childNodes))translateNode(child);
    }
  }
  let language="fa";
  const button=document.getElementById("languageToggle");
  function applyLanguage(next){
    language=next==="en"?"en":"fa";
    document.documentElement.lang=language;
    document.documentElement.dir=language==="en"?"ltr":"rtl";
    document.body.classList.toggle("lang-en",language==="en");
    button.textContent=language==="en"?"فارسی":"English";
    button.setAttribute("aria-label",language==="en"?"Switch to Persian":"Switch to English");
    document.title=language==="en"?"Free Online Math Tools | Math Calculator and Prime Numbers":"ابزارهای ریاضی آنلاین رایگان | ۹ ابزار محاسباتی";
    const description=document.querySelector('meta[name="description"]');
    if(description)description.content=language==="en"?"Free online math tools for fractions, percentages, averages, GCD, LCM, prime numbers, factorization and calculations.":"با ۹ ابزار آنلاین ریاضی، کسر و درصد را محاسبه کن، میانگین بگیر، ب.م.م و ک.م.م را پیدا کن، اعداد اول را تشخیص بده و اعداد را تجزیه کن. رایگان و بدون نیاز به نصب.";
    const ogTitle=document.querySelector('meta[property="og:title"]');
    const ogDescription=document.querySelector('meta[property="og:description"]');
    const twitterTitle=document.querySelector('meta[name="twitter:title"]');
    const twitterDescription=document.querySelector('meta[name="twitter:description"]');
    if(ogTitle)ogTitle.content=language==="en"?"Free Online Math Tools":"ابزارهای ریاضی آنلاین و رایگان فارسی";
    if(ogDescription)ogDescription.content=description.content;
    if(twitterTitle)twitterTitle.content=document.title;
    if(twitterDescription)twitterDescription.content=description.content;
    if(language==="en")translateNode(document.querySelector("main"));
    else location.reload();
    try{localStorage.setItem("mathToolsLanguage",language)}catch(e){}
    const theme=document.getElementById("themeButton");
    if(theme && language==="en"){
      const dark=document.body.classList.contains("dark");
      theme.textContent=dark?"☀️ Light mode":"🌙 Dark mode";
      theme.setAttribute("aria-label","Change appearance");
    }
  }
  button.addEventListener("click",()=>applyLanguage(language==="fa"?"en":"fa"));
  let saved="fa";try{saved=localStorage.getItem("mathToolsLanguage")||"fa"}catch(e){}
  if(saved==="en")applyLanguage("en");
  const observer=new MutationObserver(records=>{
    if(language!=="en")return;
    for(const record of records){
      if(record.type==="childList")record.addedNodes.forEach(translateNode);
      else if(record.type==="characterData"){
        const translated=translateText(record.target.nodeValue);
        if(translated!==record.target.nodeValue)record.target.nodeValue=translated;
      }
    }
  });
  observer.observe(document.querySelector("main"),{subtree:true,childList:true,characterData:true});
  const themeButton=document.getElementById("themeButton");
  if(themeButton)observer.observe(themeButton,{subtree:true,childList:true,characterData:true});
})();
