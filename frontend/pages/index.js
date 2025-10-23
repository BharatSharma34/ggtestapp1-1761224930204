import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract app name from URL path
  const getAppName = () => {
    // Example URL: /apps/ggtestapp1-1761224930204
    const pathParts = window.location.pathname.split('/');
    const appsIndex = pathParts.indexOf('apps');
    if (appsIndex !== -1 && pathParts.length > appsIndex + 1) {
      return pathParts[appsIndex + 1];
    }
    return null;
  };

  const fetchData = async () => {
    const appName = getAppName();
    if (!appName) {
      console.error('App name not found in URL');
      setLoading(false);
      return;
    }

    try {
      // Call backend via proxy-router path
      const res = await axios.get(`/apps/${appName}/api/health`);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ggTestApp1</h1>
      <p>testing</p>
      <hr style={{ margin: '2rem 0' }} />
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Failed to load data</p>
      )}
    </div>
  );
}
