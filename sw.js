self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'https://www.roblox.com/asset-thumbnail/image?assetId=1818&width=420&height=420&format=png',
        tag: 'roblox-monitor', // Mevcut bildirimi günceller, yeni satır açmaz
        renotify: false,
        silent: true // Sessiz güncelleme
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

