import React, { useEffect, useState } from 'react';
import api from '../api/api';
export default function UserDashboard(){
  const [stores,setStores]=useState([]);
  const [q,setQ]=useState('');
  useEffect(()=>{ load(); },[]);
  async function load(){ const res = await api.get('/stores'); setStores(res.data); }
  async function submitRating(storeId, value){ try { await api.post(`/stores/${storeId}/ratings`, { value }); alert('Rating submitted/updated'); load(); } catch (err) { alert(err.response?.data?.message || 'Rating failed'); } }
  return (
    <div>
      <h2>Stores</h2>
      <div>
        <input placeholder="Search name / address" value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={()=>api.get('/stores',{params:{q}}).then(r=>setStores(r.data))}>Search</button>
        <button onClick={load}>Clear</button>
      </div>
      <ul>
        {stores.map(s=> (
          <li key={s.id} style={{padding:'8px',borderBottom:'1px solid #ddd'}}>
            <div><b>{s.name}</b> — {s.address}</div>
            <div>Avg rating: {s.rating ?? 'N/A'}</div>
            <div>
              Rate:
              {[1,2,3,4,5].map(n=> <button key={n} onClick={()=>submitRating(s.id,n)} style={{marginLeft:6}}>{n}</button>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
