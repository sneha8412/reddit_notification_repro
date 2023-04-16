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

    // Send Push Notificationfrom web debug tools
    /*
    for (let i = 0; i < 3; i++) {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        reg.showNotification("hello", {
          "title": "unRAID:",
          "options": {
            "body": "Anyone else having (slight) UI problems with 6.12 in FireFox?",
            "icon": "https://external-preview.redd.it/mfZaKwUbd8yEj6R5x8zd-XEfcr-3skpU69-5_fAd6bA.jpg?width=1080&crop=smart&auto=webp&s=4e7d41b1da3be3c638fd8b416e78584a61b43b9a",
            "data": {
              "link": "https://www.reddit.com/r/unRAID/comments/11wvgts/anyone_else_having_slight_ui_problems_with_612_in/",
              "correlation_id": "8fc732ec-e996-42c0-a9be-0725e3d3e607",
              "message_type": "lifecycle_post_suggestions",
              "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e",
              "auto_dismiss_options": {
                "behavior": "timed",
                "dismiss_time_ms": 25000
              }
            }
          },
          "data": {
            "extra_payload_fields": {
              "subreddit_id": "t5_2sn94",
              "post_id": "t3_11wvgts",
              "is_persisted": true,
              "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e"
            }
          }
        });
      })
    }*/