// Basit bir bellek içi depolama (Vercel serverless olduğu için kalıcı değildir, 
// uzun süreli kullanım için Supabase veya MongoDB öneririm)
let latestData = { status: "Bekleniyor...", value: 0 };

export default function handler(req, res) {
  if (req.method === 'POST') {
    latestData = req.body; // Roblox'tan gelen veriyi al
    return res.status(200).json({ success: true });
  } else {
    // GET isteği atıldığında mevcut veriyi gösterir
    return res.status(200).json(latestData);
  }
}
