/* Etapa 4: visualização local; formulário e checkout originais permanecem responsáveis pelo pedido. */
(()=>{'use strict';
const $=s=>document.querySelector(s),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const child=$('#child'),hero=$('#hero-name'),nameEl=$('#carta [data-k="nome"]');
let current='';
function paint(raw){const name=(raw||'').trim().slice(0,40)||'Sofia';if(name===current)return;current=name;
if(nameEl){nameEl.textContent=name;if(!reduced){nameEl.classList.remove('nm4-ink');void nameEl.offsetWidth;nameEl.classList.add('nm4-ink')}}
// A cena pinned sincroniza o próprio nome no scroll-narrativo.js; não sobrescrever outros elementos da carta.
}
if(child)child.addEventListener('input',()=>paint(child.value));
if(hero)hero.addEventListener('input',()=>{if(!child?.value.trim())paint(hero.value)});
paint(child?.value||hero?.value||'');
const stepper=$('#stepper');if(stepper&&!stepper.nextElementSibling?.classList.contains('nm4-progress')){const track=document.createElement('div');track.className='nm4-progress';track.setAttribute('role','progressbar');track.setAttribute('aria-label','Progresso da personalização');track.setAttribute('aria-valuemin','1');track.setAttribute('aria-valuemax','3');const fill=document.createElement('span');track.append(fill);stepper.after(track);
const update=()=>{const active=stepper.querySelector('li[aria-current="step"],li.active');const step=Math.max(1,Math.min(3,Number(active?.dataset.s)||1));fill.style.width=(step/3*100)+'%';track.setAttribute('aria-valuenow',String(step));track.setAttribute('aria-valuetext','Etapa '+step+' de 3')};
new MutationObserver(update).observe(stepper,{subtree:true,attributes:true,attributeFilter:['class','aria-current']});update();
}
// Reserved but invisible: no invented testimonials or ratings.
if(!$('#depoimentos-reais')){const reviews=document.createElement('section');reviews.id='depoimentos-reais';reviews.className='nm4-testimonials';reviews.hidden=true;reviews.setAttribute('aria-label','Depoimentos reais de clientes');($('#pacotes')||$('#personalizar'))?.after(reviews)}
})();
