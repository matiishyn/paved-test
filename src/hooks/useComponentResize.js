import { useEffect } from 'react';

export const useComponentResize = (componentId, cb) => {
  const observer = new ResizeObserver((entries) => {
    cb(entries);
  });

  useEffect(() => {
    observer.observe(document.getElementById(componentId));

    return () => {
      observer.disconnect();
    };
  }, []);
};
