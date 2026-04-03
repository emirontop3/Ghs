// api/data.js
let storage = { 
    status: "Sistem Aktif", 
    lastUpdate: "Veri bekleniyor...", 
    values: {} 
};

export default function handler(req, res) {
    // CORS Başlıkları (Roblox erişimi için şart)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        storage = {
            status: "Veri Alındı",
            lastUpdate: new Date().toLocaleTimeString('tr-TR'),
            values: req.body
        };
        return res.status(200).json({ success: true });
    }

    // GET isteğinde mevcut veriyi göster
    return res.status(200).json(storage);
}
