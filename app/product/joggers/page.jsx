'use client';
import {useState} from 'react';
import Link from 'next/link';

const image='https://nobero.com/cdn/shop/files/0_a2068f84-c7a5-4dec-8b9e-180906f633b9.jpg?v=1786086850';
const money=n=>'₹'+Number(n).toLocaleString('en-IN');

export default function JoggersProduct(){
  const [size,setSize]=useState(''),[quantity,setQuantity]=useState(1),[toast,setToast]=useState('');
  function add(){
    if(!size){setToast('Choose a size to continue');return}
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(x=>x.id==='joggers'&&x.size===size);
    if(item)item.quantity+=quantity;
    else cart.push({id:'joggers',name:'Performance Joggers',price:1999,size,color:'Charcoal',quantity,image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast('Performance Joggers added to your bag');
    setTimeout(()=>setToast(''),2200);
  }
  return <main className="page-shell">
    <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / Performance Joggers</div>
    <section className="product-layout">
      <div className="main-photo"><img src={image} alt="Performance joggers"/><span className="photo-label">VORTEX / EVERYDAY 05</span></div>
      <div className="product-info">
        <span className="eyebrow dark">UNISEX · EVERYDAY TRAINING</span>
        <h1>Performance<br/>Joggers</h1>
        <div className="product-price">₹1,999 <span>★★★★★ <small>4.8 · 86 reviews</small></span></div>
        <p className="muted">Made for warm-ups, cool-downs, and everything in between. A versatile tapered fit with room to move and a clean everyday feel.</p>
        <p className="stock"><i/> In stock · Ships within 24 hours</p>
        <div className="choice"><div className="choice-head">Color <b>Charcoal</b></div><div className="swatches"><button aria-label="Charcoal" title="Charcoal" style={{background:'#353c3b'}} className="active"/></div></div>
        <div className="choice"><div className="choice-head">Select size</div><div className="sizes">{['S','M','L','XL','XXL'].map(s=><button className={size===s?'active':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div>{toast==='Choose a size to continue'&&<small className="error">Please select a size.</small>}</div>
        <div className="buy-row"><div className="stepper"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><b>{quantity}</b><button onClick={()=>setQuantity(Math.min(10,quantity+1))}>＋</button></div><button className="button dark-button grow" onClick={add}>Add to bag <span>↗</span></button></div>
        <Link className="button outline-button full" href="/cart">View bag / checkout</Link>
        <div className="assurances"><span>↗ Free express delivery</span><span>↺ 30-day returns</span><span>◇ 2-year warranty</span></div>
      </div>
    </section>
    {toast&&toast!=='Choose a size to continue'&&<div className="toast">✓ {toast}</div>}
  </main>;
}
