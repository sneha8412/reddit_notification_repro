		// Check if service workers are supported
		if ('serviceWorker' in navigator) {
			// Register the service worker
			navigator.serviceWorker.register('sw.js')
				.then(function(registration) {
					console.log('Service worker registered:', registration);
				})
				.catch(function(error) {
					console.log('Service worker registration failed:', error);
				});
		}