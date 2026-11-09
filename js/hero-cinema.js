/* Natal Magico: HERO only. Original letter/checkout remain owned by app.js. */
(()=>{'use strict';
 const hero=document.querySelector('#topo'),journey=document.querySelector('#viagem');
 if(!hero||!journey)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const mobile=matchMedia('(max-width:700px)').matches;
 const saveData=!!navigator.connection?.saveData;
 const weakDevice=(navigator.deviceMemory||4)<=2||(navigator.hardwareConcurrency||4)<=2;
 const pines=hero.querySelector('.nm-hero-pines');
 const noel=hero.querySelector('.nm-hero-noel');
 const veil=hero.querySelector('.nm-hero-intro-veil');
 const lines=[...hero.querySelectorAll('.nm-title-line>span')];
 const cta=document.querySelector('.nm-mobile-cta');
 const form=document.querySelector('#personalizar');
 const startedAt=performance.now();
 let ticking=false;
 function updateCTA(){
   ticking=false;if(!cta)return;
   const formTop=form?form.getBoundingClientRect().top:Infinity;
   cta.classList.toggle('is-visible',scrollY>innerHeight*.4&&formTop>innerHeight*.35);
 }
 addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateCTA)}},{passive:true});
 addEventListener('resize',updateCTA);updateCTA();
 if(reduced||saveData||weakDevice)return;
 function load(url){return new Promise((ok,fail)=>{const s=document.createElement('script');s.src=url;s.async=true;s.onload=ok;s.onerror=fail;document.head.appendChild(s)})}
 function snow(){
  const canvas=hero.querySelector('#nm-hero-snow');if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
  let w=0,h=0,flakes=[],raf=0,visible=false,last=0;
  const count=mobile?12:30;
  function resize(){const dpr=Math.min(devicePixelRatio||1,1.5);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);flakes=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:.6+Math.random()*1.2,s:.3+Math.random()*.5,d:(Math.random()-.5)*.3}))}
  function frame(t){if(!visible||document.hidden)return;raf=requestAnimationFrame(frame);if(t-last<32)return;last=t;ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(255,247,234,.65)';for(const f of flakes){f.y+=f.s;f.x+=f.d;if(f.y>h)f.y=-3;if(f.x>w)f.x=0;if(f.x<0)f.x=w;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill()}}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;cancelAnimationFrame(raf);if(visible&&!document.hidden)raf=requestAnimationFrame(frame)});
  observer.observe(hero);addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(visible&&!document.hidden)raf=requestAnimationFrame(frame)});resize();raf=requestAnimationFrame(frame);
 }
 async function start(){
  try{
   if(!window.gsap)await load('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js');
   if(!window.ScrollTrigger)await load('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js');
   const gsap=window.gsap,ST=window.ScrollTrigger;if(!gsap||!ST)return;
   gsap.registerPlugin(ST);
   // The original app.js owns the main workshop camera. Only foreground layers are animated here.
   // Never flash a black screen after a slow CDN response or after the visitor scrolls.
   const canIntro=scrollY<24 && performance.now()-startedAt<2400;
   if(canIntro){
     gsap.set(veil,{opacity:.68});
     gsap.set(lines,{yPercent:105,opacity:0});
     gsap.timeline({defaults:{ease:'power2.out'}})
       .to(veil,{opacity:0,duration:.85})
       .to(lines,{yPercent:0,opacity:1,duration:.72,stagger:.1},.12);
   } else {
     gsap.set(veil,{opacity:0});
     gsap.set(lines,{clearProps:'transform,opacity'});
   }
   // Foreground depth is deliberately subtle on touch devices; keep the main copy fixed.
   // Keep Santa visible at reduced opacity on mobile instead of hiding him entirely.
   gsap.timeline({scrollTrigger:{trigger:journey,start:'top top',end:'35% top',scrub:1, invalidateOnRefresh:true}})
     .fromTo(pines,{yPercent:0,scale:1.13,opacity:mobile?.14:.23},{yPercent:-10,scale:1.25,opacity:0,ease:'none'},0)
     .fromTo(noel,{yPercent:12,xPercent:8,opacity:0},{yPercent:-4,xPercent:0,opacity:mobile?.16:.42,ease:'none'},0);
   // Lenis is optional, desktop-only. Never smooth touch scrolling on mobile.
   if(!mobile && !window.Lenis){try{await load('https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js');if(window.Lenis){const lenis=new window.Lenis({duration:1.05,smoothWheel:true,syncTouch:false});lenis.on('scroll',ST.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}}catch(_){}}
  }catch(_){if(veil)veil.style.opacity='0';lines.forEach(line=>{line.style.opacity='1';line.style.transform='none'})}
 }
 // Do not delay the existing LCP image. Initialize optional motion after load/idle.
 const launch=()=>{if(!mobile)snow();start()};
 if('requestIdleCallback' in window)requestIdleCallback(launch,{timeout:1600});else setTimeout(launch,350);
})();