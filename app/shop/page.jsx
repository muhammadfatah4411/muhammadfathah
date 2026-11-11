'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import {useGsapReveal} from '../gsap-animations';

const products=[
  ['Performance Training T-Shirt','Tees & Tanks','Men',1198,'/products/training-tee.svg?v=2',true],
  ['Essential Oversized Tee','Tees & Tanks','Unisex',1499,'/products/oversized-tee-nobero.jpg',true,'/product/oversized-tee'],
  ['Flex Training Shorts','Bottoms','Men',1299,'/products/training-shorts-men.jpg',true,'/product/training-shorts'],
  ['Compression Leggings','Compression','Women',1799,'/products/compression-leggings.jpg',true,'/product/compression-leggings'],
  ['Performance Joggers','Bottoms','Unisex',1999,'https://nobero.com/cdn/shop/files/0_a2068f84-c7a5-4dec-8b9e-180906f633b9.jpg?v=1786086850',true,'/product/joggers'],
  ['Training Hoodie','Outerwear','Unisex',2499,'/products/hoodie-bewakoof.jpg',true,'/product/hoodie'],
  ['Apex Velocity Trainer','Footwear','Unisex',3499,'/products/velocity-trainer.jpg',true,'/product/velocity-trainer'],
  ['Seamless Gym Tank','Tees & Tanks','Men',899,'/products/gym-tank-shopify.jpg',false,'/product/gym-tank'],
];

export default function Shop(){
  const pageRef=useRef(null);
  const [category,setCategory]=useState('All');
  const [max,setMax]=useState(5000);
  const [sort,setSort]=useState('Featured');
  const [query,setQuery]=useState('');
  const [audience,setAudience]=useState('all');
  const [collection,setCollection]=useState('all');
  const [wishlist,setWishlist]=useState([]);
  const [toast,setToast]=useState('');
  useEffect(()=>{const params=new URLSearchParams(window.location.search);setQuery(params.get('q')||'');setAudience(params.get('audience')||'all');setCollection(params.get('collection')||'all')},[]);
  useEffect(()=>{
    const update=()=>{try{setWishlist(JSON.parse(localStorage.getItem('vortex_wishlist')||'[]'))}catch{setWishlist([])}};
    update();window.addEventListener('wishlist-update',update);window.addEventListener('storage',update);
    return()=>{window.removeEventListener('wishlist-update',update);window.removeEventListener('storage',update)};
  },[]);
  const shown=useMemo(()=>{
    const needle=query.trim().toLowerCase();
    const matchesAudience=product=>audience==='men'?product[2]==='Men'||product[2]==='Unisex':audience==='women'?product[2]==='Women'||product[2]==='Unisex':audience==='women-only'?product[2]==='Women':true;
    let list=products.filter(p=>(category==='All'||p[1]===category)&&p[3]<=max&&matchesAudience(p)&&(collection!=='new'||p[5])&&(!needle||`${p[0]} ${p[1]} ${p[2]}`.toLowerCase().includes(needle)));
    if(sort==='Price: low to high')list.sort((a,b)=>a[3]-b[3]);
    if(sort==='Price: high to low')list.sort((a,b)=>b[3]-a[3]);
    return list;
  },[audience,category,collection,max,query,sort]);
  useGsapReveal(pageRef,shown.map(product=>product[0]).join('|'));
  function add(p){
    let cart=JSON.parse(localStorage.getItem('vortex_cart')||'[]');
    let old=cart.find(x=>x.id===p[0]);
    old?old.quantity++:cart.push({id:p[0],name:p[0],price:p[3],quantity:1,size:'M',color:'Midnight Navy',image:p[4]});
    localStorage.setItem('vortex_cart',JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-update'));
    setToast(`${p[0]} added to your bag`);
    setTimeout(()=>setToast(''),1800);
  }
  function toggleWishlist(p){
    const id=p[0],productHref=p[6]||'/product';
    const exists=wishlist.some(item=>item.id===id);
    const next=exists?wishlist.filter(item=>item.id!==id):[...wishlist,{id,name:p[0],category:p[1],audience:p[2],price:p[3],image:p[4],href:productHref}];
    setWishlist(next);localStorage.setItem('vortex_wishlist',JSON.stringify(next));window.dispatchEvent(new Event('wishlist-update'));
    setToast(exists?'Removed from your wishlist':`${p[0]} saved to your wishlist`);setTimeout(()=>setToast(''),1600);
  }
  return <main ref={pageRef} className="page-shell">
    <div className="shop-intro"><div><span className="eyebrow dark">{collection==='new'?'THE LATEST DROP':'THE VORTEX KIT'}</span><h1>{collection==='new'?'New Arrivals':audience==='women-only'?'Women’s collection':audience==='men'?'Men’s training':audience==='women'?'Women’s studio':'All performance gear'}</h1><p>{query?`Search results for “${query}”`:collection==='new'?'Fresh gear, just added to the collection.':audience==='women-only'?'Training and studio gear designed for women.':audience==='men'?'Men’s and unisex training gear.':audience==='women'?'Women’s and unisex studio gear.':audience==='both'?'Everyday layers for men and women.':'Technical layers for every kind of effort. Find your next go-to.'}</p></div><div className="sort-tools"><span>{shown.length} {query?'results':collection==='new'?'new drops':'pieces'}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select></div></div>
    <div className="catalog"><aside className="filters"><div className="filter-title">Filter the edit <button onClick={()=>{setCategory('All');setMax(5000);setQuery('');setAudience('all');setCollection('all');window.history.replaceState(null,'','/shop')}}>Reset</button></div><h3>Category</h3>{['All','Tees & Tanks','Bottoms','Compression','Outerwear','Footwear'].map(c=><button className={category===c?'filter-active':''} key={c} onClick={()=>setCategory(c)}>{c}</button>)}<h3>Maximum price</h3><input type="range" min="500" max="5000" step="100" value={max} onChange={e=>setMax(+e.target.value)}/><p>Up to ₹{max.toLocaleString('en-IN')}</p><h3>Always included</h3><p className="muted">Free express shipping<br/>30-day easy returns</p></aside>
      <div className="product-grid">{shown.length?shown.map(p=>{const productHref=p[6]||'/product',isSaved=wishlist.some(item=>item.id===p[0]);return <article className="product-card" key={p[0]}><div className="product-visual"><Link href={productHref} className="product-image"><img src={p[4]} width="700" height="850" alt={p[0]}/>{p[5]&&<span className="badge">NEW DROP</span>}</Link><button className={`heart${isSaved?' is-wishlisted':''}`} aria-label={isSaved?`Remove ${p[0]} from wishlist`:`Add ${p[0]} to wishlist`} aria-pressed={isSaved} onClick={()=>toggleWishlist(p)}>{isSaved?'♥':'♡'}</button></div><div className="product-card-info"><span className="eyebrow dark">{p[1]} · {p[2]}</span><h2><Link href={productHref}>{p[0]}</Link></h2><div className="card-foot"><b>₹{p[3].toLocaleString('en-IN')}</b><button onClick={()=>add(p)}>Add +</button></div></div></article>}):<div className="empty-search"><span className="eyebrow dark">NO MATCHES</span><h2>No products found</h2><p>Try another name, category, or search term.</p></div>}</div>
    </div>{toast&&<div className="toast">✓ {toast}</div>}
  </main>;
}
