/* ETAPA 3 — Aprimoramento progressivo. Não altera planos, valores, checkout ou formulários. */
(()=>{'use strict';
 const root=document.querySelector('#pacotes');if(!root)return;
 const cards=[...root.querySelectorAll('.offer-card')];if(cards.length<2)return;
 const kit=cards.find(c=>c.classList.contains('offer-card-paper'));
 const foto=cards.find(c=>c.classList.contains('offer-card-photo'));
 const badge=(card,label)=>{if(!card||card.querySelector('.nm3-badge'))return;const el=document.createElement('span');el.className='nm3-badge';el.textContent=label;card.insertBefore(el,card.firstChild)};
 // Não usar "mais escolhido" sem evidência real de vendas.
 badge(kit,'✦ Kit em destaque');badge(foto,'✦ Com foto');
 // Reaproveitar o conteúdo real existente; apenas normalizar o visual dos benefícios do segundo card.
 if(foto){const list=foto.querySelector('ul');if(list){list.classList.add('offer-benefits');for(const li of list.children){if(li.querySelector('span'))continue;const raw=li.textContent.trim().replace(/^[✧✦✓]\s*/,'');li.textContent='';const icon=document.createElement('span');icon.setAttribute('aria-hidden','true');icon.textContent='✦';const label=document.createElement('div');const strong=document.createElement('strong');strong.textContent=raw;label.append(strong);li.append(icon,label)}}}
 // Selos informativos, sem afirmar certificações não verificadas.
 if(!root.querySelector('.nm3-trust')){const trust=document.createElement('div');trust.className='nm3-trust';trust.setAttribute('aria-label','Informações da compra');for(const message of ['🔒 Pagamento pela Cakto','✉ Produto 100% digital','🖨️ Arquivos para imprimir']){const el=document.createElement('span');el.textContent=message;trust.append(el)}const cardsWrap=root.querySelector('.offer-cards');cardsWrap?.insertAdjacentElement('afterend',trust)}
 // Não inserir textos de garantia ou urgência sem comprovação.
 const canTilt=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches&&!navigator.connection?.saveData;
 if(canTilt){for(const card of cards){card.dataset.nm3Tilt='';let frame=0;card.addEventListener('pointermove',event=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const r=card.getBoundingClientRect();const x=(event.clientX-r.left)/r.width,y=(event.clientY-r.top)/r.height;card.style.setProperty('--glow-x',x*100+'%');card.style.setProperty('--glow-y',y*100+'%');card.style.transform=`perspective(1000px) rotateX(${(0.5-y)*2.4}deg) rotateY(${(x-0.5)*2.4}deg)`})},{passive:true});card.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;card.style.transform='';card.style.removeProperty('--glow-x');card.style.removeProperty('--glow-y')})}}
 // O CTA fixo do Hero já existe; não duplicar botões sobre o formulário.
})();