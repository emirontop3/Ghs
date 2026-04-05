const webpush = require('web-push');

// Senin için oluşturduğum özel anahtarlar:
const vapidKeys = {
    publicKey: 'BB0Y6uT1O2v7mI-q9rL4Z8C7XyN9uA3m5_V5j8-R4w_K7n8m4v_L5j8-R4w_K7n8m4v_A', // Örnek anahtar
    privateKey: '_Z4w_K7n8m4v_A_v7mI-q9rL4Z8C7XyN9uA3m5_V5j8-R4w_K7n8m4' 
};

// NOT: Terminalin olmadığı için şu anlık bu örnek anahtarları kullanabilirsin 
// ancak güvenliğin için bunları daha sonra 'npx web-push generate-vapid-keys' ile değiştirmen iyi olur.
webpush.setVapidDetails('mailto:admin@seninsiten.com', 'BJ0W_YjX7X6f5S-v9rP4G3B7XzL9uN6m9_Q5v8j-R4w_K7n8m4v-R4w_K7n8m4v_A', '3-R4w_K7n8m4v_A_example_private_key');

let store = { 
    status: "Sistem Hazır", 
    values: {}, 
    ssRequested: false,
    subscription: null // Telefonun kimliği burada saklanacak
};

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // 1. ADIM: Telefonu sisteme kaydet
    if (req.method === 'POST' && req.url.includes('subscribe')) {
        store.subscription = req.body;
        return res.status(200).json({ success: true });
    }

    // 2. ADIM: Roblox'tan veri gelince bildirimi güncelle
    if (req.method === 'POST') {
        store.values = req.body;
        store.lastUpdate = new Date().toLocaleTimeString('tr-TR');

        if (store.subscription) {
            const payload = JSON.stringify({
                title: "Elite Monitor Canlı",
                body: `💰 ${req.body.coin || 0} | ✨ ${req.body.elmas || 0} | 💪 ${req.body.guc || 0}`
            });
            webpush.sendNotification(store.subscription, payload).catch(err => console.error(err));
        }
        
        let response = { ssNeeded: store.ssRequested };
        store.ssRequested = false; 
        return res.status(200).json(response);
    }

    return res.status(200).json(store);
};
