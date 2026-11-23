(function(){
'use strict';

// Datos independientes: nunca altera el progreso de estudio existente.
const KEY='nico-hub-lifestyle-v1';
const AREA_KEY='nico-hub-last-area';
const allowedAreas=['estudio','gimnasio','alimentacion'];
const blank=()=>({workouts:[],meals:[],water:{}});
let state=blank();

function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||'null');
    if(saved&&typeof saved==='object'){
      state={
        workouts:Array.isArray(saved.workouts)?saved.workouts:[],
        meals:Array.isArray(saved.meals)?saved.meals:[],
        water:saved.water&&typeof saved.water==='object'?saved.water:{}
      };
    }
  }catch(e){state=blank();}
}
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){
    const msg=document.getElementById('hub-storage-note');
    if(msg)msg.textContent='No se pudo guardar el registro en este navegador.';
  }
}
function today(){
  const d=new Date(),p=n=>String(n).padStart(2,'0');
  return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());
}
function el(id){return document.getElementById(id);}
function esc(value){
  return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
function workoutsOn(date){
  return state.workouts.filter(x=>x.date===date).sort((a,b)=>a.created-b.created);
}
function renderGym(){
  const date=el('workout-date').value||today();
  const items=workoutsOn(date);
  el('gym-day-label').textContent='Ejercicios del '+fmt(date);
  el('gym-day-count').textContent=items.length===1?'1 ejercicio':items.length+' ejercicios';
  el('gym-session-list').innerHTML=items.length?items.map(x=>
    '<div class="hub-record"><div class="record-main"><strong>'+esc(x.name)+'</strong><span>'+esc(x.group)+' · '+esc(x.sets)+' series · '+esc(x.reps)+' reps'+(x.weight!==''?' · '+esc(x.weight)+' kg':'')+'</span></div><button type="button" class="record-delete" data-delete-workout="'+esc(x.id)+'" aria-label="Eliminar '+esc(x.name)+'">Eliminar</button></div>'
  ).join(''):'<div class="hub-empty">Todavía no registraste ejercicios para esta fecha.</div>';
  const uniqueDays=new Set(state.workouts.map(x=>x.date)).size;
  el('gym-total-sessions').textContent=uniqueDays===1?'1 día registrado':uniqueDays+' días registrados';
  el('gym-history').innerHTML=state.workouts.length?state.workouts.slice().sort((a,b)=>b.date.localeCompare(a.date)||b.created-a.created).slice(0,8).map(x=>
    '<div class="hub-history-item"><span>'+fmt(x.date)+'</span><strong>'+esc(x.name)+'</strong><small>'+esc(x.sets)+'×'+esc(x.reps)+(x.weight!==''?' · '+esc(x.weight)+' kg':'')+'</small></div>'
  ).join(''):'<p class="hub-muted">Tu historial aparecerá acá cuando agregues ejercicios.</p>';
}
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
function initDates(){
  el('workout-date').value=today();
  el('food-date').value=today();
}
function setDateMinMax(){/* Las fechas históricas y futuras están permitidas para planificar. */}
load();
initDates();
document.querySelectorAll('.main-tab').forEach(btn=>btn.addEventListener('click',()=>selectArea(btn.dataset.area,true)));
document.querySelectorAll('.study-nav .nav-btn').forEach(btn=>btn.addEventListener('click',()=>{
  // El controlador de estudio se encarga de cambiar la vista.
  if(document.body.dataset.activeArea!=='estudio')selectArea('estudio',false);
}));
el('workout-date').addEventListener('change',renderGym);
el('food-date').addEventListener('change',renderFood);
el('workout-form').addEventListener('submit',event=>{
  event.preventDefault();
  const name=el('workout-name').value.trim();
  const date=el('workout-date').value;
  const sets=Number(el('workout-sets').value);
  const reps=el('workout-reps').value.trim();
  const weightRaw=el('workout-weight').value.trim();
  if(!name||!date||!Number.isInteger(sets)||sets<1||sets>30||!reps)return;
  state.workouts.push({id:newId(),date,group:el('workout-group').value,name,sets,reps,weight:weightRaw,created:Date.now()});
  save();
  el('workout-name').value='';
  el('workout-reps').value='';
  el('workout-weight').value='';
  el('workout-name').focus();
  renderGym();
});
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
  const w=event.target.closest('[data-delete-workout]');
  if(w){
    state.workouts=state.workouts.filter(x=>x.id!==w.dataset.deleteWorkout);
    save();renderGym();return;
  }
  const m=event.target.closest('[data-delete-meal]');
  if(m){
    state.meals=state.meals.filter(x=>x.id!==m.dataset.deleteMeal);
    save();renderFood();
  }
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