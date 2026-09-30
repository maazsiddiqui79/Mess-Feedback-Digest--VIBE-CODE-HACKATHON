import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop({ scrollContainerId = null }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = scrollContainerId ? document.getElementById(scrollContainerId) : window;
    if (!target && scrollContainerId) return;

    const toggleVisibility = () => {
      const scrollY = scrollContainerId 
        ? (document.getElementById(scrollContainerId)?.scrollTop || 0)
        : (window.pageYOffset || document.documentElement.scrollTop || 0);

      setIsVisible(scrollY > 200);
    };

    if (scrollContainerId) {
      const el = document.getElementById(scrollContainerId);
      el?.addEventListener('scroll', toggleVisibility);
      return () => el?.removeEventListener('scroll', toggleVisibility);
    } else {
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, [scrollContainerId]);

  const scrollToTop = () => {
    if (scrollContainerId) {
      document.getElementById(scrollContainerId)?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      id="back-to-top-btn"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-surface-2/90 border border-border text-primary hover:text-accent hover:border-accent/40 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 group animate-fade-in"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
