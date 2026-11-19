(function(){
 const KEY='mathToolsHistoryV1', PREF='mathToolsPrefsV1';
 function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
 let history=read(KEY,[]),prefs=read(PREF,{dark:document.body.classList.contains('dark'),compact:false,large:false});
 function applyPrefs(){document.body.classList.toggle('dark',!!prefs.dark);document.body.classList.toggle('compact-ui',!!prefs.compact);document.body.classList.toggle('large-text',!!prefs.large);let b=document.getElementById('themeButton');if(b)b.textContent=prefs.dark?'☀️ حالت روشن':'🌙 حالت تیره';}
 function savePrefs(){try{localStorage.setItem(PREF,JSON.stringify(prefs))}catch(e){}applyPrefs()}
 window.toggleTheme=function(){prefs.dark=!prefs.dark;savePrefs()};
 document.getElementById('themeButton').addEventListener('click',window.toggleTheme);
 applyPrefs();
 const home=document.getElementById('home');
 if(home){
  const panel=document.createElement('section');panel.className='feature-panel';
  panel.innerHTML='<div class="feature-row"><button type="button" id="showHistory">🕘 تاریخچه محاسبات</button><button type="button" id="showPrefs">⚙️ تنظیمات ظاهری</button></div><div id="historyPanel" hidden></div><div id="prefsPanel" hidden></div>';
  const footer=home.querySelector('footer');if(footer)home.insertBefore(panel,footer);else home.appendChild(panel);
  document.getElementById('showHistory').addEventListener('click',()=>togglePanel('historyPanel',renderHistory));
  document.getElementById('showPrefs').addEventListener('click',()=>togglePanel('prefsPanel',renderPrefs));
 }
 function openExtra(kind){
  let old=document.getElementById('extraToolPage');if(old)old.remove();
  let title='',fields='',button='',desc='';
  if(kind==='percent'){title='محاسبه درصد';desc='چطور درصد یک عدد را حساب کنیم؟';fields='<label>عدد</label><input id="exA" type="number" placeholder="مثلاً 200"><label>درصد</label><input id="exB" type="number" placeholder="مثلاً 15">';button='محاسبه درصد';}
  if(kind==='average'){title='محاسبه میانگین';desc='میانگین چند عدد چگونه به دست می‌آید؟';fields='<label>عددها را با ویرگول جدا کن</label><input id="exA" type="text" placeholder="مثلاً 12، 15، 18">';button='محاسبه میانگین';}
  if(kind==='equation'){title='حل معادله درجه اول';desc='چطور معادله ax + b = c را حل کنیم؟';fields='<label>ضریب x یعنی a</label><input id="exA" type="number" placeholder="مثلاً 2"><label>عدد b</label><input id="exB" type="number" placeholder="مثلاً 4"><label>عدد c</label><input id="exC" type="number" placeholder="مثلاً 10">';button='حل معادله';}
  let page=document.createElement('section');page.id='extraToolPage';page.className='page active';page.innerHTML='<button class="back-button" type="button" id="extraBack">← بازگشت</button><h2>'+title+'</h2><details class="reveal-help"><summary>'+desc+'</summary><div class="help-content">'+(kind==='percent'?'درصد موردنظر را بر ۱۰۰ تقسیم کن و در عدد اصلی ضرب کن.':kind==='average'?'همه عددها را جمع کن و حاصل را بر تعداد عددها تقسیم کن.':'ابتدا b را از دو طرف کم کن، سپس دو طرف را بر a تقسیم کن؛ a نباید صفر باشد.')+'</div></details>'+fields+'<button class="action-button" type="button" id="extraRun">'+button+'</button><div class="result" id="extraResult" hidden></div>';
  document.querySelector('main').appendChild(page);document.querySelectorAll('.page').forEach(p=>{if(p!==page)p.classList.remove('active')});
  document.getElementById('extraBack').onclick=()=>{page.remove();showPage('home')};
  document.getElementById('extraRun').onclick=()=>{
   let out=document.getElementById('extraResult'),answer='',steps='';
   if(kind==='percent'){let a=Number(document.getElementById('exA').value),b=Number(document.getElementById('exB').value);if(!document.getElementById('exA').value||!document.getElementById('exB').value){answer='هر دو مقدار را وارد کن.'}else{answer=(a*b/100);steps=b+' ÷ ۱۰۰ × '+a+' = '+answer}}
   if(kind==='average'){let raw=document.getElementById('exA').value.trim(),nums=raw.split(/[,،\s]+/).filter(Boolean).map(Number);if(!raw||nums.some(n=>!Number.isFinite(n))){answer='چند عدد معتبر وارد کن و آن‌ها را با ویرگول جدا کن.'}else{let sum=nums.reduce((s,n)=>s+n,0);answer=sum/nums.length;steps='مجموع عددها: '+sum+'؛ تعداد: '+nums.length+'؛ میانگین = '+sum+' ÷ '+nums.length}}
   if(kind==='equation'){let a=Number(document.getElementById('exA').value),b=Number(document.getElementById('exB').value),cc=Number(document.getElementById('exC').value);if(!document.getElementById('exA').value||!document.getElementById('exB').value||!document.getElementById('exC').value)answer='هر سه مقدار را وارد کن.';else if(a===0)answer='ضریب x نباید صفر باشد.';else{answer='x = '+((cc-b)/a);steps=a+'x + '+b+' = '+cc+'؛ '+a+'x = '+(cc-b)+'؛ x = '+((cc-b)/a)}}
   out.hidden=false;out.textContent=steps?'جواب: '+answer+'\nمراحل حل: '+steps:answer;if(steps)record(title,steps,answer);
  };
  page.querySelectorAll('input').forEach(input=>input.addEventListener('keydown',event=>{
   if(event.key==='Enter'){event.preventDefault();page.querySelector('#extraRun').click();}
  }));
 }
 window.openExtra = openExtra;
 function record(tool,detail,result){history.unshift({tool,detail,result,time:new Date().toLocaleString('fa-IR')});history=history.slice(0,50);try{localStorage.setItem(KEY,JSON.stringify(history))}catch(e){}}
 function togglePanel(id,renderer){const box=document.getElementById(id);if(!box)return;if(!box.hidden){box.hidden=true;return}renderer()}
 function renderHistory(){let box=document.getElementById('historyPanel');box.hidden=false;box.className='feature-panel';box.innerHTML='<h3>تاریخچه محاسبات</h3><div class="feature-row"><button type="button" id="clearHistory">پاک کردن تاریخچه</button></div><ul class="history-list">'+(history.length?history.map(x=>'<li class="history-item"><strong>'+escapeHtml(x.tool)+'</strong><div>'+escapeHtml(x.detail)+'</div><div>نتیجه: '+escapeHtml(x.result)+'</div><small>'+escapeHtml(x.time)+'</small></li>').join(''):'<li>هنوز محاسبه‌ای در تاریخچه ثبت نشده است.</li>')+'</ul>';box.querySelector('#clearHistory').onclick=()=>{history=[];localStorage.removeItem(KEY);renderHistory()}}
 function renderPrefs(){let box=document.getElementById('prefsPanel');box.hidden=false;box.className='feature-panel';box.innerHTML='<h3>تنظیمات ظاهری</h3><label><input id="prefDark" type="checkbox" style="display:inline;width:auto" '+(prefs.dark?'checked':'')+'> حالت تیره</label><label><input id="prefCompact" type="checkbox" style="display:inline;width:auto" '+(prefs.compact?'checked':'')+'> نمایش فشرده‌تر</label><label><input id="prefLarge" type="checkbox" style="display:inline;width:auto" '+(prefs.large?'checked':'')+'> نوشته‌های بزرگ‌تر</label>';[['prefDark','dark'],['prefCompact','compact'],['prefLarge','large']].forEach(pair=>box.querySelector('#'+pair[0]).addEventListener('change',e=>{prefs[pair[1]]=e.target.checked;savePrefs()}))}
 function escapeHtml(s){return String(s==null?'':s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
 // توضیح کارت‌ها و ابزارها فقط با کلیک باز می‌شود.
 document.querySelectorAll('.tool-card .tool-description').forEach(el=>{let d=document.createElement('details');d.className='reveal-help';d.addEventListener('click',e=>e.stopPropagation());d.addEventListener('toggle',e=>e.stopPropagation());let s=document.createElement('summary');s.textContent='چطور کار می‌کند؟';s.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();d.open=!d.open;});let content=document.createElement('div');content.className='help-content';content.textContent=el.textContent.trim();d.append(s,content);el.replaceWith(d)});
 document.querySelectorAll('main > section.page:not(#home) > p:not(.calculator-help)').forEach(p=>{let text=p.textContent.trim();if(!text)return;let d=document.createElement('details');d.className='reveal-help';let s=document.createElement('summary');s.textContent='این ابزار چگونه کار می‌کند؟';let content=document.createElement('div');content.className='help-content';content.textContent=text;d.append(s,content);p.replaceWith(d)});
 // تاریخچهٔ محاسبات موجود را از تغییر نتایج ذخیره کن.
 const resultIds=['calculatorResult','fraction-result','sieveResult','gcdResult','primeResult','factorResult'];
 resultIds.forEach(id=>{let el=document.getElementById(id);if(!el)return;let previous='';new MutationObserver(()=>{let text=el.innerText||el.textContent||'';if(text.trim()&&text!==previous&&!el.classList.contains('error')){previous=text;record(id.replace(/Result|result/gi,''),text,'ثبت شد');}}).observe(el,{subtree:true,childList:true,characterData:true})});
})();
