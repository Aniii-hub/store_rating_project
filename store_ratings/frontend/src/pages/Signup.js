import React, { useState } from 'react';
import api from '../api/api';
import { validateSignup } from '../utils/validators';
import { useNavigate } from 'react-router-dom';
export default function Signup(){
  const [form,setForm]=useState({name:'',email:'',address:'',password:''});
  const [errs,setErrs]=useState({});
  const nav = useNavigate();
  const submit=async e=>{
    e.preventDefault();
    const v = validateSignup(form);
    if (Object.keys(v).length) return setErrs(v);
    try { await api.post('/auth/signup', form); alert('Registered — login now'); nav('/login'); }
    catch (err) { alert(err.response?.data?.message || 'Signup failed'); }
  }
  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>
      <div><input placeholder="Name (20-60 chars)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:400}}/></div>
      <div><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{width:400}}/></div>
      <div><input placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} style={{width:400}}/></div>
      <div><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{width:400}}/></div>
      <button type="submit">Signup</button>
      {Object.values(errs).map((x,i)=><div key={i} style={{color:'red'}}>{x}</div>)}
    </form>
  );
}
