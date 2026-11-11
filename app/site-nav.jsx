'use client';
import {useState} from 'react';
import Link from 'next/link';

export default function SiteNav(){
  const [open,setOpen]=useState(false);
  function close(){setOpen(false)}
  return <div className="site-navigation">
    <button className="mobile-menu-toggle" type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={()=>setOpen(value=>!value)}>
      <span aria-hidden="true">{open?'×':'☰'}</span><span className="menu-label">{open?'Close':'Menu'}</span>
    </button>
    <nav id="primary-navigation" className={`primary-nav${open?' is-open':''}`}>
      <Link href="/" onClick={close}>Home</Link><Link href="/shop" onClick={close}>Shop</Link><Link className="nav-new-arrivals" href="/shop?collection=new" onClick={close}>New Arrivals <span>NEW</span></Link>
    </nav>
  </div>;
}
