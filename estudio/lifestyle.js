(function(){
'use strict';

// El progreso académico se almacena por separado y no se modifica.
const KEY='nico-hub-lifestyle-v1';
const AREA_KEY='nico-hub-last-area';
const allowedAreas=['estudio','gimnasio','alimentacion'];
const blank=()=>({gymDays:{},foodDays:{},workouts:[],meals:[],water:{}});
let state=blank();
let selectedGymDate='';
let gymMonthCursor=null;
let selectedFoodDate='';
let foodMonthCursor=null;

function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||'null');
    if(saved&&typeof saved==='object'){
      state={
        gymDays:saved.gymDays&&typeof saved.gymDays==='object'&&!Array.isArray(saved.gymDays)?saved.gymDays:{},
        foodDays:saved.foodDays&&typeof saved.foodDays==='object'&&!Array.isArray(saved.foodDays)?saved.foodDays:{},
        // Se conservan los datos de ejercicios anteriores, aunque la interfaz ya no los muestra.
        workouts:Array.isArray(saved.workouts)?saved.workouts:[],
        meals:Array.isArray(saved.meals)?saved.meals:[],
        water:saved.water&&typeof saved.water==='object'?saved.water:{}
      };
    }
  }catch(e){state=blank();}
}
function save(){
  try{
    localStorage.setItem(KEY,JSON.stringify(state));
    return true;
  }catch(e){
    const message=el('hub-storage-note')||el('gym-save-message');
    if(message)message.textContent='No se pudo guardar este registro en el navegador.';
    return false;
  }
}
function today(){
  const d=new Date(),p=n=>String(n).padStart(2,'0');
  return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());
}
function iso(y,m,d){
  const p=n=>String(n).padStart(2,'0');
  return y+'-'+p(m+1)+'-'+p(d);
}
function el(id){return document.getElementById(id);}
function esc(value){
  return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}
function fmt(date){
  if(!/^\d{4}-\d\d-\d\d$/.test(date))return date;
  const a=date.split('-');
  return a[2]+'/'+a[1]+'/'+a[0];
}
function newId(){return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);}
function activeStudyTitle(){
  const btn=document.querySelector('.study-nav .nav-btn.active');
  return btn?(btn.textContent||'Hoy').trim():'Hoy';
}
function selectArea(area,scroll){
  if(!allowedAreas.includes(area))area='estudio';
  el('study-workspace').hidden=area!=='estudio';
  el('study-tools').hidden=area!=='estudio';
  el('area-gimnasio').hidden=area!=='gimnasio';
  el('area-alimentacion').hidden=area!=='alimentacion';
  document.querySelectorAll('.main-tab').forEach(btn=>{
    const selected=btn.dataset.area===area;
    btn.classList.toggle('active',selected);
    btn.setAttribute('aria-selected',selected?'true':'false');
  });
  el('view-title').textContent=area==='estudio'?activeStudyTitle():area==='gimnasio'?'Gimnasio':'Alimentación';
  document.body.dataset.activeArea=area;
  try{localStorage.setItem(AREA_KEY,area);}catch(e){}
  if(scroll)window.scrollTo({top:0,behavior:'smooth'});
}

// Asistencia al gimnasio: los días no cargados son neutros, nunca faltas automáticas.
function gymDay(date){
  const rec=state.gymDays[date];
  if(!rec||typeof rec!=='object')return null;
  if(rec.status!=='fui'&&rec.status!=='no-fui')return null;
  return rec;
}
function setGymDate(date){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>today())return;
  selectedGymDate=date;
  const [y,m]=date.split('-').map(Number);
  gymMonthCursor=new Date(y,m-1,1);
  renderGym();
}
function renderGym(){
  const year=gymMonthCursor.getFullYear(),month=gymMonthCursor.getMonth();
  const monthName=new Intl.DateTimeFormat('es-AR',{month:'long',year:'numeric'}).format(gymMonthCursor);
  el('gym-month-title').textContent=monthName[0].toUpperCase()+monthName.slice(1);
  const now=new Date();
  el('gym-month-next').disabled=year===now.getFullYear()&&month===now.getMonth();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const firstDay=(new Date(year,month,1).getDay()+6)%7;
  const cells=[];
  for(let i=0;i<firstDay;i++)cells.push('<span class="gym-calendar-spacer" aria-hidden="true"></span>');
  let countWent=0,countMissed=0,ratings=[];
  for(let d=1;d<=daysInMonth;d++){
    const date=iso(year,month,d),rec=gymDay(date);
    const status=rec?rec.status:'';
    if(status==='fui'){countWent++;if(Number.isInteger(Number(rec.rating))&&Number(rec.rating)>=1&&Number(rec.rating)<=10)ratings.push(Number(rec.rating));}
    if(status==='no-fui')countMissed++;
    const selected=date===selectedGymDate,isToday=date===today(),future=date>today();
    const css='gym-calendar-day'+(status==='fui'?' is-attended':status==='no-fui'?' is-missed':'')+(selected?' selected':'')+(isToday?' is-today':'')+(future?' is-future':'');
    const label=status==='fui'?'Fui':status==='no-fui'?'No fui':'';
    const accessible=fmt(date)+': '+(label||'sin registrar')+(selected?' (seleccionado)':'');
    cells.push('<button type="button" class="'+css+'" data-gym-date="'+date+'" aria-label="'+accessible+'" aria-pressed="'+selected+'"'+(future?' disabled':'')+'><strong>'+d+'</strong><span>'+label+'</span></button>');
  }
  el('gym-calendar-grid').innerHTML=cells.join('');
  el('gym-month-attended').textContent=String(countWent);
  el('gym-month-missed').textContent=String(countMissed);
  el('gym-month-rating').textContent=ratings.length?(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1).replace('.',','):'—';
  const totalWent=Object.keys(state.gymDays).filter(d=>gymDay(d)?.status==='fui').length;
  el('gym-total-sessions').textContent=totalWent===1?'1 día asistido':totalWent+' días asistidos';
  renderSelectedGymDay();
}
function renderSelectedGymDay(){
  const rec=gymDay(selectedGymDate);
  el('gym-day-label').textContent=selectedGymDate===today()?'Hoy · '+fmt(selectedGymDate):fmt(selectedGymDate);
  const chosen=rec?rec.status:'';
  const radio=document.querySelector('input[name="gym-attendance"][value="'+chosen+'"]');
  if(radio)radio.checked=true;
  el('gym-rating').value=rec&&rec.status==='fui'&&rec.rating?String(rec.rating):'';
  el('gym-comment').value=rec?.comment||'';
  updateGymRatingVisibility();
  el('gym-save-message').textContent='';
}
function updateGymRatingVisibility(){
  const status=document.querySelector('input[name="gym-attendance"]:checked')?.value||'';
  el('gym-rating-wrap').hidden=status!=='fui';
  el('gym-rating').disabled=status!=='fui';
}
function shiftGymMonth(delta){
  const proposed=new Date(gymMonthCursor.getFullYear(),gymMonthCursor.getMonth()+delta,1);
  const now=new Date(),currentMonth=new Date(now.getFullYear(),now.getMonth(),1);
  if(proposed>currentMonth)return;
  gymMonthCursor=proposed;
  const selected=iso(proposed.getFullYear(),proposed.getMonth(),1);
  selectedGymDate=proposed.getTime()===currentMonth.getTime()?today():selected;
  renderGym();
}
function saveGymDay(event){
  event.preventDefault();
  if(selectedGymDate>today())return;
  const status=document.querySelector('input[name="gym-attendance"]:checked')?.value||'';
  if(status!=='fui'&&status!=='no-fui'){
    delete state.gymDays[selectedGymDate];
  }else{
    let rating=null;
    if(status==='fui'&&el('gym-rating').value){
      rating=Number(el('gym-rating').value);
      if(!Number.isInteger(rating)||rating<1||rating>10)return;
    }
    state.gymDays[selectedGymDate]={
      status,
      rating,
      comment:el('gym-comment').value.trim(),
      updated:new Date().toISOString()
    };
  }
  const saved=save();
  renderGym();
  el('gym-save-message').textContent=saved?(status?'Día guardado ✓':'Registro eliminado ✓'):'No se pudo guardar.';
}

// Registro de cuatro comidas y suplementos. Sin datos completos: día neutro.
const MEAL_KEYS=['breakfast','lunch','snack','dinner'];
const SUPP_KEYS=['creatine','protein'];
const FOOD_ALL=[...MEAL_KEYS,...SUPP_KEYS];
function validFoodValue(value){
  return value==='si'||value==='no'?value:'';
}
function foodDay(date){
  const rec=state.foodDays[date];
  return rec&&typeof rec==='object'&&!Array.isArray(rec)?rec:null;
}
function mealValues(rec){
  return MEAL_KEYS.map(key=>validFoodValue(rec?.meals?.[key]));
}
function foodLevel(rec){
  if(!rec)return null;
  const values=mealValues(rec);
  if(!values.every(x=>x==='si'||x==='no'))return null;
  const count=values.filter(x=>x==='si').length;
  return {count,key:count<=1?'red':count===2?'orange':count===3?'yellow':'green'};
}
function foodInput(name){
  return document.querySelector('input[name="food-'+name+'"]:checked')?.value||'';
}
function foodDraft(){
  const meals={},supplements={};
  for(const key of MEAL_KEYS)meals[key]=foodInput(key);
  for(const key of SUPP_KEYS)supplements[key]=foodInput(key);
  return {meals,supplements};
}
function foodStatusText(level,partial){
  if(!level)return partial?'Registro parcial: completá las cuatro comidas para colorear el día.':'Sin registro de comidas todavía.';
  return level.count+' de 4 comidas registradas: '+(level.key==='red'?'rojo':level.key==='orange'?'naranja':level.key==='yellow'?'amarillo':'verde')+'.';
}
function previewFood(){
  const draft=foodDraft(),level=foodLevel(draft);
  const hasAny=FOOD_ALL.some(k=>validFoodValue(draft.meals[k]??draft.supplements[k]));
  const status=el('food-day-status');
  status.className='food-day-status'+(level?' level-'+level.key:'');
  status.textContent=foodStatusText(level,hasAny);
}
function renderSelectedFoodDay(){
  const rec=foodDay(selectedFoodDate);
  el('food-day-label').textContent=selectedFoodDate===today()?'Hoy · '+fmt(selectedFoodDate):fmt(selectedFoodDate);
  for(const key of FOOD_ALL){
    const value=validFoodValue(MEAL_KEYS.includes(key)?rec?.meals?.[key]:rec?.supplements?.[key]);
    const selector='input[name="food-'+key+'"]';
    document.querySelectorAll(selector).forEach(r=>{r.checked=r.value===value;});
  }
  previewFood();
  el('food-save-message').textContent='';
}
function renderFood(){
  const y=foodMonthCursor.getFullYear(),m=foodMonthCursor.getMonth();
  const title=new Intl.DateTimeFormat('es-AR',{month:'long',year:'numeric'}).format(foodMonthCursor);
  el('food-month-title').textContent=title[0].toUpperCase()+title.slice(1);
  const now=new Date();
  el('food-month-next').disabled=y===now.getFullYear()&&m===now.getMonth();
  const firstDay=(new Date(y,m,1).getDay()+6)%7;
  const countDays=new Date(y,m+1,0).getDate();
  const cells=[];
  const buckets={red:0,orange:0,yellow:0,green:0};
  let creatineCount=0,proteinCount=0;
  for(let n=0;n<firstDay;n++)cells.push('<span class="gym-calendar-spacer" aria-hidden="true"></span>');
  for(let d=1;d<=countDays;d++){
    const date=iso(y,m,d),rec=foodDay(date),level=foodLevel(rec);
    if(level)buckets[level.key]++;
    const creatine=rec?.supplements?.creatine==='si';
    const protein=rec?.supplements?.protein==='si';
    if(creatine)creatineCount++;
    if(protein)proteinCount++;
    const selected=date===selectedFoodDate,future=date>today(),isToday=date===today();
    const css='gym-calendar-day food-calendar-day'+(level?' level-'+level.key:'')+(selected?' selected':'')+(isToday?' is-today':'')+(future?' is-future':'');
    const badge=level?(level.count+'/4'):'';
    const marks=(creatine?'<em>C</em>':'')+(protein?'<em>P</em>':'');
    const spoken=level?(level.count+' de 4 comidas'):'sin registro completo de comidas';
    cells.push('<button class="'+css+'" type="button" data-food-date="'+date+'" aria-label="'+fmt(date)+': '+spoken+(creatine?', creatina sí':'')+(protein?', proteína sí':'')+'" aria-pressed="'+selected+'"'+(future?' disabled':'')+'><strong>'+d+'</strong><span>'+badge+'</span><span class="food-supp-markers">'+marks+'</span></button>');
  }
  el('food-calendar-grid').innerHTML=cells.join('');
  for(const key of Object.keys(buckets))el('food-month-'+key).textContent=String(buckets[key]);
  el('food-month-creatine').textContent=String(creatineCount);
  el('food-month-protein').textContent=String(proteinCount);
  const fullyDone=Object.values(state.foodDays).filter(rec=>foodLevel(rec)?.count===4).length;
  el('food-total-days').textContent=fullyDone===1?'1 día con 4 comidas':fullyDone+' días con 4 comidas';
  renderSelectedFoodDay();
}
function setFoodDate(date){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>today())return;
  selectedFoodDate=date;
  const [y,m]=date.split('-').map(Number);
  foodMonthCursor=new Date(y,m-1,1);
  renderFood();
}
function shiftFoodMonth(delta){
  const proposed=new Date(foodMonthCursor.getFullYear(),foodMonthCursor.getMonth()+delta,1);
  const now=new Date(),current=new Date(now.getFullYear(),now.getMonth(),1);
  if(proposed>current)return;
  foodMonthCursor=proposed;
  selectedFoodDate=proposed.getTime()===current.getTime()?today():iso(proposed.getFullYear(),proposed.getMonth(),1);
  renderFood();
}
function saveFoodDay(event){
  event.preventDefault();
  if(selectedFoodDate>today())return;
  const draft=foodDraft();
  // Guardar el suplemento aun cuando las comidas todavía no se completaron.
  const any=FOOD_ALL.some(key=>validFoodValue(draft.meals[key]??draft.supplements[key]));
  if(any)state.foodDays[selectedFoodDate]={...draft,updated:new Date().toISOString()};
  else delete state.foodDays[selectedFoodDate];
  const saved=save();
  renderFood();
  el('food-save-message').textContent=saved?'Día guardado ✓':'No se pudo guardar el día.';
}
function clearFoodDay(){
  if(!foodDay(selectedFoodDate))return;
  if(!confirm('¿Borrar el registro del '+fmt(selectedFoodDate)+'?'))return;
  delete state.foodDays[selectedFoodDate];
  const saved=save();
  renderFood();
  el('food-save-message').textContent=saved?'Registro eliminado ✓':'No se pudo guardar el cambio.';
}

load();
selectedGymDate=today();
{
  const [y,m]=selectedGymDate.split('-').map(Number);
  gymMonthCursor=new Date(y,m-1,1);
}
selectedFoodDate=today();
{
  const [y,m]=selectedFoodDate.split('-').map(Number);
  foodMonthCursor=new Date(y,m-1,1);
}
document.querySelectorAll('.main-tab').forEach(btn=>btn.addEventListener('click',()=>selectArea(btn.dataset.area,true)));
document.querySelectorAll('.study-nav .nav-btn').forEach(btn=>btn.addEventListener('click',()=>{
  if(document.body.dataset.activeArea!=='estudio')selectArea('estudio',false);
}));
el('gym-month-prev').addEventListener('click',()=>shiftGymMonth(-1));
el('gym-month-next').addEventListener('click',()=>shiftGymMonth(1));
el('gym-month-today').addEventListener('click',()=>setGymDate(today()));
el('gym-calendar-grid').addEventListener('click',event=>{
  const day=event.target.closest('[data-gym-date]');
  if(day)setGymDate(day.dataset.gymDate);
});
document.querySelectorAll('input[name="gym-attendance"]').forEach(x=>x.addEventListener('change',updateGymRatingVisibility));
el('gym-attendance-form').addEventListener('submit',saveGymDay);
el('food-month-prev').addEventListener('click',()=>shiftFoodMonth(-1));
el('food-month-next').addEventListener('click',()=>shiftFoodMonth(1));
el('food-month-today').addEventListener('click',()=>setFoodDate(today()));
el('food-calendar-grid').addEventListener('click',event=>{
  const button=event.target.closest('[data-food-date]');
  if(button)setFoodDate(button.dataset.foodDate);
});
document.querySelectorAll('input[name^="food-"]').forEach(input=>input.addEventListener('change',previewFood));
el('food-tracker-form').addEventListener('submit',saveFoodDay);
el('food-clear-day').addEventListener('click',clearFoodDay);
renderGym();
renderFood();
let last='estudio';
try{last=localStorage.getItem(AREA_KEY)||'estudio';}catch(e){}
selectArea(last,false);
})();