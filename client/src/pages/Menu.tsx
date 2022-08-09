import { useNavigation, useRouterLoading } from '@lib/router';
import { useEffect } from 'react';

export const Menu = () => {
  const navigation = useNavigation();
  const onClickButton = () => {
    navigation.replace({ to: '/receipt' });
  };
  const done = useRouterLoading();

  useEffect(() => {
    setTimeout(() => {
      done();
    }, 2000);
  }, []);

  return (
    <div>
      <h1>menu</h1>
      <button onClick={onClickButton}>home</button>
    </div>
  );
};
