let currentData = { 
    status: "Sistem Hazır", 
    lastUpdate: "-", 
    values: {} 
};

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        currentData = {
            status: "Bağlantı Aktif",
            lastUpdate: new Date().toLocaleTimeString('tr-TR'),
            values: req.body
        };
        return res.status(200).json({ success: true });
    }

    return res.status(200).json(currentData);
}
