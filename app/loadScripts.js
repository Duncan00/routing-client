export default function loadScripts() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      process.env.GOOGLE_MAP_API_KEY
    }&libraries=places`;

    script.addEventListener('load', () => {
      resolve();
    });

    script.addEventListener('error', e => {
      reject(e);
    });

    document.head.appendChild(script);
  });
}
