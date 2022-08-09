import { useSyncState } from '@lib/global-state';
import { useNavigation, useRouterLoading } from '@lib/router';
import { useEffect } from 'react';

export const useHomeState = () => {
  const navigation = useNavigation();
  const done = useRouterLoading();

  const [textVisible, setTextVisible] = useSyncState(
    'home-text-visible',
    false,
  );
  const [logoMoved, setLogoMoved] = useSyncState('home-logo-moved', false);

  const [isInitialLoaded, setIsInitialLoaded] = useSyncState(
    'home-initial-load',
    true,
  );

  const onOrderClick = () => {
    navigation.push({ to: '/menu' });
  };

  useEffect(() => {
    done();
    setTimeout(() => {
      setLogoMoved(true);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (logoMoved) {
      setTimeout(() => {
        setTextVisible(true);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoMoved]);

  useEffect(() => {
    if (textVisible) {
      setTimeout(() => {
        setIsInitialLoaded(false);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textVisible]);

  return {
    textVisible,
    setTextVisible,
    logoMoved,
    setLogoMoved,
    isInitialLoaded,
    onOrderClick,
  };
};
