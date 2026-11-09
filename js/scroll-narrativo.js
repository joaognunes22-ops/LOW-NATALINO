/* Stage 2: isolated scrollytelling. Original offer, form, Cakto and legal copy untouched. */
(()=>{'use strict';
const kit=document.querySelector('#kit');if(!kit||document.querySelector('#nm2-story'))return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile=matchMedia('(max-width:700px)').matches;
const weak=!!navigator.connection?.saveData||(navigator.hardwareConcurrency||4)<=2||(navigator.deviceMemory||4)<=2;
const story=document.createElement('div');story.id='nm2-story';story.className='nm2-story';story.setAttribute('aria-label','Descubra o kit Natal Mágico');
story.innerHTML=`
<section class="nm2-scene nm2-letter-scene" aria-label="A carta do Papai Noel"><div class="nm2-pin"><div class="nm2-back" aria-hidden="true"></div><canvas class="nm2-snow" aria-hidden="true"></canvas><div class="nm2-heading"><small>✦ Correio do Polo Norte</small><h2>Uma carta especial<br>começa com um nome.</h2></div><div class="nm2-stage"><article class="nm2-paper nm2-letter"><small>✦ CORREIO DO POLO NORTE ✦</small><strong>Querida <span class="nm2-hand">Sofia</span>,</strong><p>Preparei uma surpresa muito especial para o seu Natal.</p><small>Com carinho, Papai Noel</small></article><div class="nm2-envelope" aria-hidden="true"></div><div class="nm2-flap" aria-hidden="true"></div></div><span class="nm2-cue">Continue deslizando ↓</span></div></section>
<section class="nm2-scene nm2-certificate-scene" aria-label="Certificado de Natal"><div class="nm2-pin"><div class="nm2-back" aria-hidden="true"></div><canvas class="nm2-snow" aria-hidden="true"></canvas><div class="nm2-heading"><small>✦ Uma lembrança para guardar</small><h2>Cada conquista<br>merece ser celebrada.</h2></div><div class="nm2-stage"><div class="nm2-gold" aria-hidden="true"></div><article class="nm2-paper nm2-certificate"><small>POLO NORTE • NATAL MÁGICO</small><span class="nm2-seal" aria-hidden="true">✦</span><strong>Lista dos Bonzinhos</strong><p>Com o código mágico que mostra o nome no Livro do Polo Norte.</p><small>EXEMPLO ILUSTRATIVO</small></article></div><span class="nm2-cue">Continue a viagem ↓</span></div></section>
<section class="nm2-scene nm2-book-scene" aria-label="Caderno de atividades"><div class="nm2-pin"><div class="nm2-back" aria-hidden="true"></div><canvas class="nm2-snow" aria-hidden="true"></canvas><div class="nm2-heading"><small>✦ 29 páginas de atividades</small><h2>Um mundo de descobertas<br>para imprimir em casa.</h2></div><div class="nm2-stage"><div class="nm2-book nm2-book-real" role="img" aria-label="Prévia de duas páginas reais do caderno de atividades de Natal, com capa e atividade para colorir"><div class="nm2-book-real-spine" aria-hidden="true"></div><div class="nm2-book-real-page nm2-book-real-left"><img src="images/caderno-atividade.webp" alt="" loading="lazy" decoding="async"></div><div class="nm2-book-real-page nm2-book-real-right"><img src="images/caderno-capa.webp" alt="" loading="lazy" decoding="async"></div></div></div><span class="nm2-cue">Conheça o kit ↓</span></div></section>`;
kit.parentNode.insertBefore(story,kit);
const heroInput=document.querySelector('#hero-name'),formInput=document.querySelector('#child');const sync=()=>{const name=(formInput?.value.trim()||heroInput?.value.trim()||'Sofia').slice(0,24);story.querySelector('.nm2-hand').textContent=name};heroInput?.addEventListener('input',sync,{passive:true});formInput?.addEventListener('input',sync,{passive:true});sync();
for(const heading of story.querySelectorAll('.nm2-heading h2')){const lines=heading.innerHTML.split(/<br\s*\/?\s*>/i);heading.replaceChildren(...lines.map(t=>{const outer=document.createElement('span'),inner=document.createElement('span');outer.className='nm2-line';inner.textContent=t;outer.append(inner);return outer}))}
if(reduce||weak){story.classList.add('nm2-static');return;}
function snow(canvas){const ctx=canvas.getContext('2d');if(!ctx)return;let w=0,h=0,raf=0,active=false,prev=0,energy=0,lastY=scrollY;
const flakes=Array.from({length:mobile?8:18},()=>({x:Math.random(),y:Math.random(),r:.6+Math.random(),speed:.2+Math.random()*.3}));
function resize(){const dpr=Math.min(devicePixelRatio||1,1.25);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0)}
function frame(t){if(!active||document.hidden)return;raf=requestAnimationFrame(frame);if(t-prev<40)return;prev=t;ctx.clearRect(0,0,w,h);ctx.fillStyle='#fff9e8aa';for(const f of flakes){f.y+=(f.speed+energy)*.001;f.x+=.00007;if(f.y>1)f.y=0;if(f.x>1)f.x=0;ctx.beginPath();ctx.arc(f.x*w,f.y*h,f.r,0,Math.PI*2);ctx.fill()}energy*=.85}
new IntersectionObserver(e=>{active=e[0].isIntersecting;cancelAnimationFrame(raf);if(active&&!document.hidden)raf=requestAnimationFrame(frame)}).observe(canvas);
addEventListener('resize',resize,{passive:true});addEventListener('scroll',()=>{energy=Math.min(1.5,Math.abs(scrollY-lastY)*.02);lastY=scrollY},{passive:true});document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(active&&!document.hidden)raf=requestAnimationFrame(frame)});resize()}
/* Mobile: retain scroll storytelling but avoid three continuously repainting canvases. */
if(!mobile)story.querySelectorAll('.nm2-snow').forEach(snow);
function animate(){const gsap=window.gsap,ST=window.ScrollTrigger;if(!gsap||!ST)return false;gsap.registerPlugin(ST);
for(const scene of story.querySelectorAll('.nm2-scene')){
const pin=scene.querySelector('.nm2-pin'),back=scene.querySelector('.nm2-back'),stage=scene.querySelector('.nm2-stage'),lines=scene.querySelectorAll('.nm2-line>span');
const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:scene,start:'top top',end:'bottom bottom',pin:pin,pinSpacing:false,scrub:mobile?.2:.85,anticipatePin:1,invalidateOnRefresh:true}});
tl.fromTo(back,{scale:1.06,yPercent:0,opacity:.15},{scale:1.15,yPercent:-5,opacity:.05,duration:1},0);
tl.fromTo(lines,{yPercent:105,opacity:0},{yPercent:0,opacity:1,duration:.2,stagger:.06},.03);
tl.fromTo(stage,{yPercent:6,scale:.97,opacity:0},{yPercent:0,scale:1,opacity:1,duration:.25},.07);
tl.to(stage,{yPercent:-3,scale:1.035,opacity:0,duration:.15},.86);
tl.to(lines,{yPercent:-12,opacity:0,duration:.12},.89);
if(scene.classList.contains('nm2-letter-scene')){
tl.fromTo(scene.querySelector('.nm2-flap'),{rotationX:0},{rotationX:165,duration:.2},.25);
tl.fromTo(scene.querySelector('.nm2-envelope'),{yPercent:0,opacity:1},{yPercent:38,opacity:0,duration:.22},.36);
tl.fromTo(scene.querySelector('.nm2-letter'),{yPercent:14,scaleY:.7},{yPercent:0,scaleY:1,duration:.3},.3);
tl.fromTo(scene.querySelector('.nm2-hand'),{opacity:0,yPercent:25},{opacity:1,yPercent:0,duration:.18},.56);
}else if(scene.classList.contains('nm2-certificate-scene')){
tl.fromTo(stage,{xPercent:mobile?12:26,rotation:mobile?1:3},{xPercent:0,rotation:0,duration:.3},.22);
tl.fromTo(scene.querySelector('.nm2-gold'),{opacity:0},{opacity:.8,duration:.3},.32);
}else{
/* Physical open-book mockup: no page flips, which caused mirrored/cropped pages on iOS. */
tl.fromTo(scene.querySelector('.nm2-book-real'),{rotationY:-4,rotationX:2},{rotationY:0,rotationX:0,duration:.42},.26);
}}
ST.refresh();return true}
let tries=0;function wait(){if(animate())return;if(++tries<45)setTimeout(wait,200);else story.classList.add('nm2-static')}
if(document.readyState==='complete')wait();else addEventListener('load',wait,{once:true});
})();