// Comprobaciones estáticas seguras: no requiere credenciales ni toca datos del juego.
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('index.html','utf8');
const data=JSON.parse(fs.readFileSync('peculiaridades.json','utf8'));
const fail=(message)=>{throw new Error(message)};
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(x=>x[1]).filter(Boolean);
if(!scripts.length)fail('No se encontraron scripts de la aplicación');
for(const [i,source] of scripts.entries()){
 try{new vm.Script(source,{filename:'index.html:inline-'+i})}
 catch(e){fail('Error de sintaxis JavaScript en script '+i+': '+e.message)}
}
const staticHtml=html.replace(/<script[\s\S]*?<\/script>/gi,'');
const ids=[...staticHtml.matchAll(/\bid="([A-Za-z][\w-]*)"/g)].map(x=>x[1]);
const duplicates=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
if(duplicates.length)fail('IDs HTML duplicados: '+duplicates.join(', '));
if(!Array.isArray(data.peculiaridades)||data.peculiaridades.length!==77)fail('El catálogo debe contener exactamente 77 peculiaridades');
const unique=new Set(data.peculiaridades.map(x=>x.id));
if(unique.size!==77)fail('Hay identificadores de peculiaridad duplicados');
const rarities=['comun','poco','rara','epica','legendaria'];
for(const p of data.peculiaridades){
 if(!Number.isInteger(p.id)||p.id<1||p.id>81||[58,69,76,80].includes(p.id))fail('ID inválido '+p.id);
 if(!rarities.includes(p.rareza)||!p.nombre?.trim()||!p.efecto?.trim())fail('Peculiaridad incompleta '+p.id);
}
const weights=data.probabilidades;
const total=rarities.reduce((sum,key)=>sum+Number(weights[key]||0),0);
if(Math.abs(total-100)>1e-8)fail('Las probabilidades no suman 100%: '+total);
if(Number(weights.legendaria)!==2)fail('La probabilidad legendaria debe ser 2%');
if(Number(weights.epica)!==6)fail('La probabilidad épica debe permanecer en 6%');
console.log('OK: scripts='+scripts.length+', IDs HTML='+ids.length+', peculiaridades=77, probabilidades=100%, legendaria=2%');
