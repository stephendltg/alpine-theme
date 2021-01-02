importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);
if (workbox) {
  console.log(`Great ! Workbox is loaded 🎉`);
  
  workbox.routing.registerRoute(
    /\.(?:html|js|css|png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.StaleWhileRevalidate()
  );
}
