import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };
    getData();
    const timer = setInterval(getData, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#00ff00', minHeight: '100vh', padding: '40px', fontFamily: 'Courier New' }}>
      <h1 style={{ borderBottom: '2px solid #00ff00' }}>ELITE MONITORING SYSTEM</h1>
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #333' }}>
        <p><strong>DURUM:</strong> {data?.status}</p>
        <p><strong>SON GÜNCELLEME:</strong> {data?.updatedAt}</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>GELEN VERİLER:</h3>
        <pre style={{ background: '#1a1a1a', padding: '20px', borderRadius: '5px', overflowX: 'auto' }}>
          {JSON.stringify(data?.stats, null, 4)}
        </pre>
      </div>
    </div>
  );
}
