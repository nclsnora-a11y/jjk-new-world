(function(){
'use strict';

const PRIVADO_EXAM='2026-11-17';
const PENAL_EXAM='2026-11-25';
const START_DATE='2026-10-02';
const STORE='nico-study-hub-v2';

const privado=[
 {n:1,title:'Estructura de las obligaciones · Nociones básicas',difficulty:'Media',weight:1.75,rank:5},
 {n:2,title:'Estructura de la obligación · Elementos esenciales',difficulty:'Media/Alta',weight:2.25,rank:9},
 {n:3,title:'Efectos de las obligaciones',difficulty:'Media',weight:1.5,rank:4},
 {n:4,title:'Preferencias entre los acreedores',difficulty:'Media',weight:1.5,rank:3},
 {n:5,title:'Clasificación de las obligaciones · Objeto',difficulty:'Muy alta',weight:3.5,rank:13},
 {n:6,title:'Clasificación de las obligaciones · Continuación',difficulty:'Alta',weight:3,rank:12},
 {n:7,title:'Modos de extinción · El pago',difficulty:'Alta',weight:2.5,rank:10},
 {n:8,title:'Extinción de las obligaciones · Continuación',difficulty:'Media/Alta',weight:2,rank:7},
 {n:9,title:'Prescripción liberatoria',difficulty:'Media/Alta',weight:2,rank:8},
 {n:10,title:'Responsabilidad civil',difficulty:'Muy alta',weight:4,rank:14},
 {n:11,title:'Responsabilidad directa e indirecta',difficulty:'Baja',weight:1,rank:1},
 {n:12,title:'Responsabilidad por riesgo, colectiva y anónima',difficulty:'Baja/Media',weight:1.25,rank:2},
 {n:13,title:'Responsabilidades especiales',difficulty:'Alta',weight:2.5,rank:11},
 {n:14,title:'La acción indemnizatoria',difficulty:'Media',weight:1.75,rank:6}
];

const penal=[
 {n:1,title:'Introducción al Derecho Penal',difficulty:'Baja',weight:1.25,rank:3},
 {n:2,title:'Evolución histórica',difficulty:'Media',weight:1.75,rank:7},
 {n:3,title:'Fundamentos político-constitucionales',difficulty:'Baja/Media',weight:1.5,rank:4},
 {n:4,title:'Ley penal e interpretación',difficulty:'Media',weight:1.75,rank:8},
 {n:5,title:'Ley penal en el espacio y extradición',difficulty:'Baja/Media',weight:1.5,rank:5},
 {n:6,title:'Ley penal en el tiempo y respecto de las personas',difficulty:'Media',weight:1.5,rank:6},
 {n:7,title:'Teoría jurídica del delito',difficulty:'Muy alta',weight:2.75,rank:18},
 {n:8,title:'La acción',difficulty:'Alta',weight:2.5,rank:17},
 {n:9,title:'Teoría del tipo',difficulty:'Muy alta',weight:4,rank:22},
 {n:10,title:'Antijuridicidad',difficulty:'Alta',weight:2.5,rank:16},
 {n:11,title:'La justificación',difficulty:'Alta',weight:2.25,rank:14},
 {n:12,title:'Responsabilidad por el hecho y culpabilidad',difficulty:'Muy alta',weight:3.5,rank:21},
 {n:13,title:'Causas que excluyen la culpabilidad',difficulty:'Muy alta',weight:3,rank:20},
 {n:14,title:'Proceso ejecutivo del delito · Tentativa',difficulty:'Media/Alta',weight:2,rank:11},
 {n:15,title:'Autoría y participación',difficulty:'Alta',weight:2.5,rank:15},
 {n:16,title:'Concurso de delitos',difficulty:'Media/Alta',weight:2,rank:10},
 {n:17,title:'Punibilidad y acciones',difficulty:'Media/Alta',weight:2,rank:9},
 {n:18,title:'Teoría y ejecución de la pena',difficulty:'Muy alta',weight:3,rank:19},
 {n:19,title:'Penas, condena condicional y reincidencia',difficulty:'Alta',weight:2.25,rank:13},
 {n:20,title:'Medidas de seguridad y régimen juvenil',difficulty:'Media/Alta',weight:2,rank:12},
 {n:21,title:'Ciencia penitenciaria',difficulty:'Baja',weight:1,rank:1},
 {n:22,title:'Ética profesional',difficulty:'Baja',weight:1,rank:2}
];

function task(subject,title,scope,stop,finish){
  return {subject,title,scope,stop,finish:!!finish};
}
function day(date,label,tasks,note){return {date,label,tasks,note:note||''};}

const schedule=[
 day('2026-10-01','Preparación de la página',[],'Hoy no estudiás. El plan empieza mañana.'),
 day('2026-10-02','Inicio real',[
   task('privado','Privado U1 · Primera vuelta completa','Puntos 1 a 7: concepto, naturaleza, personales/reales, propter rem, evolución, consumo y metodología del CCyC.','Hoy SÍ cerrás la primera vuelta de U1. “Cerrar” significa poder contar el mapa de la unidad sin mirar; no significa memorizar cada detalle.',true),
   task('penal','Penal U1 · Primera vuelta completa','Concepto y ramas del Derecho Penal, dimensión objetiva/subjetiva, dogmática, política criminal, criminología y ciencias auxiliares.','Hoy SÍ intentás terminar U1 porque es una unidad liviana. Si al final no podés explicar el esquema general, queda amarilla y la retomamos en el repaso.',true)
 ],'Primer día: calibración. No agregues horas aunque sientas que podrías seguir.'),
 day('2026-10-05','Elementos esenciales I',[
   task('privado','Privado U2 · Parte 1','Elementos esenciales/accidentales, sujetos, objeto y vínculo jurídico.','Hoy NO terminás U2. Frená al finalizar vínculo jurídico, aunque te sobre entusiasmo.',false),
   task('penal','Penal U2 · Evolución histórica','Evolución, escuelas y antecedentes; aprender la secuencia corregida, no datos históricos dudosos del resumen.','Primera vuelta completa de U2; priorizá relaciones entre etapas antes que fechas aisladas.',true)
 ]),
 day('2026-10-06','Elementos esenciales II',[
   task('privado','Privado U2 · Parte 2','Causa fuente/fin/motivo, causalismo-anticausalismo-neocausalismo, plazo y reconocimiento.','Hoy SÍ cerrás U2 y al final tenés que poder diferenciar las tres acepciones de causa y explicar plazo/reconocimiento.',true),
   task('penal','Penal U3','Legalidad, reserva, lesividad, culpabilidad, non bis in idem, humanidad y demás principios constitucionales.','Terminá la primera vuelta y explicá cada principio con una frase propia.',true)
 ]),
 day('2026-10-07','Tutela del crédito',[
   task('privado','Privado U3','Efectos, buena fe, garantía común, acción directa, subrogatoria y astreintes.','Terminá U3. La prueba de salida es diferenciar acción directa de subrogatoria sin mirar.',true),
   task('penal','Penal U4','Fuentes, ley penal, interpretación, analogía y reserva legal.','Terminá la primera vuelta, separando claramente régimen argentino de material español del resumen.',true)
 ]),
 day('2026-10-08','Preferencias',[
   task('privado','Privado U4','Privilegios, especiales, retención y prioridad del primer embargante.','Terminá U4. Cerrá con un cuadro oral: privilegio / retención / embargo.',true),
   task('penal','Penal U5','Principios espacial, real/defensa, personalidad, universalidad y extradición.','Terminá U5. No memorices fórmulas de embajadas del resumen sin la corrección jurídica.',true)
 ]),
 day('2026-10-09','Objeto I',[
   task('privado','Privado U5 · Parte 1','Dar, cosa cierta, sistemas de transmisión, mejoras, frutos, riesgos y concurrencia de acreedores.','NO terminás U5. Frená antes de obligaciones de dinero.',false),
   task('penal','Penal U6','Ley penal en el tiempo, ley más benigna, ley intermedia, temporales e inmunidades.','Primera vuelta completa. La meta es dominar el art. 2 CP y sus problemas, no recitar.',true)
 ]),
 day('2026-10-12','Objeto II',[
   task('privado','Privado U5 · Parte 2','Obligaciones de dinero, deudas de valor, nominalismo/valorismo, intereses, anatocismo y moneda extranjera.','NO cerrás U5 todavía. Hoy sólo el núcleo monetario, con especial atención a la normativa vigente.',false),
   task('penal','Penal U7 · Parte 1','Positivismo, normativismo y finalismo: qué cambia en la estructura del delito.','NO terminás U7. Frená antes de funcionalismo.',false)
 ]),
 day('2026-10-13','Objeto III',[
   task('privado','Privado U5 · Parte 3','Hacer/no hacer, medios/resultado, alternativas y facultativas.','Hoy SÍ cerrás U5. La salida es explicar todas sus grandes clasificaciones sin mirar.',true),
   task('penal','Penal U7 · Parte 2','Funcionalismo y cuadro comparativo con causalismo/finalismo.','Hoy SÍ cerrás U7. Funcionalismo se completa con fuente segura antes de memorizar.',true)
 ]),
 day('2026-10-14','Sujetos I',[
   task('privado','Privado U6 · Parte 1','Divisibles, indivisibles y simplemente mancomunadas.','NO terminás U6. Frená antes de solidaridad.',false),
   task('penal','Penal U8','Acción causal/final/social, ausencia de acción y omisión.','Primera vuelta completa. Quedate con la estructura, no con cada discusión marginal.',true)
 ]),
 day('2026-10-15','Sujetos II',[
   task('privado','Privado U6 · Parte 2','Solidaridad: reglas comunes, pasiva y activa, efectos y relaciones internas.','NO terminás U6. Hoy la solidaridad sola merece dos pasadas.',false),
   task('penal','Penal U9 · Parte 1','Tipo y tipicidad, bien jurídico, clasificaciones y estructura del tipo.','NO terminás U9. Frená antes de causalidad/imputación objetiva.',false)
 ]),
 day('2026-10-16','Sujetos III',[
   task('privado','Privado U6 · Parte 3','Concurrentes, disyuntas, principales/accesorias, cláusula penal, recíprocas, conexos y rendición de cuentas.','Hoy SÍ cerrás U6 con cuadro comparativo: mancomunada / solidaria / concurrente.',true),
   task('penal','Penal U9 · Parte 2','Causalidad e imputación objetiva: riesgo permitido, principio de confianza, prohibición de regreso y víctima.','NO terminás U9. Hoy sólo tipo objetivo e imputación.',false)
 ]),
 day('2026-10-19','Pago I',[
   task('privado','Privado U7 · Parte 1','Pago: concepto, funciones, sujetos, objeto, identidad, integridad, lugar, tiempo y prueba.','NO terminás U7. Frená antes de imputación/consignación.',false),
   task('penal','Penal U9 · Parte 3','Tipo subjetivo, dolo, clases y errores relevantes.','Hoy SÍ cerrás U9. Al final conectá tipo objetivo + subjetivo en un caso.',true)
 ]),
 day('2026-10-20','Pago II',[
   task('privado','Privado U7 · Parte 2','Imputación y consignación judicial/extrajudicial.','NO terminás U7. Hoy cerrá consignación.',false),
   task('penal','Penal U10','Antijuridicidad, injusto, causas de justificación y discusiones doctrinarias.','Primera vuelta completa; ordená posiciones por autor.',true)
 ]),
 day('2026-10-21','Pago III',[
   task('privado','Privado U7 · Parte 3','Subrogación, pago a mejor fortuna, beneficio de competencia y mora de deudor/acreedor.','Hoy SÍ cerrás U7. La mora tiene que quedar explicable con ejemplos.',true),
   task('penal','Penal U11','Legítima defensa, defensa de terceros, cumplimiento de deber, obediencia y exceso.','Terminá U11, pero hacé al menos un caso práctico antes de marcarla verde.',true)
 ]),
 day('2026-10-22','Extinción',[
   task('privado','Privado U8','Compensación, confusión, novación, dación, renuncia/remisión, imposibilidad y transacción.','Primera vuelta completa. No busques memorizar artículos hoy; primero distinguí institutos.',true),
   task('penal','Penal U12 · Parte 1','Responsabilidad por el hecho y concepto/evolución de culpabilidad.','NO terminás U12. Frená antes de entrar a dolo/culpa según los modelos.',false)
 ]),
 day('2026-10-23','Prescripción I',[
   task('privado','Privado U9 · Parte 1','Concepto, curso, suspensión, interrupción y dispensa.','NO terminás U9. La salida es diferenciar suspensión de interrupción sin mirar.',false),
   task('penal','Penal U12 · Parte 2','Ubicación del dolo/culpa, imputabilidad y modelos causalista/finalista.','NO terminás U12. Construí un mapa comparativo.',false)
 ]),
 day('2026-10-26','Prescripción II',[
   task('privado','Privado U9 · Parte 2','Aspectos procesales, renuncia, modificación de plazos, plazos especiales y caducidad.','Hoy SÍ cerrás U9. Explicá prescripción vs caducidad como pregunta oral.',true),
   task('penal','Penal U12 · Parte 3','Cierre doctrinario y casos de culpabilidad.','Hoy SÍ cerrás U12; no la marques verde si todavía mezclás causalismo y finalismo.',true)
 ]),
 day('2026-10-27','Responsabilidad civil I',[
   task('privado','Privado U10 · Parte 1','Concepto, evolución, funciones, microsistemas y unificación contractual/extracontractual.','NO terminás U10. Hoy armá el mapa general y los cuatro presupuestos.',false),
   task('penal','Penal U13 · Parte 1','Inimputabilidad, capacidad de culpabilidad y bases de la teoría del error.','NO terminás U13.',false)
 ]),
 day('2026-10-28','Responsabilidad civil II',[
   task('privado','Privado U10 · Parte 2','Daño y antijuridicidad; requisitos, clases, justificación y consentimiento.','NO terminás U10. Cerrá sólo daño + antijuridicidad.',false),
   task('penal','Penal U13 · Parte 2','Error de tipo/prohibición, vencible/invencible, coacción y preterintención.','Hoy SÍ cerrás U13 con casos para no confundir errores.',true)
 ]),
 day('2026-10-29','Responsabilidad civil III',[
   task('privado','Privado U10 · Parte 3','Relación causal, teorías, consecuencias indemnizables y previsibilidad contractual.','NO terminás U10. Hoy causalidad sola.',false),
   task('penal','Penal U14','Iter criminis, tentativa, desistimiento, delito imposible y tentativa inidónea.','Terminá U14. Hacé ejemplos para cada frontera.',true)
 ]),
 day('2026-10-30','Responsabilidad civil IV',[
   task('privado','Privado U10 · Parte 4','Factores subjetivos/objetivos, atenuación y eximentes.','Hoy SÍ cerrás U10. Salida: resolver un caso usando daño → antijuridicidad → causalidad → factor.',true),
   task('penal','Penal U15','Autoría, coautoría, autoría mediata, participación, complicidad e instigación.','Terminá primera vuelta, corrigiendo la relación entre art. 45 e instigación.',true)
 ]),
 day('2026-11-02','Responsabilidad aplicada I',[
   task('privado','Privado U11','Directa, actos involuntarios, principal/dependiente, progenitores y encargados.','Terminá U11. Si U10 está sólida debería ser rápida.',true),
   task('penal','Penal U16','Concurso ideal, real, delito continuado, concurso aparente y unificación.','Terminá U16 con casos de identificación.',true)
 ]),
 day('2026-11-03','Responsabilidad aplicada II',[
   task('privado','Privado U12','Riesgo/vicio, actividades riesgosas, animales y responsabilidad colectiva/anónima.','Terminá U12. Repetí esquema: supuesto → responsable → factor → eximente.',true),
   task('penal','Penal U17','Acciones, extinción, prescripción, probation, indulto y acción civil.','Terminá primera vuelta; artículos clave quedan para el repaso.',true)
 ]),
 day('2026-11-04','Especiales I',[
   task('privado','Privado U13 · Parte 1','Educativos, profesionales, hoteles, personas jurídicas y accidentes de tránsito.','NO terminás U13. Frená después de tránsito.',false),
   task('penal','Penal U18 · Parte 1','Teorías de la pena, especies y marco general.','NO terminás U18.',false)
 ]),
 day('2026-11-05','Especiales II',[
   task('privado','Privado U13 · Parte 2','Intimidad/calumnias, Estado, consumo y ambiente.','Hoy SÍ cerrás U13. Separá CCyC de microsistemas especiales.',true),
   task('penal','Penal U18 · Parte 2','Ejecución, libertad condicional, libertad asistida y régimen vigente.','Hoy SÍ cerrás U18 con normativa actualizada; no memorices números viejos del resumen.',true)
 ]),
 day('2026-11-06','Cerrar primera vuelta de Privado',[
   task('privado','Privado U14','Legitimación activa/pasiva, daños y relación entre acción civil y penal.','Terminá U14. Con esto queda cerrada la primera vuelta completa de Privado.',true),
   task('penal','Penal U19','Penas accesorias, individualización, condena condicional, reincidencia y extinción.','Terminá U19 usando el régimen vigente de reincidencia.',true)
 ]),
 day('2026-11-09','Segunda vuelta I',[
   task('repaso','Privado U1–U3','Recuperación oral sin mirar + 10 preguntas cortas.','No releas todo. Sólo corregí lo que no pudiste explicar.',true),
   task('penal','Penal U20','Medidas de seguridad y régimen penal juvenil vigente.','Terminá U20 distinguiendo régimen anterior y Ley 27.801.',true)
 ]),
 day('2026-11-10','Segunda vuelta II',[
   task('repaso','Privado U4–U6','Repaso acumulativo; prioridad U5 y U6.','Hacé cuadros de clasificaciones y respondé oralmente.',true),
   task('penal','Penal U21','Ciencia penitenciaria y leyes de ejecución.','Terminá U21.',true)
 ]),
 day('2026-11-11','Segunda vuelta III',[
   task('repaso','Privado U7–U9','Pago, mora, otros modos de extinción y prescripción.','Recuperación primero; artículos después.',true),
   task('penal','Penal U22','Ética profesional; Couture, Kelsen y Ossorio.','Terminá U22 con el Decálogo correcto.',true)
 ]),
 day('2026-11-12','Segunda vuelta IV',[
   task('repaso','Privado U10','Simulación oral completa + caso de responsabilidad civil.','U10 debe poder explicarse de punta a punta sin guía.',true),
   task('repaso','Penal U1–U6','Primera recuperación acumulativa de bases.','Usá preguntas, no relectura pasiva.',true)
 ]),
 day('2026-11-13','Cerrar segunda vuelta',[
   task('repaso','Privado U11–U14','Responsabilidades aplicadas + acción indemnizatoria.','Dejá sólo rojos concretos para el lunes.',true),
   task('repaso','Penal U7–U13','Núcleo teoría del delito.','Explicá la secuencia acción → tipicidad → antijuridicidad → culpabilidad.',true)
 ]),
 day('2026-11-16','Pre examen Privado',[
   task('repaso','Privado · Bolillero completo','Dos bolillas al azar + preguntas abiertas del programa.','Nada de contenido nuevo. Corregí sólo huecos puntuales.',true),
   task('repaso','Privado · Segunda simulación','Otra combinación de dos bolillas, cronometrada.','Terminá temprano y descansá.',true)
 ]),
 day('2026-11-17','EXAMEN PRIVADO II',[
   task('privado','Final oral de Privado II','Repaso muy breve de disparadores y estructura de respuesta.','No estudies intensamente ese día.',true)
 ]),
 day('2026-11-18','Penal intensivo I',[
   task('repaso','Penal U14–U18','Tentativa, participación, concurso, punibilidad y pena.','Segunda vuelta activa, no relectura.',true),
   task('repaso','Penal · 3 casos','Resolver tres casos cortos con estructura de teoría del delito.','Corregí sólo al final.',true)
 ]),
 day('2026-11-19','Penal intensivo II',[
   task('repaso','Penal U7–U9','Teoría del delito, acción y tipo en profundidad.','Explicación oral completa y un caso.',true),
   task('repaso','Penal · Oral','Exponer la estructura del delito sin mirar.','Meta: fluidez, no perfección textual.',true)
 ]),
 day('2026-11-20','Penal intensivo III',[
   task('repaso','Penal U10–U13','Antijuridicidad, justificación y culpabilidad.','Trabajar diferencias finas con casos.',true),
   task('repaso','Penal · Casos','Legítima defensa, error e inimputabilidad.','Corregir errores de encuadre.',true)
 ]),
 day('2026-11-23','Cierre de programa Penal',[
   task('repaso','Penal U14–U22','Segunda vuelta rápida + artículos clave.','No te detengas en lo verde; concentrá tiempo en amarillo/rojo.',true),
   task('repaso','Penal · Puntos rojos','Reincidencia, juvenil, ejecución y cualquier hueco detectado.','Sólo huecos concretos.',true)
 ]),
 day('2026-11-24','Pre examen Penal',[
   task('repaso','Penal · Bolillero completo','Dos bolillas + preguntas abiertas del programa.','Nada nuevo.',true),
   task('repaso','Penal · Último ajuste','Recuperación breve de rojos.','Terminá temprano y descansá.',true)
 ]),
 day('2026-11-25','EXAMEN PENAL',[
   task('penal','Final oral de Penal I','Repaso mínimo de disparadores y estructura de respuesta.','No incorporar contenido nuevo.',true)
 ])
];

let state=loadState();
let currentSubject='privado';
let currentSort='programa';
let calendarCursor=new Date(2026,9,1);
let selectedDate=null;
let practiceMode='questions';
let practiceFilter='today';
let currentPracticeItem=null;
let practiceRevealed=false;
let practiceCount=0;

function defaultState(){return {units:{privado:{},penal:{}},tasks:{},reviews:[],rolloverAssignments:{}};}
function loadState(){
  try{
    const raw=localStorage.getItem(STORE)||localStorage.getItem('nico-study-hub-v1');
    return raw?Object.assign(defaultState(),JSON.parse(raw)):defaultState();
  }catch(e){return defaultState();}
}
function save(){localStorage.setItem(STORE,JSON.stringify(state));refreshProgress();}

function localISO(date){
  const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');
  return y+'-'+m+'-'+d;
}
function parseISO(s){const p=s.split('-').map(Number);return new Date(p[0],p[1]-1,p[2]);}
function addDays(s,n){const x=parseISO(s);x.setDate(x.getDate()+n);return localISO(x);}
function daysUntil(s){const a=new Date();a.setHours(0,0,0,0);const b=parseISO(s);return Math.max(0,Math.ceil((b-a)/86400000));}
function prettyDate(s,short){
  return parseISO(s).toLocaleDateString('es-AR',short?{weekday:'short',day:'2-digit',month:'short'}:{weekday:'long',day:'numeric',month:'long'});
}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
function labelSubject(s){return s==='privado'?'Privado':s==='penal'?'Penal':'Repaso';}
function taskId(date,index){return date+'-'+index;}
function getDay(date){return schedule.find(d=>d.date===date)||null;}
function isExamDay(d){return !!d && /^EXAMEN/i.test(d.label||'');}
function studyPlanDays(){return schedule.filter(d=>d.tasks&&d.tasks.length&&!isExamDay(d));}
function isStudySlotDate(date){return studyPlanDays().some(d=>d.date===date);}
function planDayCompleted(d){
  if(!d||!d.tasks||!d.tasks.length)return false;
  return d.tasks.every((t,i)=>!!state.tasks[taskId(d.date,i)]);
}
function ensureTodayAssignment(){
  const today=localISO(new Date());
  const fixed=getDay(today);
  if(isExamDay(fixed))return fixed;
  if(!isStudySlotDate(today))return null;
  state.rolloverAssignments=state.rolloverAssignments||{};
  const existing=state.rolloverAssignments[today];
  if(existing){
    const assigned=getDay(existing);
    if(assigned)return assigned;
  }
  const pending=studyPlanDays().filter(d=>d.date<=today&&!planDayCompleted(d));
  const chosen=pending.length?pending[0]:fixed;
  if(chosen){
    state.rolloverAssignments[today]=chosen.date;
    localStorage.setItem(STORE,JSON.stringify(state));
  }
  return chosen||null;
}
function projectedPlanMap(){
  const today=localISO(new Date());
  const map={};
  const pending=studyPlanDays().filter(d=>!planDayCompleted(d)).slice().sort((a,b)=>a.date.localeCompare(b.date));
  const slots=studyPlanDays().filter(d=>d.date>=today).slice().sort((a,b)=>a.date.localeCompare(b.date));
  state.rolloverAssignments=state.rolloverAssignments||{};
  slots.forEach(slot=>{
    let chosen=null;
    const persisted=state.rolloverAssignments[slot.date];
    if(persisted) chosen=getDay(persisted);
    if(!chosen){
      const idx=pending.findIndex(p=>p.date<=slot.date);
      if(idx>=0) chosen=pending[idx];
    }
    if(chosen){
      map[slot.date]=chosen;
      const idx=pending.findIndex(p=>p.date===chosen.date);
      if(idx>=0)pending.splice(idx,1);
    }
  });
  return map;
}
function effectivePlanForDate(date){
  const fixed=getDay(date);
  if(isExamDay(fixed))return fixed;
  const today=localISO(new Date());
  if(date===today)return ensureTodayAssignment();
  if(date<today){
    if(fixed&&planDayCompleted(fixed))return fixed;
    return null;
  }
  return projectedPlanMap()[date]||fixed;
}

function taskUnit(t){
  const m=(t.title||'').match(/U(\d+)/i);
  if(!m)return null;
  let subject=t.subject;
  if(subject==='repaso'){
    if(/^Privado/i.test(t.title))subject='privado';
    else if(/^Penal/i.test(t.title))subject='penal';
  }
  if(subject!=='privado'&&subject!=='penal')return null;
  return {subject:subject,unit:Number(m[1])};
}
function getResource(subject,unit){
  return window.STUDY_RESOURCES&&window.STUDY_RESOURCES[subject]&&window.STUDY_RESOURCES[subject][unit]||null;
}
function resourceLinkHTML(subject,unit,label,topic){
  const r=getResource(subject,unit);
  if(!r)return '';
  const clean=(topic||'').trim();
  let href=r.url;
  if(clean){
    const base=href.split('#')[0];
    href=base+'#:~:text='+encodeURIComponent(clean);
  }
  const topicNote=clean?'<span class="summary-topic">Tema: '+clean+'</span>':'';
  return '<div class="summary-link-wrap"><a class="summary-link" href="'+href+'" target="_blank" rel="noopener">'+(label||'Abrir resumen')+' ↗</a>'+topicNote+(clean?'<button class="copy-topic" data-copy-topic="'+clean.replace(/"/g,'&quot;')+'">Copiar tema</button>':'')+'</div>';
}
function practiceTopic(x){
  if(x.topic)return x.topic;
  if(x.subject==='privado'){
    if(x.unit===1){
      if(/deber jurídico|obligación en sentido técnico/i.test(x.q||x.front||''))return 'Deber jurídico';
      if(/naturales|art\. 728|morales o de conciencia/i.test((x.q||'')+' '+(x.front||'')))return 'Obligaciones naturales';
      if(/propter rem/i.test((x.q||'')+' '+(x.front||'')))return 'Obligaciones propter rem';
      if(/derecho personal|derecho real/i.test((x.q||'')+' '+(x.front||'')))return 'Derechos personales y reales';
    }
  }
  const s=(x.q||'')+' '+(x.front||'')+' '+(x.back||'');
  const maps={
    1:[['ius poenale','Derecho Penal objetivo'],['dogmática','Dogmática penal']],
    2:[['secuencia correcta','Evolución del Derecho Penal argentino'],['Ilustración','Iluminismo o Ilustración']],
    3:[['legalidad','Principio de legalidad'],['lesividad','Principio de lesividad']],
    4:[['fuente inmediata','Fuentes del Derecho Penal'],['DNU','Decretos de necesidad y urgencia']],
    5:[['embajadas','Concepto de territorio'],['territorial','Principio territorial']],
    6:[['art. 2','Ley penal más benigna'],['temporal o excepcional','Leyes temporales y excepcionales']],
    7:[['teoría del delito','Teoría jurídica del delito'],['Roxin','Funcionalismo']],
    8:[['finalista','Concepción finalista de la acción'],['personas jurídicas','Agente del hecho']],
    9:[['tipo y tipicidad','El tipo'],['imputación objetiva','Imputación objetiva']],
    10:[['formal y material','Antijuridicidad formal y material'],['supralegales','Justificación supralegal']],
    11:[['tres requisitos','Legítima defensa'],['20.4','Legítima defensa']],
    12:[['finalismo','Culpabilidad'],['aborto','Responsabilidad por el hecho']],
    13:[['inimputabilidad','Inimputabilidad'],['emoción violenta','Imputabilidad disminuida']],
    14:[['tentativa','Tentativa'],['desistimiento','Desistimiento']],
    15:[['autor mediato','Autoría mediata'],['dominio del hecho','Teoría del dominio del hecho']],
    16:[['concurso ideal','Concurso ideal'],['art. 58','Unificación de condenas']],
    17:[['art. 59','Extinción de la acción penal'],['suspensión del juicio','Suspensión del juicio a prueba']],
    18:[['35 años','Libertad condicional'],['libertad asistida','Libertad asistida']],
    19:[['reincidencia','Reincidencia']],
    20:[['Régimen Penal Juvenil','Régimen para menores'],['875/2026','Régimen Penal Juvenil']],
    21:[['24.660','Ley Penitenciaria Nacional'],['finalidad general','Tratamiento']],
    22:[['Couture','Mandamientos del abogado'],['art. 48','Participación criminal']]
  };
  const list=maps[x.unit]||[];
  for(const [needle,topic] of list) if(s.toLowerCase().includes(needle.toLowerCase())) return topic;
  return 'Unidad '+x.unit;
}


function getUnitState(subject,n){return (state.units[subject]&&state.units[subject][n])||{status:'sin',lastStudy:null};}
function setUnitStatus(subject,n,status){
  state.units[subject]=state.units[subject]||{};
  const old=getUnitState(subject,n);
  state.units[subject][n]={status,lastStudy:old.lastStudy||null};
  save();renderUnits();renderReviews();
}
function studiedToday(subject,n){
  const today=localISO(new Date());
  state.units[subject]=state.units[subject]||{};
  const old=getUnitState(subject,n);
  state.units[subject][n]={status:old.status==='sin'?'amarillo':old.status,lastStudy:today};
  state.reviews=state.reviews.filter(r=>!(r.subject===subject&&r.unit===n&&!r.done));
  [1,3,7].forEach((off,idx)=>state.reviews.push({
    id:subject+'-'+n+'-'+today+'-'+off,subject,unit:n,due:addDays(today,off),
    label:idx===0?'24 h':idx===1?'72 h':'7 días',done:false
  }));
  save();renderUnits();renderReviews();renderDueReviews();
}

function setView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===name));
  document.getElementById('view-'+name).classList.add('active');
  const titles={hoy:'Hoy',calendario:'Calendario',unidades:'Unidades',repasos:'Repasos',practica:'Práctica',simulador:'Bolillero'};
  document.getElementById('view-title').textContent=titles[name]||'Estudio';
  if(name==='calendario')renderCalendar();
  if(name==='unidades')renderUnits();
  if(name==='repasos')renderReviews();
  if(name==='practica')renderPractice();
  window.scrollTo({top:0,behavior:'smooth'});
}

function todayMethodHTML(){
  return '<div class="method-flow">'+
    '<div class="method-step"><b>1 · LEÉ — 20/25 min</b><span>Leé para entender. No copies ni resumas mientras leés. Buscá la lógica y los ejemplos.</span></div>'+
    '<div class="method-step"><b>2 · CERRÁ — 8/10 min</b><span>Cerrá el material y explicalo en voz alta como si se lo enseñaras a alguien.</span></div>'+
    '<div class="method-step"><b>3 · CORREGÍ — 5 min</b><span>Abrí de nuevo. Detectá solamente qué omitiste, confundiste o dijiste mal.</span></div>'+
    '<div class="method-step"><b>4 · ESCRIBÍ — 3/5 min</b><span>Escribí un mapa mínimo: palabras clave, artículo o diferencia que te costó. No un resumen nuevo.</span></div>'+
  '</div>'+
  '<p class="method-note"><strong>Tu técnica principal va a ser explicar.</strong> Después de cada bloque, si podés explicarlo sin mirar queda amarillo/verde; si sólo “te suena” pero no sale, queda rojo. La escritura es para ordenar fallas, no para reemplazar el estudio.</p>';
}

function renderToday(){
  const today=localISO(new Date());
  document.getElementById('today-chip').textContent=cap(new Date().toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long'}));
  document.getElementById('days-privado').textContent=daysUntil(PRIVADO_EXAM);
  document.getElementById('days-penal').textContent=daysUntil(PENAL_EXAM);
  document.getElementById('hero-day').textContent=String(new Date().getDate()).padStart(2,'0');

  const d=effectivePlanForDate(today);
  const headline=document.getElementById('today-headline');
  const summary=document.getElementById('today-summary');
  const targets=document.getElementById('today-targets');
  const blocks=document.getElementById('today-blocks');
  document.getElementById('method-card').innerHTML=todayMethodHTML();
  document.getElementById('daily-load-title').textContent='3 bloques × 40 min';
  document.getElementById('daily-load-note').textContent=today<='2026-10-09'?'Semana de calibración: no agregamos un cuarto bloque aunque te sobre energía.':'Carga base: seguimos con 3 bloques hasta decidir juntos si hace falta subirla.';

  if(today<START_DATE){
    headline.textContent='Hoy no estudiás.';
    summary.textContent='Hoy dejamos la página lista. El plan empieza mañana, viernes 2 de octubre.';
    targets.innerHTML='<div class="empty">Inicio programado: <strong>2 de octubre</strong>. Hoy no recuperamos contenido ni adelantamos unidades.</div>';
    blocks.innerHTML='<div class="empty">Mañana arrancamos con <strong>3 bloques de 40 minutos</strong> y descansos de 10 minutos. Esa es la carga base hasta que midamos cómo te rinde.</div>';
  }else if(!d){
    const weekday=new Date().getDay();
    headline.textContent=(weekday===0||weekday===6)?'Descanso programado.':'Día sin contenido nuevo.';
    summary.textContent=(weekday===0||weekday===6)?'No hace falta compensar hoy. El descanso también forma parte del plan.':'Usá el día sólo para un repaso breve si aparece algo vencido.';
    targets.innerHTML='<div class="empty">No hay unidades nuevas asignadas hoy.</div>';
    blocks.innerHTML='<div class="empty">Si no hay repasos vencidos: descanso.</div>';
  }else{
    const carried=d.date!==today&&!isExamDay(d);
    headline.textContent=d.label+(carried?' · reprogramado':'');
    summary.textContent=carried
      ?('Este plan era del '+prettyDate(d.date,true)+' y pasó automáticamente a hoy porque no quedó marcado como cumplido. No se perdió contenido ni se agregó carga extra.')
      :(d.note||'Cumplí el alcance marcado. No avances a la unidad siguiente aunque termines antes.');
    targets.innerHTML=d.tasks.map((t,i)=>targetHTML(d.date,i,t)).join('') || '<div class="empty">'+(d.note||'Sin tareas')+'</div>';
    blocks.innerHTML=buildBlocks(d).map(blockHTML).join('');
  }
  renderDueReviews();
  refreshProgress();
}

function targetHTML(date,i,t){
  const id=taskId(date,i),done=!!state.tasks[id];
  const role=i===0?'Foco principal':(t.subject==='repaso'?'Repaso':'Segunda materia');
  const tu=taskUnit(t);
  const link=tu?resourceLinkHTML(tu.subject,tu.unit,'Ver resumen de U'+tu.unit):'';
  return '<article class="target-card '+t.subject+' '+(done?'done':'')+'">'+
    '<button class="target-check" data-task="'+id+'" aria-label="Marcar objetivo">'+(done?'✓':'')+'</button>'+
    '<div><div class="focus-label">'+role+'</div><div class="target-title">'+t.title+'</div><div class="target-scope">'+t.scope+'</div><div class="target-stop"><strong>'+(t.finish?'Meta de salida: ':'Hasta acá y frenás: ')+'</strong>'+t.stop+'</div>'+link+'</div>'+
    '<span class="subject-pill '+t.subject+'">'+labelSubject(t.subject)+'</span>'+
  '</article>';
}

function buildBlocks(d){
  if(!d.tasks.length)return [];
  const a=d.tasks[0],b=d.tasks[1]||null;

  if(!b){
    return [
      {time:'10:00',title:'Bloque 1 · Entender',text:'Trabajá sólo el alcance marcado arriba. 20–25 min para leer y entender sin copiar; después cerrá y explicá lo que entendiste.',badge:'40 min',resource:taskUnit(a)},
      {time:'10:50',title:'Bloque 2 · Completar y explicar',text:'Terminá el tramo de hoy. Volvé únicamente a lo que no salió y cerrá con una explicación oral completa.',badge:'40 min',resource:taskUnit(a)},
      {time:'17:30',title:'Bloque 3 · Recuperar sin mirar',text:'Sin material: explicá el tema de punta a punta. Abrí recién al final para corregir huecos y anotá sólo 3–5 palabras clave.',badge:'40 min',resource:taskUnit(a)}
    ];
  }

  return [
    {time:'10:00',title:'Bloque 1 · '+labelSubject(a.subject),text:'Empezá el foco principal: '+a.scope+' Leé para entender, no para copiar. Terminá explicando en voz alta lo que ya puedas reconstruir.',badge:'40 min',resource:taskUnit(a)},
    {time:'10:50',title:'Bloque 2 · '+labelSubject(a.subject),text:'Seguí exactamente hasta el límite indicado arriba. Últimos 10–15 min: cerrá todo y explicá el tramo completo. No avances a la parte siguiente.',badge:'40 min',resource:taskUnit(a)},
    {time:'17:30',title:'Bloque 3 · '+labelSubject(b.subject),text:b.scope+' Hacé una primera pasada activa y cerrá con explicación oral. Si no alcanza para dominarlo, queda amarillo: no alargues el día.',badge:'40 min',resource:taskUnit(b)}
  ];
}
function blockHTML(b){
  const link=b.resource?resourceLinkHTML(b.resource.subject,b.resource.unit,'Abrir resumen U'+b.resource.unit):'';
  return '<article class="study-block"><div class="block-time">'+b.time+'</div><div><h4>'+b.title+'</h4><p>'+b.text+'</p>'+link+'</div><button class="block-start" data-start-block="40">▶ 40 min</button></article>';
}
function toggleTask(id){
  state.tasks[id]=!state.tasks[id];save();renderToday();renderCalendar();renderPractice();
  if(selectedDate)renderCalendarDetail(selectedDate);
}

function renderCalendar(){
  const month=calendarCursor.getMonth(),year=calendarCursor.getFullYear();
  document.getElementById('calendar-month').textContent=cap(calendarCursor.toLocaleDateString('es-AR',{month:'long',year:'numeric'}));
  const grid=document.getElementById('calendar-grid');
  const first=new Date(year,month,1);
  const last=new Date(year,month+1,0);
  const mondayIndex=(first.getDay()+6)%7;
  const cells=[];
  for(let i=0;i<mondayIndex;i++){
    const dt=new Date(year,month,1-(mondayIndex-i));
    cells.push(calendarCell(dt,true));
  }
  for(let d=1;d<=last.getDate();d++)cells.push(calendarCell(new Date(year,month,d),false));
  while(cells.length%7!==0){
    const next=cells.length-mondayIndex-last.getDate()+1;
    cells.push(calendarCell(new Date(year,month+1,next),true));
  }
  grid.innerHTML=cells.join('');
}
function calendarCell(dt,other){
  const iso=localISO(dt),d=effectivePlanForDate(iso),today=localISO(new Date());
  const original=getDay(iso);
  const missedPast=iso<today&&original&&original.tasks&&original.tasks.length&&!isExamDay(original)&&!planDayCompleted(original);
  let badges='';
  if(d&&d.tasks.length){
    const cats=[...new Set(d.tasks.map(t=>t.subject))];
    badges=cats.map(cat=>{
      const indices=d.tasks.map((t,i)=>t.subject===cat?i:null).filter(i=>i!==null);
      const all=indices.every(i=>!!state.tasks[taskId(d.date,i)]);
      const short=cat==='privado'?'Privado':cat==='penal'?'Penal':'Repaso';
      return '<div class="day-subject '+cat+'"><span>'+short+'</span><span class="day-check">'+(all?'✓':'○')+'</span></div>';
    }).join('');
  }
  const shifted=d&&d.date!==iso&&!isExamDay(d);
  const note=missedPast
    ?'<div class="day-note">↪ No realizado · pasó al próximo día de estudio</div>'
    :(d?(shifted?'<div class="day-note">↪ Reprogramado desde '+prettyDate(d.date,true)+'</div>':(d.note?'<div class="day-note">'+d.note+'</div>':'')):'');
  return '<div class="calendar-cell '+(other?'other ':'')+((d||missedPast)?'clickable ':'')+(iso===today?'today ':'')+(iso===selectedDate?'selected':'')+'" '+((d||missedPast)?'data-calendar-date="'+iso+'"':'')+'>'+
    '<div class="day-number">'+dt.getDate()+'</div><div class="day-subjects">'+badges+'</div>'+note+'</div>';
}
function renderCalendarDetail(date){
  selectedDate=date;renderCalendar();
  const d=effectivePlanForDate(date),box=document.getElementById('calendar-detail');
  const original=getDay(date),today=localISO(new Date());
  const missedPast=date<today&&original&&original.tasks&&original.tasks.length&&!isExamDay(original)&&!planDayCompleted(original);
  if(!d){
    box.innerHTML=missedPast
      ?'<div class="empty"><strong>No realizado.</strong> El contenido de este día ya fue trasladado al próximo día de estudio disponible.</div>'
      :'<div class="empty">No hay plan cargado para este día.</div>';
    return;
  }
  const tasks=d.tasks.length?d.tasks.map((t,i)=>{
    const done=!!state.tasks[taskId(d.date,i)];
    return '<div class="day-detail-task"><strong>'+t.title+(done?' ✓':'')+'</strong><span>'+t.scope+'</span><span><b>'+(t.finish?'Meta: ':'Límite: ')+'</b>'+t.stop+'</span></div>';
  }).join(''):'<div class="empty">'+(d.note||'Descanso')+'</div>';
  const shifted=d.date!==date&&!isExamDay(d); box.innerHTML='<article class="day-detail-card"><div class="day-detail-head"><div><h3>'+cap(prettyDate(date,false))+' · '+d.label+(shifted?' · reprogramado':'')+'</h3><p>'+(shifted?('Plan original del '+prettyDate(d.date,true)+'. Se corrió automáticamente por una jornada pendiente.'):(d.note||'Plan del día'))+'</p></div><button class="ghost-btn" data-open-day="'+date+'">Ver en Hoy</button></div><div class="day-detail-tasks">'+tasks+'</div></article>';
}
function goMonth(delta){calendarCursor=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+delta,1);selectedDate=null;renderCalendar();document.getElementById('calendar-detail').innerHTML='<div class="empty">Tocá un día del calendario para ver su plan.</div>';}

function renderUnits(){
  let data=currentSubject==='privado'?privado.slice():penal.slice();
  if(currentSort==='carga')data.sort((a,b)=>b.weight-a.weight);
  document.getElementById('unit-grid').innerHTML=data.map(u=>{
    const us=getUnitState(currentSubject,u.n);
    return '<article class="unit-card status-'+us.status+'"><div class="unit-top"><span class="unit-num">UNIDAD '+u.n+'</span><span class="unit-load">Carga '+u.weight+'×</span></div>'+
      '<h4>'+u.title+'</h4><div class="unit-stats"><span>'+u.difficulty+'</span><span>Orden de carga: '+u.rank+'</span>'+(us.lastStudy?'<span>Último estudio: '+prettyDate(us.lastStudy,true)+'</span>':'')+'</div>'+
      '<div class="unit-actions"><select class="status-select" data-unit-subject="'+currentSubject+'" data-unit="'+u.n+'">'+
      option('sin','Sin empezar',us.status)+option('amarillo','En proceso',us.status)+option('verde','Dominada',us.status)+option('rojo','Reforzar',us.status)+
      '</select><button class="study-today" data-study-subject="'+currentSubject+'" data-study-unit="'+u.n+'">Estudié hoy</button></div></article>';
  }).join('');
}
function option(v,label,selected){return '<option value="'+v+'" '+(v===selected?'selected':'')+'>'+label+'</option>';}

function renderDueReviews(){
  const today=localISO(new Date());
  const due=state.reviews.filter(r=>!r.done&&r.due<=today).sort((a,b)=>a.due.localeCompare(b.due));
  const box=document.getElementById('due-reviews');
  if(!due.length){box.innerHTML='<div class="review-chip"><strong>Todo al día</strong><span>No hay repasos vencidos.</span></div>';return;}
  box.innerHTML=due.slice(0,6).map(r=>{
    const u=(r.subject==='privado'?privado:penal).find(x=>x.n===r.unit);
    return '<div class="review-chip"><strong>'+labelSubject(r.subject)+' U'+r.unit+' · '+r.label+'</strong><span>'+u.title+'</span></div>';
  }).join('');
}
function renderReviews(){
  const today=localISO(new Date());
  const list=state.reviews.slice().sort((a,b)=>a.due.localeCompare(b.due));
  const box=document.getElementById('review-list');
  if(!list.length){box.innerHTML='<div class="empty">Todavía no hay repasos automáticos. Cuando estudies una unidad, marcá “Estudié hoy”.</div>';return;}
  box.innerHTML=list.map(r=>{
    const u=(r.subject==='privado'?privado:penal).find(x=>x.n===r.unit),due=!r.done&&r.due<=today;
    return '<article class="review-item '+(due?'due ':'')+(r.done?'done':'')+'"><div><p><strong>'+labelSubject(r.subject)+' U'+r.unit+' · '+r.label+'</strong> — '+u.title+'</p><small>'+cap(prettyDate(r.due,true))+(due?' · Vence ahora':'')+'</small></div><div class="review-actions"><button class="ghost-btn" data-review="'+r.id+'">'+(r.done?'Reabrir':'Hecho')+'</button></div></article>';
  }).join('');
}
function toggleReview(id){const r=state.reviews.find(x=>x.id===id);if(r){r.done=!r.done;save();renderReviews();renderDueReviews();}}

function todayPracticeUnits(){
  const d=effectivePlanForDate(localISO(new Date()));
  if(!d)return [];
  return d.tasks.map(taskUnit).filter(Boolean);
}
function practicePool(){
  const bank=window.PRACTICE_BANK||{questions:[],flashcards:[]};
  let pool=(bank[practiceMode]||[]).slice();
  if(practiceFilter==='today'){
    const units=todayPracticeUnits();
    pool=pool.filter(x=>units.some(u=>u.subject===x.subject&&u.unit===x.unit));
  }else if(practiceFilter==='studied'){
    pool=pool.filter(x=>getUnitState(x.subject,x.unit).status!=='sin');
  }else if(practiceFilter==='privado'||practiceFilter==='penal'){
    pool=pool.filter(x=>x.subject===practiceFilter);
  }
  return pool;
}
function pickPracticeItem(forceDifferent){
  const pool=practicePool();
  if(!pool.length){currentPracticeItem=null;practiceRevealed=false;return;}
  let candidates=pool;
  if(forceDifferent&&currentPracticeItem&&pool.length>1){
    candidates=pool.filter(x=>x!==currentPracticeItem);
  }
  currentPracticeItem=candidates[Math.floor(Math.random()*candidates.length)];
  practiceRevealed=false;
}
function renderPractice(){
  const card=document.getElementById('practice-card');
  if(!card)return;
  const pool=practicePool();
  document.getElementById('practice-pool-count').textContent=pool.length+' '+(practiceMode==='questions'?'preguntas':'flashcards')+' disponibles';
  document.getElementById('practice-progress-count').textContent=practiceCount+' practicadas';
  if(!currentPracticeItem||!pool.includes(currentPracticeItem))pickPracticeItem(false);
  if(!currentPracticeItem){
    card.className='practice-card';
    card.innerHTML='<div class="empty">No hay tarjetas para este filtro todavía. Probá con “Todo”, “Penal” o una materia que ya hayas estudiado.</div>';
    document.getElementById('practice-reveal').disabled=true;
    return;
  }
  document.getElementById('practice-reveal').disabled=false;
  const x=currentPracticeItem;
  const topic=practiceTopic(x);
  const source=resourceLinkHTML(x.subject,x.unit,'Ir a este tema en el resumen',topic);
  if(practiceMode==='questions'){
    card.className='practice-card';
    card.innerHTML='<div class="practice-meta"><span class="'+x.subject+'">'+labelSubject(x.subject)+'</span><span>Unidad '+x.unit+'</span><span>Respondé en voz alta</span></div>'+
      '<p class="practice-prompt">'+x.q+'</p>'+
      '<p class="practice-hint">No mires el resumen todavía. Explicalo con tus palabras y recién después tocá “Ver respuesta”.</p>'+
      '<div class="practice-answer '+(practiceRevealed?'':'hidden')+'"><strong>Respuesta esperada</strong>'+x.a+'</div>'+
      '<div class="practice-source">'+source+'</div>';
    document.getElementById('practice-reveal').textContent=practiceRevealed?'Ocultar respuesta':'Ver respuesta';
  }else{
    card.className='practice-card flashcard-mode';
    card.innerHTML='<div class="practice-meta"><span class="'+x.subject+'">'+labelSubject(x.subject)+'</span><span>Unidad '+x.unit+'</span><span>Definición → término</span></div>'+
      '<div class="'+(practiceRevealed?'flashcard-back':'flashcard-front')+'">'+(practiceRevealed?x.back:x.front)+'</div>'+
      '<p class="practice-hint">'+(practiceRevealed?'Esta es la palabra o instituto que buscabas.':'Decí la palabra o instituto antes de dar vuelta la tarjeta.')+'</p>'+
      '<div class="practice-source">'+source+'</div>';
    document.getElementById('practice-reveal').textContent=practiceRevealed?'Volver a definición':'Dar vuelta';
  }
}
function revealPractice(){
  if(!currentPracticeItem)return;
  practiceRevealed=!practiceRevealed;
  if(practiceRevealed)practiceCount++;
  renderPractice();
}
function nextPractice(){
  pickPracticeItem(true);
  renderPractice();
}

function refreshProgress(){
  [['privado',privado],['penal',penal]].forEach(([subject,arr])=>{
    const green=arr.filter(u=>getUnitState(subject,u.n).status==='verde').length,pct=Math.round(green/arr.length*100);
    document.getElementById('bar-'+subject).style.width=pct+'%';
    document.getElementById('pct-'+subject).textContent=pct+'% de unidades en verde';
  });
}

function spin(subject){
  const arr=subject==='privado'?privado:penal;
  const studied=arr.filter(u=>getUnitState(subject,u.n).status!=='sin');
  const pool=studied.length?studied:arr;
  const u=pool[Math.floor(Math.random()*pool.length)];
  document.getElementById('ball-result').innerHTML='<span>'+u.n+'</span><p><strong>'+labelSubject(subject)+' · Unidad '+u.n+'</strong><br>'+u.title+'</p>';
}

let timer={remaining:2400,total:2400,mode:'Estudio',running:false,handle:null};
function renderTimer(){
  const m=Math.floor(timer.remaining/60),s=timer.remaining%60;
  document.getElementById('timer-display').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  document.getElementById('timer-mode').textContent=timer.mode;
  document.getElementById('timer-start').textContent=timer.running?'Pausar':'Iniciar';
  document.getElementById('timer-progress').style.width=Math.max(0,(timer.remaining/timer.total)*100)+'%';
}
function setTimer(minutes,mode){
  if(timer.handle)clearInterval(timer.handle);
  timer={remaining:minutes*60,total:minutes*60,mode,running:false,handle:null};renderTimer();
}
function toggleTimer(){
  if(timer.running){
    clearInterval(timer.handle);timer.handle=null;timer.running=false;renderTimer();return;
  }
  timer.running=true;renderTimer();
  timer.handle=setInterval(()=>{
    timer.remaining--;
    if(timer.remaining<=0){
      timer.remaining=0;clearInterval(timer.handle);timer.handle=null;timer.running=false;renderTimer();beep();
      document.title='✓ '+timer.mode+' terminado · Nico Study Hub';
      setTimeout(()=>document.title='Nico Study Hub · Privado II + Penal',3000);
      return;
    }
    renderTimer();
  },1000);
}
function resetTimer(){timer.remaining=timer.total;if(timer.handle)clearInterval(timer.handle);timer.handle=null;timer.running=false;renderTimer();}
function beep(){
  try{
    const C=window.AudioContext||window.webkitAudioContext,ctx=new C(),osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);osc.frequency.value=700;gain.gain.value=.08;osc.start();setTimeout(()=>{osc.stop();ctx.close();},350);
  }catch(e){}
}

function exportData(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='nico-study-hub-progreso.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function importData(file){
  const reader=new FileReader();
  reader.onload=()=>{try{state=Object.assign(defaultState(),JSON.parse(reader.result));save();renderToday();renderCalendar();renderUnits();renderReviews();alert('Progreso importado.');}catch(e){alert('No pude leer ese archivo.');}};
  reader.readAsText(file);
}

document.addEventListener('click',e=>{
  const nav=e.target.closest('.nav-btn');if(nav){setView(nav.dataset.view);return;}
  const tt=e.target.closest('[data-task]');if(tt){toggleTask(tt.dataset.task);return;}
  const study=e.target.closest('[data-study-unit]');if(study){studiedToday(study.dataset.studySubject,Number(study.dataset.studyUnit));return;}
  const review=e.target.closest('[data-review]');if(review){toggleReview(review.dataset.review);return;}
  const subject=e.target.closest('[data-subject]');if(subject){currentSubject=subject.dataset.subject;document.querySelectorAll('[data-subject]').forEach(x=>x.classList.toggle('active',x===subject));renderUnits();return;}
  const sort=e.target.closest('[data-sort]');if(sort){currentSort=sort.dataset.sort;document.querySelectorAll('[data-sort]').forEach(x=>x.classList.toggle('active',x===sort));renderUnits();return;}
  const cal=e.target.closest('[data-calendar-date]');if(cal){renderCalendarDetail(cal.dataset.calendarDate);return;}
  const open=e.target.closest('[data-open-day]');if(open){setView('hoy');return;}
  const block=e.target.closest('[data-start-block]');if(block){setTimer(Number(block.dataset.startBlock),'Bloque de estudio');toggleTimer();return;}
  const pm=e.target.closest('[data-practice-mode]');if(pm){
    practiceMode=pm.dataset.practiceMode;currentPracticeItem=null;practiceRevealed=false;
    document.querySelectorAll('[data-practice-mode]').forEach(x=>x.classList.toggle('active',x===pm));
    renderPractice();return;
  }
  const pf=e.target.closest('[data-practice-filter]');if(pf){
    practiceFilter=pf.dataset.practiceFilter;currentPracticeItem=null;practiceRevealed=false;
    document.querySelectorAll('[data-practice-filter]').forEach(x=>x.classList.toggle('active',x===pf));
    renderPractice();return;
  }
  const cp=e.target.closest('[data-copy-topic]');if(cp){
    navigator.clipboard&&navigator.clipboard.writeText(cp.dataset.copyTopic);
    cp.textContent='Copiado ✓';setTimeout(()=>cp.textContent='Copiar tema',1200);return;
  }
});
document.addEventListener('change',e=>{
  if(e.target.matches('.status-select'))setUnitStatus(e.target.dataset.unitSubject,Number(e.target.dataset.unit),e.target.value);
});
document.getElementById('prev-month').addEventListener('click',()=>goMonth(-1));
document.getElementById('next-month').addEventListener('click',()=>goMonth(1));
document.getElementById('spin-privado').addEventListener('click',()=>spin('privado'));
document.getElementById('spin-penal').addEventListener('click',()=>spin('penal'));
document.getElementById('timer-start').addEventListener('click',toggleTimer);
document.getElementById('timer-reset').addEventListener('click',resetTimer);
document.getElementById('practice-reveal').addEventListener('click',revealPractice);
document.getElementById('practice-next').addEventListener('click',nextPractice);
document.querySelectorAll('[data-minutes]').forEach(b=>b.addEventListener('click',()=>setTimer(Number(b.dataset.minutes),b.dataset.mode)));
document.getElementById('export-data').addEventListener('click',exportData);
document.getElementById('import-data').addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0]);});
document.getElementById('reset-data').addEventListener('click',()=>{if(confirm('¿Seguro que querés borrar todo el progreso guardado en este navegador?')){state=defaultState();save();renderToday();renderCalendar();renderUnits();renderReviews();}});

renderToday();renderCalendar();renderUnits();renderReviews();renderPractice();refreshProgress();renderTimer();
})();