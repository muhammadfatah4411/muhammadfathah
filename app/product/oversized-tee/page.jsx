'use client';
import {useState} from 'react';
import Link from 'next/link';

const image='/products/oversized-tee-nobero.jpg';

export default function OversizedTeeProduct(){
  const [size,setSize]=useState(''),[quantity,setQuantity]=useState(1),[toast,setToast]=useState('');
  function add(){
    if(!size){setToast('Choose a size to continue');return}
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(x=>x.id==='oversized-tee'&&x.size===size);
    if(item)item.quantity+=quantity;
    else cart.push({id:'oversized-tee',name:'Essential Oversized Tee',price:1499,size,color:'Black',quantity,image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast('Essential Oversized Tee added to your bag');
    setTimeout(()=>setToast(''),2200);
  }
  return <main className="page-shell">
    <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / Essential Oversized Tee</div>
    <section className="product-layout">
      <div className="main-photo"><img src={image} alt="Essential oversized T-shirt"/><span className="photo-label">VORTEX / EVERYDAY 02</span></div>
      <div className="product-info">
        <span className="eyebrow dark">UNISEX · EVERYDAY ESSENTIAL</span>
        <h1>Essential<br/>Oversized Tee</h1>
        <div className="product-price">₹1,499 <span>★★★★★ <small>4.8 · 94 reviews</small></span></div>
        <p className="muted">A relaxed, easy-wearing tee with a roomy silhouette for everyday comfort, warm-ups, and post-session plans.</p>
        <p className="stock"><i/> In stock · Ships within 24 hours</p>
        <div className="choice"><div className="choice-head">Color <b>Black</b></div><div className="swatches"><button aria-label="Black" title="Black" style={{background:'#17191b'}} className="active"/></div></div>
        <div className="choice"><div className="choice-head">Select size</div><div className="sizes">{['S','M','L','XL','XXL'].map(s=><button className={size===s?'active':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div>{toast==='Choose a size to continue'&&<small className="error">Please select a size.</small>}</div>
        <div className="buy-row"><div className="stepper"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><b>{quantity}</b><button onClick={()=>setQuantity(Math.min(10,quantity+1))}>＋</button></div><button className="button dark-button grow" onClick={add}>Add to bag <span>↗</span></button></div>
        <Link className="button outline-button full" href="/cart">View bag / checkout</Link>
        <div className="assurances"><span>↗ Free express delivery</span><span>↺ 30-day returns</span><span>◇ 2-year warranty</span></div>
      </div>
    </section>
    {toast&&toast!=='Choose a size to continue'&&<div className="toast">✓ {toast}</div>}
  </main>;
}
