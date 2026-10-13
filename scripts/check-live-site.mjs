// Revisión de disponibilidad pública: no realiza escrituras ni requiere iniciar sesión.
const site=process.env.JJK_SITE_URL||'https://jjknewworld.uk/';
const request=async pathname=>{
 const target=new URL(pathname,site).toString();
 const response=await fetch(target,{signal:AbortSignal.timeout(15000),redirect:'follow'});
 if(!response.ok)throw new Error('HTTP '+response.status+' en '+target);
 return response;
};
const homepage=await (await request('/')).text();
for(const id of ['account-section','characters-section','combat-section','shop-section']){
 if(!homepage.includes('id="'+id+'"'))throw new Error('No se encontró '+id+' en la página publicada');
}
const catalog=await (await request('/peculiaridades.json')).json();
if(catalog.peculiaridades?.length!==77)throw new Error('El catálogo publicado no contiene 77 peculiaridades');
if(Math.abs(Object.values(catalog.probabilidades).reduce((a,b)=>a+Number(b),0)-100)>1e-8)throw new Error('Las probabilidades publicadas no suman 100%');
if(Number(catalog.probabilidades.legendaria)!==2)throw new Error('La rareza legendaria publicada no es 2%');
console.log('OK: sitio disponible, módulos principales publicados, catálogo de 77 y probabilidades correctas.');
