'use client';
import {useState} from 'react';
import Link from 'next/link';

const image='/products/training-tee.svg?v=2';

export default function Product(){
  const [size,setSize]=useState(''),[color,setColor]=useState('Midnight Navy'),[qty,setQty]=useState(1),[modal,setModal]=useState(false),[toast,setToast]=useState('');
  function add(){
    if(!size){setToast('Choose a size to continue');return}
    const cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    const item=cart.find(x=>x.id==='tee'&&x.size===size&&x.color===color);
    if(item)item.quantity+=qty;
    else cart.push({id:'tee',name:'Performance Training T-Shirt',price:1198,size,color,quantity:qty,image});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast('Added to your bag');
    setTimeout(()=>setToast(''),2200);
  }
  return <main className="page-shell">
    <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / Performance Training T-Shirt</div>
    <section className="product-layout">
      <div className="main-photo"><img src={image} alt="Performance training T-shirt"/><span className="photo-label">VORTEX / TRAINING 01</span></div>
      <div className="product-info">
        <span className="eyebrow dark">MEN’S TRAINING · BESTSELLER</span>
        <h1>Performance<br/>Training T-Shirt</h1>
        <div className="product-price">₹1,198 <span>★★★★★ <small>4.9 · 128 reviews</small></span></div>
        <p className="muted">Lightweight, breathable, and ready for high output. A technical training tee built for unrestricted movement from warm-up to last rep.</p>
        <p className="stock"><i/> In stock · Ships within 24 hours</p>
        <div className="choice"><div className="choice-head">Color <b>{color}</b></div><div className="swatches">{[['Midnight Navy','#001322'],['Soft Blue','#bde6f4'],['Charcoal','#2d3133']].map(([name,swatch])=><button aria-label={name} title={name} style={{background:swatch}} className={color===name?'active':''} onClick={()=>setColor(name)} key={name}/>)}</div></div>
        <div className="choice"><div className="choice-head">Select size <button className="text-link" onClick={()=>setModal(true)}>Size guide ↗</button></div><div className="sizes">{['XS','S','M','L','XL','XXL'].map(value=><button className={size===value?'active':''} onClick={()=>setSize(value)} key={value}>{value}</button>)}</div>{toast==='Choose a size to continue'&&<small className="error">Please select a size.</small>}</div>
        <div className="buy-row"><div className="stepper"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(Math.min(10,qty+1))}>＋</button></div><button className="button dark-button grow" onClick={add}>Add to bag <span>↗</span></button></div>
        <Link className="button outline-button full" href="/cart">View bag / checkout</Link>
        <div className="assurances"><span>↗ Free express delivery</span><span>↺ 30-day returns</span><span>◇ 2-year warranty</span></div>
      </div>
    </section>
    {modal&&<div className="modal-backdrop" onClick={()=>setModal(false)}><div className="size-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setModal(false)}>×</button><span className="eyebrow dark">FIT NOTES</span><h2>Find your size</h2><p className="muted">Designed for an athletic, true-to-size fit. Between sizes? Choose the larger size for a relaxed feel.</p><table><tbody>{[['XS','34–36″','27″'],['S','36–38″','28″'],['M','38–40″','29″'],['L','40–42″','30″'],['XL','42–44″','31″'],['XXL','44–46″','32″']].map(row=><tr key={row[0]}>{row.map(value=><td key={value}>{value}</td>)}</tr>)}</tbody></table><button className="button dark-button full" onClick={()=>setModal(false)}>Got it</button></div></div>}
    {toast&&toast!=='Choose a size to continue'&&<div className="toast">✓ {toast}</div>}
  </main>;
}
