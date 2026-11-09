/* Cinematic scroll direction: layered, reversible, reduced-motion safe. */
(function(){
 'use strict';
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 var nodes=Array.prototype.slice.call(document.querySelectorAll('#kit,#pacotes,#personalizar,#duvidas,.story-travel,.nm-gift-reveal'));
 nodes.forEach(function(node){node.classList.add('nm-scroll-chapter');});
 var scenes=Array.prototype.slice.call(document.querySelectorAll('.story-travel'));
 var progressTrack=document.createElement('div');
 progressTrack.className='nm-film-progress';
 progressTrack.setAttribute('aria-hidden','true');
 progressTrack.innerHTML='<span class="nm-film-progress-fill"></span>';
 document.body.appendChild(progressTrack);
 var filmFill=progressTrack.firstElementChild;
 var chapters=[{node:document.querySelector('.scroll-journey'),label:'A oficina'},{node:document.querySelector('.nm-film-portal'),label:'A viagem'},{node:document.querySelector('.story-letter-moment'),label:'A carta'},{node:document.querySelector('#kit'),label:'A surpresa'},{node:document.querySelector('.story-noel-moment'),label:'Papai Noel'},{node:document.querySelector('.nm-gift-reveal'),label:'O presente'},{node:document.querySelector('#personalizar'),label:'Sua criação'}].filter(function(item){return !!item.node;});
 var filmLabel=document.createElement('div');
 filmLabel.className='nm-film-chapter';
 filmLabel.setAttribute('aria-hidden','true');
 filmLabel.innerHTML='<span class="nm-film-chapter-index">01 / 06</span><span class="nm-film-chapter-name">A oficina</span>';
 document.body.appendChild(filmLabel);
 var lastChapter=-1;
 var busy=false;
 var mobileMotion=window.matchMedia('(max-width:700px)').matches;
 var lastPaint=0;
 var reduceData=!!(navigator.connection&&navigator.connection.saveData);
 var filmVeil=document.createElement('div');
 filmVeil.className='nm-film-cut';
 filmVeil.setAttribute('aria-hidden','true');
 document.body.appendChild(filmVeil);
 var sceneEls=scenes.map(function(scene){return {node:scene,frame:scene.querySelector('.story-frame')};});
 var portal=document.querySelector('.nm-film-portal');
 var gift=document.querySelector('.nm-gift-reveal');
 var hero=document.querySelector('.scroll-journey');
 var previousScroll=window.scrollY;
 var motionEase=0;
 function clamp(v){return Math.max(0,Math.min(1,v));}
 function smooth(v){v=clamp(v);return v*v*(3-2*v);}
 function render(){
  busy=false;
  lastPaint=performance.now();
  var h=window.innerHeight||700;
  var total=Math.max(1,document.documentElement.scrollHeight-h);
  var global=clamp(window.scrollY/total);
  filmFill.style.transform='scaleX('+global.toFixed(4)+')';
  var current=0;
  for(var ci=0;ci<chapters.length;ci++){
   if(chapters[ci].node.getBoundingClientRect().top<=h*.55)current=ci;
  }
  if(current!==lastChapter){
   lastChapter=current;
   filmLabel.querySelector('.nm-film-chapter-index').textContent=String(current+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');
   filmLabel.querySelector('.nm-film-chapter-name').textContent=chapters[current].label;
  }
  filmLabel.classList.toggle('is-visible',window.scrollY>h*.65);

  nodes.forEach(function(node){
   var r=node.getBoundingClientRect();
   if(r.bottom < -h || r.top > h*1.5)return;
   var p=clamp((h-r.top)/Math.max(h,r.height));
   node.style.setProperty('--nm-p',p.toFixed(3));
   node.style.setProperty('--nm-entrance',smooth(clamp((h-r.top)/(h*.75))).toFixed(3));
  });
  if(hero){
   var hr=hero.getBoundingClientRect();
   var hp=clamp(-hr.top/Math.max(1,hr.height-h));
   hero.style.setProperty('--nm-hero-film',hp.toFixed(4));
  }
  if(portal){
   var pr=portal.getBoundingClientRect();
   if(pr.bottom>=-h&&pr.top<=h*1.5){
    var pp=clamp(-pr.top/Math.max(1,pr.height-h));
    var cut=smooth(clamp((pp-.3)/.46));
    var first=1-smooth(clamp((pp-.16)/.25));
    var last=smooth(clamp((pp-.63)/.25));
    portal.style.setProperty('--nm-portal-p',pp.toFixed(4));
    portal.style.setProperty('--nm-portal-cut',cut.toFixed(4));
    portal.style.setProperty('--nm-portal-first',first.toFixed(4));
    portal.style.setProperty('--nm-portal-last',last.toFixed(4));
   }
  }
  var veilOpacity=0;
  if(portal){
   var vr=portal.getBoundingClientRect();
   var vp=clamp(-vr.top/Math.max(1,vr.height-h));
   veilOpacity=Math.max(veilOpacity,.76*Math.pow(Math.max(0,1-Math.abs(vp-.53)/.18),2));
  }
  filmVeil.style.opacity=veilOpacity.toFixed(3);
  if(gift){
   var gr=gift.getBoundingClientRect();
   if(gr.bottom>=-h&&gr.top<=h*1.5){
    var gp=smooth(clamp(-gr.top/Math.max(1,gr.height-h)));
    gift.style.setProperty('--nm-gift-p',gp.toFixed(3));
    gift.style.setProperty('--nm-gift-entry',smooth(clamp(gp/.32)).toFixed(3));
   }
  }
  sceneEls.forEach(function(item){
   var scene=item.node;
   var r=scene.getBoundingClientRect();
   if(r.bottom < -h || r.top > h*1.5)return;
   var progress=smooth(clamp(-r.top/Math.max(1,r.height-h)));
   scene.style.setProperty('--story-scale',(1.14-.14*progress).toFixed(3));
   scene.style.setProperty('--nm-story-shift',Math.round((1-progress)*34)+'px');
   scene.style.setProperty('--nm-story-opacity',(0.65+0.35*progress).toFixed(3));
   scene.style.setProperty('--nm-scene-p',progress.toFixed(3));
   scene.style.setProperty('--nm-scene-y',Math.round((.5-progress)*32)+'px');
   scene.style.setProperty('--nm-scene-veil',(.2*(1-progress)).toFixed(3));
   scene.style.setProperty('--nm-scene-entry',smooth(clamp(progress/.24)).toFixed(3));
   scene.style.setProperty('--nm-scene-exit',smooth(clamp((1-progress)/.22)).toFixed(3));
   scene.style.setProperty('--nm-film-fade-in',smooth(clamp(progress/.17)).toFixed(3));
   scene.style.setProperty('--nm-film-fade-out',smooth(clamp((1-progress)/.18)).toFixed(3));
   scene.style.setProperty('--nm-film-camera',(1.08+.14*progress).toFixed(4));
   scene.style.setProperty('--nm-film-title',smooth(clamp((progress-.12)/.28)).toFixed(3));
  });
 }
 function schedule(){
  if(busy)return;
  busy=true;
  var delay=mobileMotion?Math.max(0,33-(performance.now()-lastPaint)):0;
  if(delay)setTimeout(function(){requestAnimationFrame(render);},delay);
  else requestAnimationFrame(render);
 }
 if(reduceData){document.documentElement.classList.add('nm-lite-motion');}
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule);
 document.addEventListener('visibilitychange',function(){if(!document.hidden)schedule();});
 render();
})();
