'use client';
import {useState} from 'react';
import Link from 'next/link';

const image='/products/velocity-trainer.jpg';

export default function VelocityTrainerProduct(){
  const [size,setSize]=useState(''),[quantity,setQuantity]=useState(1),[toast,setToast]=useState('');
  function add(){
    if(!size){setToast('Choose a size to continue');return}
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(x=>x.id==='velocity-trainer'&&x.size===size);
    if(item)item.quantity+=quantity;
    else cart.push({id:'velocity-trainer',name:'Apex Velocity Trainer',price:3499,size,color:'Black',quantity,image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast('Apex Velocity Trainer added to your bag');
    setTimeout(()=>setToast(''),2200);
  }
  return <main className="page-shell">
    <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / Apex Velocity Trainer</div>
    <section className="product-layout">
      <div className="main-photo"><img src={image} alt="Black Apex Velocity training shoe"/><span className="photo-label">VORTEX / VELOCITY 07</span></div>
      <div className="product-info">
        <span className="eyebrow dark">UNISEX · TRAINING FOOTWEAR</span>
        <h1>Apex Velocity<br/>Trainer</h1>
        <div className="product-price">₹3,499 <span>★★★★★ <small>4.8 · 58 reviews</small></span></div>
        <p className="muted">A lightweight trainer with a secure lace-up fit and grippy sole for gym circuits, studio sessions, and everyday movement.</p>
        <p className="stock"><i/> In stock · Ships within 24 hours</p>
        <div className="choice"><div className="choice-head">Color <b>Black</b></div><div className="swatches"><button aria-label="Black" title="Black" style={{background:'#242629'}} className="active"/></div></div>
        <div className="choice"><div className="choice-head">Select shoe size</div><div className="sizes">{['6','7','8','9','10','11'].map(s=><button className={size===s?'active':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div>{toast==='Choose a size to continue'&&<small className="error">Please select a size.</small>}</div>
        <div className="buy-row"><div className="stepper"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><b>{quantity}</b><button onClick={()=>setQuantity(Math.min(10,quantity+1))}>＋</button></div><button className="button dark-button grow" onClick={add}>Add to bag <span>↗</span></button></div>
        <Link className="button outline-button full" href="/cart">View bag / checkout</Link>
        <div className="assurances"><span>↗ Free express delivery</span><span>↺ 30-day returns</span><span>◇ 2-year warranty</span></div>
      </div>
    </section>
    {toast&&toast!=='Choose a size to continue'&&<div className="toast">✓ {toast}</div>}
  </main>;
}
