'use client';
import {useEffect,useState} from 'react';
export default function CartCount(){const [count,setCount]=useState(0);useEffect(()=>{const update=()=>{try{setCount(JSON.parse(localStorage.getItem('vortex_cart')||'[]').reduce((n,item)=>n+(item.quantity||1),0))}catch{setCount(0)}};update();window.addEventListener('cart-update',update);window.addEventListener('storage',update);return()=>{window.removeEventListener('cart-update',update);window.removeEventListener('storage',update)}},[]);return <b>{count}</b>}
