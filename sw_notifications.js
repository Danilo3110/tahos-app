self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let client of clientList) {
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }

      // If no tab is open, open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(self.location.origin);
      }
    })
  );
});