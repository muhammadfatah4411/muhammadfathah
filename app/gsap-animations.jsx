'use client';
import {useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(scopeRef,refreshKey=''){
  useEffect(()=>{
    const root=scopeRef.current;
    if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const context=gsap.context(()=>{
      const heroItems=gsap.utils.toArray('.hero-copy > *');
      if(heroItems.length)gsap.from(heroItems,{y:24,opacity:0,duration:.7,ease:'power3.out',stagger:.12});
      const heroIndex=root.querySelector('.hero-index');
      if(heroIndex)gsap.from(heroIndex,{x:18,opacity:0,duration:.6,delay:.45,ease:'power2.out'});

      gsap.utils.toArray('.section-head, .shop-intro, .filters, .feature-band > div, .feature-band > img, .benefits span').forEach(element=>{
        gsap.from(element,{y:22,opacity:0,duration:.65,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 90%',once:true}});
      });
      gsap.utils.toArray('.category-card, .product-card').forEach(element=>{
        gsap.from(element,{y:20,opacity:0,duration:.55,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 92%',once:true}});
      });
    },root);
    return()=>context.revert();
  },[scopeRef,refreshKey]);
}
