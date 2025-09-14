import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const [form,setForm]=useState({email:'',password:''});
  const nav = useNavigate();
  const submit=async e=>{
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      if (res.data.role==='SystemAdmin') nav('/admin');
      else if (res.data.role==='StoreOwner') nav('/owner');
      else nav('/stores');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  }
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{width:400}}/></div>
      <div><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{width:400}}/></div>
      <button type="submit">Login</button>
    </form>
  );
}
