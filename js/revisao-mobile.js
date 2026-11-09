/* Parte B: prévia de valores sem alterar o checkout ou dados do pedido. */
(function(){
'use strict';
var toggle=document.getElementById('nm-photo-preview');
var total=document.getElementById('nm-display-total');
var row=document.getElementById('nm-photo-total-row');
var next=document.getElementById('next');
var review=document.querySelector('[data-panel="3"]');
if(!toggle||!total||!row||!next||!review)return;
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var money=function(v){return (v/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});};
var current=990,raf=0;
function paint(value){total.textContent=money(value);}
function update(){
 var on=toggle.checked,target=on?2490:990;
 row.hidden=!on;
 var card=toggle.closest('.nm-photo-choice');if(card)card.setAttribute('data-selected',String(on));
 if(raf)cancelAnimationFrame(raf);
 if(reduced||review.hidden){current=target;paint(target);return;}
 var start=current,begin=performance.now(),duration=300;
 function tick(t){var progress=Math.min(1,(t-begin)/duration);var ease=1-Math.pow(1-progress,3);current=Math.round(start+(target-start)*ease);paint(current);if(progress<1)raf=requestAnimationFrame(tick);else{current=target;raf=0;}}
 raf=requestAnimationFrame(tick);
}
toggle.addEventListener('change',update);
new MutationObserver(function(){if(!review.hidden)update();}).observe(review,{attributes:true,attributeFilter:['hidden']});
update();
})();