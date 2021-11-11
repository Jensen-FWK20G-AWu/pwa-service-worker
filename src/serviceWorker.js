
self.addEventListener('install', event => {
	// Install-händelsen triggas när vi registrerar en NY service worker-fil (eller ändrad)
	// Här bör vi konfigurera cache
	console.log('SW installed at: ', new Date().toLocaleTimeString());
 });
 
self.addEventListener('activate', event => {
	// Install-händelsen triggas när vi registrerar en NY service worker-fil (eller ändrad)
	// Activate = när service worker startas
	console.log('SW activated at: ', new Date().toLocaleTimeString());
});


self.addEventListener('fetch', event => {
	console.log('Fångade ett request: ', event.request.url);
	// 1. event.respondWith
	// 2. flytta filer till samma mapp som index.html
})