import { useSyncState } from '@lib/global-state';
import { useEffect, useRef } from 'react';

export const useHomeState = () => {
  const [textVisible, setTextVisible] = useSyncState(
    'home-text-visible',
    false,
  );
  const [logoMoved, setLogoMoved] = useSyncState('home-logo-moved', false);

  const [isInitialLoaded, setIsInitialLoaded] = useSyncState(
    'home-initial-load',
    true,
  );

  useEffect(() => {
    setTimeout(() => {
      setLogoMoved(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (logoMoved) {
      setTimeout(() => {
        setTextVisible(true);
      }, 1000);
    }
  }, [logoMoved]);

  useEffect(() => {
    if (textVisible) {
      setTimeout(() => {
        setIsInitialLoaded(false);
      }, 1000);
    }
  }, [textVisible]);

  return {
    textVisible,
    setTextVisible,
    logoMoved,
    setLogoMoved,
    isInitialLoaded,
  };
};
