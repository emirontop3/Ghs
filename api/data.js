let store = { 
    status: "Sistem Hazır", 
    values: {}, 
    pets: [], // Pet listesi için yeni alan
    ssRequested: false 
};

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET' && req.query.action === 'requestSS') {
        store.ssRequested = true;
        return res.status(200).json({ message: "SS İsteği Gönderildi" });
    }

    if (req.method === 'POST') {
        // Gelen veride pets varsa onu ayır, geri kalanı values'a at
        if (req.body.pets) {
            store.pets = req.body.pets;
            delete req.body.pets;
        }
        store.values = req.body;
        store.lastUpdate = new Date().toLocaleTimeString('tr-TR');
        
        let response = { ssNeeded: store.ssRequested };
        store.ssRequested = false; 
        return res.status(200).json(response);
    }

    return res.status(200).json(store);
};
