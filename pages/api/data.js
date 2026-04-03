let currentData = {
    status: "Veri bekleniyor...",
    updatedAt: "-",
    stats: {}
};

export default function handler(req, res) {
    // CORS ayarları (Roblox'tan gelen isteklere izin vermek için)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        // Roblox'tan gelen veriyi kaydet
        currentData = {
            status: "Aktif",
            updatedAt: new Date().toLocaleString('tr-TR'),
            stats: req.body
        };
        return res.status(200).json({ success: true });
    } else {
        // Siteye girildiğinde veriyi göster
        return res.status(200).json(currentData);
    }
}
