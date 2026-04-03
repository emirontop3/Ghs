// Sunucu belleğinde veriyi tutmak için (Site uykuya dalana kadar kalır)
let currentData = { 
    status: "Sistem Hazır", 
    lastUpdate: "Veri bekleniyor...", 
    values: {
        elmas: 0,
        coin: "0",
        guc: "0"
    } 
};

export default function handler(req, res) {
    // CORS Başlıkları (Roblox erişimi için şart)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Ön kontrol (Preflight) isteği
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        // Roblox'tan gelen veriyi kaydet
        currentData = {
            status: "Canlı Veri Akışı",
            lastUpdate: new Date().toLocaleTimeString('tr-TR'),
            values: req.body
        };
        return res.status(200).json({ success: true });
    }

    // Siteye girildiğinde (GET) veriyi JSON olarak göster
    return res.status(200).json(currentData);
}
