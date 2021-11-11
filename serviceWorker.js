const CACHE_NAME = 'v1'

self.addEventListener('install', event => {
	// Install-händelsen triggas när vi registrerar en NY service worker-fil (eller ändrad)
	// Här bör vi konfigurera cache
	console.log('SW installed at: ', new Date().toLocaleTimeString());

	// Dessa filer ska alltid cachas, oberoende av om användaren behöver dem eller inte
	const defaultFiles = ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg/800px-Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hydropotes_inermis_male.JPG/1024px-Hydropotes_inermis_male.JPG']
	event.waitUntil(caches.open(CACHE_NAME).then(cache => {
		return cache.addAll(defaultFiles)
	}))
 });
 
self.addEventListener('activate', event => {
	// Install-händelsen triggas när vi registrerar en NY service worker-fil (eller ändrad)
	// Activate = när service worker startas
	console.log('SW activated at: ', new Date().toLocaleTimeString());
});


self.addEventListener('fetch', event => {
	console.log('Fångade ett request: ', event.request.url);

	// API gets special treatment
	if( event.request.url.includes('simple.php') ) {
		event.respondWith(new Response('<h1>This API is not allowed anymore</h1> <p>Try something else! </p>', 
			{ headers: { 'Content-Type': 'text/html' } } ));
		return
	}

	// Om det inte är ett API request - använda cache
	if( navigator.onLine ) {
		event.respondWith(fetch(event.request).then(response => {
			let clone = response.clone()
			caches.open(CACHE_NAME).then(cache => {
				cache.put(event.request, clone)
			})
			return response
		}))
		
	} else {
		// Kolla om det som vi ska hämta finns i webbläsarens cache
		event.respondWith(caches.match(event.request).then(response => {
			if( response ) {
				return response
			}
			return null  // kanske bättre att returnera en standardbild?
		}))
	}
})
