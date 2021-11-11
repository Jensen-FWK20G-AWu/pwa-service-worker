
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

	if( !navigator.onLine ) {
		// Offline-läge, svara på alla request med cachad resurs om den finns
		event.respondWith(new Response('<h1>Sorry, you are offline</h1> <p>Wait for while and try again </p>', 
			{ headers: { 'Content-Type': 'text/html' } } ));
		return;
	}
	
	if( event.request.url.includes('simple.php') ) {
		event.respondWith(new Response('<h1>This API is not allowed anymore</h1> <p>Try something else! </p>', 
			{ headers: { 'Content-Type': 'text/html' } } ));
	} else {
		event.respondWith( fetch(event.request) )
	}
})
