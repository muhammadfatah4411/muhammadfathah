'use client';
import {useEffect,useState} from 'react';

const seenKey='vortex_membership_popup_seen';
const joinUrl='https://wa.me/917511153509?text='+encodeURIComponent('Hi Vortex Athletics, I’d like to join the membership list so I don’t miss new drops and offers.');

export default function MembershipPopup(){
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    if(sessionStorage.getItem(seenKey))return;
    const timer=setTimeout(()=>{
      sessionStorage.setItem(seenKey,'1');
      setOpen(true);
    },30000);
    return()=>clearTimeout(timer);
  },[]);
  useEffect(()=>{
    if(!open)return;
    const closeOnEscape=event=>{if(event.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',closeOnEscape);
    return()=>window.removeEventListener('keydown',closeOnEscape);
  },[open]);
  if(!open)return null;
  return <div className="membership-backdrop" onClick={()=>setOpen(false)}>
    <section className="membership-dialog" role="dialog" aria-modal="true" aria-labelledby="membership-title" onClick={event=>event.stopPropagation()}>
      <button className="membership-close" type="button" aria-label="Close membership invitation" onClick={()=>setOpen(false)}>×</button>
      <span className="eyebrow dark">VORTEX CLUB · MEMBER ACCESS</span>
      <div className="membership-mark" aria-hidden="true">V</div>
      <h2 id="membership-title">Good gear.<br/><em>First dibs.</em></h2>
      <p>Join Vortex Club to hear about new drops and member offers before they’re gone.</p>
      <a className="button coral full" href={joinUrl} target="_blank" rel="noopener noreferrer">Join on WhatsApp ↗</a>
      <button className="membership-later" type="button" onClick={()=>setOpen(false)}>Maybe later</button>
    </section>
  </div>;
}
