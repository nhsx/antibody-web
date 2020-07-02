/*eslint no-undef: 0*/
self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('New notification', data);
  const options = {
    actions: data.actions,
    body: data.body,
    requireInteraction: true
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow(`/test`);
    notification.close();
  }
});