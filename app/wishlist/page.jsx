'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';

const money=n=>'₹'+Number(n).toLocaleString('en-IN');

export default function Wishlist(){
  const [items,setItems]=useState([]);
  const [toast,setToast]=useState('');
  useEffect(()=>{
    const update=()=>{try{setItems(JSON.parse(localStorage.getItem('vortex_wishlist')||'[]'))}catch{setItems([])}};
    update();window.addEventListener('wishlist-update',update);window.addEventListener('storage',update);
    return()=>{window.removeEventListener('wishlist-update',update);window.removeEventListener('storage',update)};
  },[]);
  function save(next){setItems(next);localStorage.setItem('vortex_wishlist',JSON.stringify(next));window.dispatchEvent(new Event('wishlist-update'))}
  function addToBag(product){
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(entry=>entry.id===product.id);
    if(item)item.quantity++;
    else cart.push({id:product.id,name:product.name,price:product.price,quantity:1,size:'M',color:'Midnight Navy',image:product.image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));window.dispatchEvent(new Event('cart-update'));
    setToast(`${product.name} added to your bag`);setTimeout(()=>setToast(''),1800);
  }
  return <main className="page-shell"><section className="wishlist-page">
    <div className="wishlist-heading"><div><span className="eyebrow dark">SAVED FOR LATER</span><h1>Your wishlist <sup>{items.length}</sup></h1></div><Link className="text-link" href="/shop">← Keep exploring</Link></div>
    {items.length?<div className="product-grid">{items.map(product=><article className="product-card" key={product.id}><div className="product-visual"><Link href={product.href||'/product'} className="product-image"><img src={product.image} width="700" height="850" alt={product.name}/></Link><button className="heart is-wishlisted" aria-label={`Remove ${product.name} from wishlist`} onClick={()=>save(items.filter(item=>item.id!==product.id))}>♥</button></div><div className="product-card-info"><span className="eyebrow dark">{product.category} · {product.audience}</span><h2><Link href={product.href||'/product'}>{product.name}</Link></h2><div className="card-foot"><b>{money(product.price)}</b><button onClick={()=>addToBag(product)}>Add +</button></div><button className="wishlist-remove" onClick={()=>save(items.filter(item=>item.id!==product.id))}>Remove from wishlist</button></div></article>)}</div>:<div className="empty-state"><span>01 / NO SAVED PRODUCTS</span><h2>Your wishlist is waiting.</h2><p>Tap the heart on anything you’d like to keep close.</p><Link className="button dark-button" href="/shop">Explore the collection ↗</Link></div>}
  </section>{toast&&<div className="toast">✓ {toast}</div>}</main>;
}
