/* Natal Magico film direction — title masks and shared GSAP scroll rhythm.
   Existing scroll cameras, gift interaction, form and checkout are untouched. */
(()=>{'use strict';
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const saveData=!!navigator.connection?.saveData;
 if(reduce||saveData)return;
 const groups=[
  '.nm-film-portal-title h2',
  '.nm-film-portal-next strong',
  '.story-letter-moment .story-copy h2',
  '.story-noel-moment .story-copy h2',
  '.nm-gift-reveal .nm-gift-copy h2'
 ];
 function splitLines(heading){
   if(heading.dataset.nmSplit==='1')return [];
   const nodes=[...heading.childNodes],rows=[],row=[];
   function commit(){if(row.length){rows.push(row.splice(0));}}
   for(const node of nodes){
     if(node.nodeType===1&&node.tagName==='BR'){commit();node.remove();}
     else row.push(node);
   }
   commit();
   if(rows.length<1)return [];
   const fragment=document.createDocumentFragment(),inner=[];
   for(const parts of rows){
     const outer=document.createElement('span'),span=document.createElement('span');
     outer.className='nm-film-line';span.className='nm-film-line-inner';
     for(const part of parts)span.appendChild(part);
     outer.appendChild(span);fragment.appendChild(outer);inner.push(span);
   }
   heading.appendChild(fragment);heading.dataset.nmSplit='1';
   return inner;
 }
 function start(){
   const gsap=window.gsap,ST=window.ScrollTrigger;
   if(!gsap||!ST)return false;
   gsap.registerPlugin(ST);
   for(const selector of groups){
     const heading=document.querySelector(selector);
     if(!heading)continue;
     const lines=splitLines(heading);
     if(!lines.length)continue;
     const scene=heading.closest('.nm-film-portal,.story-travel,.nm-gift-reveal');
     if(!scene)continue;
     gsap.fromTo(lines,{yPercent:105,opacity:0},{
       yPercent:0,opacity:1,duration:.9,stagger:.13,ease:'power3.out',
       scrollTrigger:{
         trigger:scene,
         start:'top 72%',
         toggleActions:'play none none reverse',
         once:false,
         invalidateOnRefresh:true
       }
     });
   }
   // Only reveal heading lines; do not animate or replace interactive content.
   ST.refresh();
   return true;
 }
 // Reuse the lazy GSAP instance loaded by hero-cinema.js; do not load it twice.
 let tries=0;
 function waitForGSAP(){
   if(start())return;
   if(++tries<35)setTimeout(waitForGSAP,200);
 }
 if(document.readyState==='complete')waitForGSAP();
 else addEventListener('load',waitForGSAP,{once:true});
})();