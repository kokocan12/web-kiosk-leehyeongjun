import React, { useLayoutEffect, useRef, useState } from 'react';

type WidthBoundaryContextTypes = {
  isMobile: boolean;
};

export const WidthBoundaryContext =
  React.createContext<WidthBoundaryContextTypes>(null!);

export const WidthBoundary = ({ children }: { children: React.ReactNode }) => {
  const [clientWidth, setClientWidth] = useState(document.body.clientWidth);

  const [loading, setLoading] = useState(false);

  const resizeDebounceRef = useRef<any>(null);

  const onResize = () => {
    clearTimeout(resizeDebounceRef.current);
    setLoading(true);

    resizeDebounceRef.current = setTimeout(() => {
      setLoading(false);
      setClientWidth(document.body.clientWidth);
    }, 300);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (loading) {
    return (
      <div className="width-boundary-wrap">
        <h1 className="width-boundary-text">화면 조정중....@@</h1>
      </div>
    );
  }

  return (
    <WidthBoundaryContext.Provider value={{ isMobile: clientWidth <= 800 }}>
      {children}
    </WidthBoundaryContext.Provider>
  );
};
