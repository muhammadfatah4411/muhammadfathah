'use client';
import {useState} from 'react';
import Link from 'next/link';

const image='/products/compression-leggings.jpg';

export default function CompressionLeggingsProduct(){
  const [size,setSize]=useState(''),[quantity,setQuantity]=useState(1),[toast,setToast]=useState('');
  function add(){
    if(!size){setToast('Choose a size to continue');return}
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(x=>x.id==='compression-leggings'&&x.size===size);
    if(item)item.quantity+=quantity;
    else cart.push({id:'compression-leggings',name:'Compression Leggings',price:1799,size,color:'Black / Blue',quantity,image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast('Compression Leggings added to your bag');
    setTimeout(()=>setToast(''),2200);
  }
  return <main className="page-shell">
    <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / Compression Leggings</div>
    <section className="product-layout">
      <div className="main-photo"><img src={image} alt="Black and blue compression leggings"/><span className="photo-label">VORTEX / COMPRESSION 04</span></div>
      <div className="product-info">
        <span className="eyebrow dark">WOMEN’S TRAINING · SUPPORTIVE FIT</span>
        <h1>Compression<br/>Leggings</h1>
        <div className="product-price">₹1,799 <span>★★★★★ <small>4.8 · 91 reviews</small></span></div>
        <p className="muted">Supportive compression leggings designed to stay in place through every rep, run, and stretch. Flexible fabric moves comfortably with you.</p>
        <p className="stock"><i/> In stock · Ships within 24 hours</p>
        <div className="choice"><div className="choice-head">Color <b>Black / Blue</b></div><div className="swatches"><button aria-label="Black and blue" title="Black / Blue" style={{background:'linear-gradient(135deg,#171a20 50%,#587b9b 50%)'}} className="active"/></div></div>
        <div className="choice"><div className="choice-head">Select size</div><div className="sizes">{['XS','S','M','L','XL','XXL'].map(s=><button className={size===s?'active':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div>{toast==='Choose a size to continue'&&<small className="error">Please select a size.</small>}</div>
        <div className="buy-row"><div className="stepper"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><b>{quantity}</b><button onClick={()=>setQuantity(Math.min(10,quantity+1))}>＋</button></div><button className="button dark-button grow" onClick={add}>Add to bag <span>↗</span></button></div>
        <Link className="button outline-button full" href="/cart">View bag / checkout</Link>
        <div className="assurances"><span>↗ Free express delivery</span><span>↺ 30-day returns</span><span>◇ 2-year warranty</span></div>
      </div>
    </section>
    {toast&&toast!=='Choose a size to continue'&&<div className="toast">✓ {toast}</div>}
  </main>;
}
