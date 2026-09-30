import { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | MessMind`;
    }
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
