'use client';
import {useState} from 'react';

export default function SearchButton(){
  const [open,setOpen]=useState(false);
  return <div className="header-search">
    <button className="search-toggle" type="button" aria-label={open?'Close search':'Search products'} aria-expanded={open} onClick={()=>setOpen(value=>!value)}>⌕</button>
    {open&&<form className="header-search-form" action="/shop" role="search">
      <input type="search" name="q" placeholder="Search products…" aria-label="Search products" autoFocus required/>
      <button type="submit">Search</button>
    </form>}
  </div>;
}
