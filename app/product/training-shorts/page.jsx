'use client';
import {useState} from 'react';
import Link from 'next/link';

const image='/products/training-shorts-men.jpg';

export default function TrainingShortsProduct(){
  const [size,setSize]=useState(''),[quantity,setQuantity]=useState(1),[toast,setToast]=useState('');
  function add(){
    if(!size){setToast('Choose a size to continue');return}
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(x=>x.id==='training-shorts'&&x.size===size);
    if(item)item.quantity+=quantity;
    else cart.push({id:'training-shorts',name:'Men’s Flex Training Shorts',price:1299,size,color:'Black',quantity,image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast('Training Shorts added to your bag');
    setTimeout(()=>setToast(''),2200);
  }
  return <main className="page-shell">
    <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / Men’s Flex Training Shorts</div>
    <section className="product-layout">
      <div className="main-photo"><img src={image} alt="Men’s training shorts"/><span className="photo-label">VORTEX / TRAINING 03</span></div>
      <div className="product-info">
        <span className="eyebrow dark">MEN’S TRAINING · LIGHTWEIGHT</span>
        <h1>Flex Training<br/>Shorts</h1>
        <div className="product-price">₹1,299 <span>★★★★★ <small>4.8 · 64 reviews</small></span></div>
        <p className="muted">Lightweight training shorts designed for unrestricted movement through runs, lifts, and high-intensity sessions.</p>
        <p className="stock"><i/> In stock · Ships within 24 hours</p>
        <div className="choice"><div className="choice-head">Color <b>Black</b></div><div className="swatches"><button aria-label="Black" title="Black" style={{background:'#191b1d'}} className="active"/></div></div>
        <div className="choice"><div className="choice-head">Select size</div><div className="sizes">{['S','M','L','XL','XXL'].map(s=><button className={size===s?'active':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div>{toast==='Choose a size to continue'&&<small className="error">Please select a size.</small>}</div>
        <div className="buy-row"><div className="stepper"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><b>{quantity}</b><button onClick={()=>setQuantity(Math.min(10,quantity+1))}>＋</button></div><button className="button dark-button grow" onClick={add}>Add to bag <span>↗</span></button></div>
        <Link className="button outline-button full" href="/cart">View bag / checkout</Link>
        <div className="assurances"><span>↗ Free express delivery</span><span>↺ 30-day returns</span><span>◇ 2-year warranty</span></div>
      </div>
    </section>
    {toast&&toast!=='Choose a size to continue'&&<div className="toast">✓ {toast}</div>}
  </main>;
}
