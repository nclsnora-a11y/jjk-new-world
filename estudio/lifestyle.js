(function(){
'use strict';

// El progreso académico se almacena por separado y no se modifica.
const KEY='nico-hub-lifestyle-v1';
const AREA_KEY='nico-hub-last-area';
const allowedAreas=['estudio','gimnasio','alimentacion'];
const blank=()=>({gymDays:{},workouts:[],meals:[],water:{}});
let state=blank();
let selectedGymDate='';
let gymMonthCursor=null;

function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||'null');
    if(saved&&typeof saved==='object'){
      state={
        gymDays:saved.gymDays&&typeof saved.gymDays==='object'&&!Array.isArray(saved.gymDays)?saved.gymDays:{},
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
  gymMonthCursor=new Date(gymMonthCursor.getFullYear(),gymMonthCursor.getMonth()+delta,1);
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

// Alimentación conserva su funcionamiento original.
function renderFood(){
  const date=el('food-date').value||today();
  const items=state.meals.filter(x=>x.date===date).sort((a,b)=>a.created-b.created);
  el('food-day-label').textContent='Comidas del '+fmt(date);
  el('food-day-count').textContent=items.length===1?'1 registro':items.length+' registros';
  el('meal-list').innerHTML=items.length?items.map(x=>
    '<div class="hub-record"><div class="record-main"><strong>'+esc(x.type)+'</strong><span>'+esc(x.detail)+'</span></div><button type="button" class="record-delete" data-delete-meal="'+esc(x.id)+'" aria-label="Eliminar '+esc(x.type)+'">Eliminar</button></div>'
  ).join(''):'<div class="hub-empty">Todavía no registraste comidas para esta fecha.</div>';
  const n=Math.max(0,Number(state.water[date])||0);
  el('water-count').textContent=String(n);
  el('water-less').disabled=n===0;
  el('food-total-days').textContent=new Set(state.meals.map(x=>x.date)).size+' días con comidas registradas';
}
load();
selectedGymDate=today();
{
  const [y,m]=selectedGymDate.split('-').map(Number);
  gymMonthCursor=new Date(y,m-1,1);
}
el('food-date').value=today();
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
el('food-date').addEventListener('change',renderFood);
el('food-form').addEventListener('submit',event=>{
  event.preventDefault();
  const date=el('food-date').value,detail=el('meal-detail').value.trim();
  if(!date||!detail)return;
  state.meals.push({id:newId(),date,type:el('meal-type').value,detail,created:Date.now()});
  save();
  el('meal-detail').value='';
  el('meal-detail').focus();
  renderFood();
});
document.addEventListener('click',event=>{
  const m=event.target.closest('[data-delete-meal]');
  if(m){state.meals=state.meals.filter(x=>x.id!==m.dataset.deleteMeal);save();renderFood();}
});
el('water-more').addEventListener('click',()=>{
  const date=el('food-date').value;
  state.water[date]=Math.min(40,(Number(state.water[date])||0)+1);
  save();renderFood();
});
el('water-less').addEventListener('click',()=>{
  const date=el('food-date').value;
  state.water[date]=Math.max(0,(Number(state.water[date])||0)-1);
  save();renderFood();
});
renderGym();
renderFood();
let last='estudio';
try{last=localStorage.getItem(AREA_KEY)||'estudio';}catch(e){}
selectArea(last,false);
})();