// Sunucu tarafında veriyi tutan global değişken
let globalStore = {
    lastUpdate: "Veri bekleniyor...",
    status: "Bağlantı yok",
    payload: {}
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Roblox'tan veri geldiğinde burası çalışır
        globalStore = {
            lastUpdate: new Date().toLocaleTimeString('tr-TR'),
            status: "Aktif",
            payload: req.body
        };
        return res.status(200).json({ success: true });
    } else {
        // Tarayıcıdan siteye girildiğinde mevcut veriyi döner
        return res.status(200).json(globalStore);
    }
}
