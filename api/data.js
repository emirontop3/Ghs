let store = { status: "Sistem Hazır", lastUpdate: "Bekleniyor", values: {} };

module.exports = (req, res) => {
    // CORS Ayarları
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        store = {
            status: "Veri Alindi",
            lastUpdate: new Date().toLocaleTimeString('tr-TR'),
            values: req.body
        };
        return res.status(200).json({ success: true });
    }

    return res.status(200).json(store);
};
