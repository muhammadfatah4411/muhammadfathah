'use client';
import {useState} from 'react';
import Link from 'next/link';

const beigeImage='/products/hoodie-bewakoof.jpg';
const blackImage='/products/hoodie-black-thcdn.jpg';

export default function HoodieProduct(){
  const [size,setSize]=useState(''),[color,setColor]=useState('Beige'),[quantity,setQuantity]=useState(1),[toast,setToast]=useState('');
  const image=color==='Black'?blackImage:beigeImage;
  function add(){
    if(!size){setToast('Choose a size to continue');return}
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(x=>x.id==='hoodie'&&x.size===size&&x.color===color);
    if(item)item.quantity+=quantity;
    else cart.push({id:'hoodie',name:'Training Hoodie',price:2499,size,color,quantity,image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast('Training Hoodie added to your bag');
    setTimeout(()=>setToast(''),2200);
  }
  return <main className="page-shell">
    <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / Training Hoodie</div>
    <section className="product-layout">
      <div className="main-photo"><img src={image} alt={`${color} oversized hoodie`}/><span className="photo-label">VORTEX / OUTER LAYER 06</span></div>
      <div className="product-info">
        <span className="eyebrow dark">UNISEX · EVERYDAY LAYER</span>
        <h1>Training<br/>Hoodie</h1>
        <div className="product-price">₹2,499 <span>★★★★★ <small>4.8 · 72 reviews</small></span></div>
        <p className="muted">A relaxed oversized hoodie for warm-ups, recovery, and cool-weather days. Soft, easy to layer, and made to move with you.</p>
        <p className="stock"><i/> In stock · Ships within 24 hours</p>
        <div className="choice"><div className="choice-head">Color <b>{color}</b></div><div className="swatches"><button aria-label="Beige" title="Beige" style={{background:'#c9b89d'}} className={color==='Beige'?'active':''} onClick={()=>setColor('Beige')}/><button aria-label="Black" title="Black" style={{background:'#17191b'}} className={color==='Black'?'active':''} onClick={()=>setColor('Black')}/></div></div>
        <div className="choice"><div className="choice-head">Select size</div><div className="sizes">{['S','M','L','XL','XXL'].map(s=><button className={size===s?'active':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div>{toast==='Choose a size to continue'&&<small className="error">Please select a size.</small>}</div>
        <div className="buy-row"><div className="stepper"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}>−</button><b>{quantity}</b><button onClick={()=>setQuantity(Math.min(10,quantity+1))}>＋</button></div><button className="button dark-button grow" onClick={add}>Add to bag <span>↗</span></button></div>
        <Link className="button outline-button full" href="/cart">View bag / checkout</Link>
        <div className="assurances"><span>↗ Free express delivery</span><span>↺ 30-day returns</span><span>◇ 2-year warranty</span></div>
      </div>
    </section>
    {toast&&toast!=='Choose a size to continue'&&<div className="toast">✓ {toast}</div>}
  </main>;
}
