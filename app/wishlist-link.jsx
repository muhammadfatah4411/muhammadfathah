'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';

export default function WishlistLink(){
  const [count,setCount]=useState(0);
  useEffect(()=>{
    const update=()=>{
      try{setCount(JSON.parse(localStorage.getItem('vortex_wishlist')||'[]').length)}catch{setCount(0)}
    };
    update();
    window.addEventListener('wishlist-update',update);
    window.addEventListener('storage',update);
    return()=>{window.removeEventListener('wishlist-update',update);window.removeEventListener('storage',update)};
  },[]);
  return <Link href="/wishlist" className="wishlist-link" aria-label={`Wishlist${count?`, ${count} saved products`:''}`}><span aria-hidden="true">♡</span>{count>0&&<b>{count}</b>}</Link>;
}
