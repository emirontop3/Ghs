let currentData = { status: "Bekleniyor", values: {} };

export default function handler(req, res) {
    // CORS Ayarları (Roblox'un erişebilmesi için şart)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        currentData = {
            updatedAt: new Date().toLocaleTimeString('tr-TR'),
            values: req.body
        };
        return res.status(200).json({ success: true });
    } 

    // GET isteğinde veriyi döndür
    res.status(200).json(currentData);
}
