import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => {
    try { const res = await axios.get('/api/health'); setData(res.data); } 
    catch (err) { console.error(err); } finally { setLoading(false); }
  };
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ggTestApp1</h1>
      <p>testing</p>
      <hr style={{ margin: '2rem 0' }} />
      {loading ? <p>Loading...</p> : <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}