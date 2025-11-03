import { useEffect } from 'react';

// Dynamically inject Persian fonts (Vazirmatn + Shabnam) without touching index.html
export default function FontLoader() {
  useEffect(() => {
    const links = [];

    // Vazirmatn (Google Fonts)
    const vazirmatnPreconnect1 = document.createElement('link');
    vazirmatnPreconnect1.rel = 'preconnect';
    vazirmatnPreconnect1.href = 'https://fonts.googleapis.com';

    const vazirmatnPreconnect2 = document.createElement('link');
    vazirmatnPreconnect2.rel = 'preconnect';
    vazirmatnPreconnect2.href = 'https://fonts.gstatic.com';
    vazirmatnPreconnect2.crossOrigin = 'anonymous';

    const vazirmatnLink = document.createElement('link');
    vazirmatnLink.rel = 'stylesheet';
    vazirmatnLink.href = 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@200;300;400;500;600;700;800;900&display=swap';

    // Shabnam (JSDelivr CDN)
    const shabnamLink = document.createElement('link');
    shabnamLink.rel = 'stylesheet';
    shabnamLink.href = 'https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.1/dist/font-face.css';

    links.push(vazirmatnPreconnect1, vazirmatnPreconnect2, vazirmatnLink, shabnamLink);
    links.forEach((l) => document.head.appendChild(l));

    return () => {
      links.forEach((l) => {
        try { document.head.removeChild(l); } catch (_) {}
      });
    };
  }, []);

  return null;
}
