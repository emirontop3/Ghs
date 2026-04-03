import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // 5 saniyede bir sayfayı yeniler
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#111', color: '#0f0' }}>
      <h1>Roblox Veri Paneli</h1>
      <hr />
      <p><strong>Durum:</strong> {data?.status}</p>
      <p><strong>Son Güncelleme:</strong> {data?.lastUpdate}</p>
      <pre style={{ background: '#222', padding: '10px' }}>
        {JSON.stringify(data?.payload, null, 2)}
      </pre>
    </div>
  );
}
