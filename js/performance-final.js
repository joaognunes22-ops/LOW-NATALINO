/* Etapa 6 — performance progressiva. Checkout e formulário permanecem em app.js. */
(()=>{'use strict';
const doc=document.documentElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const low=reduce||!!navigator.connection?.saveData||(navigator.deviceMemory||4)<=2||(navigator.hardwareConcurrency||4)<=2;
if(low)doc.classList.add('nm-low-power');
const hero=document.querySelector('#topo');
const inHero=img=>!!hero?.contains(img);
document.querySelectorAll('img').forEach(img=>{
  img.decoding='async';
  // As imagens visíveis na primeira dobra nunca devem ser adiadas.
  if(inHero(img)){
    if(!img.hasAttribute('loading'))img.loading='eager';
    if(img.classList.contains('cinematic-scene'))img.fetchPriority='high';
  }else if(!img.hasAttribute('loading'))img.loading='lazy';
});
document.querySelectorAll('video').forEach(v=>{
  v.playsInline=true;
  if(!v.hasAttribute('preload'))v.preload='none';
});
// Diagnóstico leve, disponível apenas com ?nm_debug=1.
if(new URLSearchParams(location.search).get('nm_debug')==='1'){
  const entries=[];
  try{
    new PerformanceObserver(list=>{
      for(const entry of list.getEntries()){
        if(entry.entryType==='largest-contentful-paint')entries.push({metric:'LCP',value:Math.round(entry.startTime)});
        if(entry.entryType==='layout-shift'&&!entry.hadRecentInput)entries.push({metric:'CLS-shift',value:entry.value});
      }
    }).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{
      for(const entry of list.getEntries())if(!entry.hadRecentInput)entries.push({metric:'CLS-shift',value:entry.value});
    }).observe({type:'layout-shift',buffered:true});
  }catch(_){}
  addEventListener('pagehide',()=>console.info('[Natal Mágico] Diagnóstico de carregamento',entries),{once:true});
}
})();
