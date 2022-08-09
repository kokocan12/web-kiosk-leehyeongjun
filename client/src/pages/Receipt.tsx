import { useRouterLoading } from '@lib/router';

import { useEffect } from 'react';

export const Receipt = () => {
  const done = useRouterLoading();

  useEffect(() => {
    done();
  }, []);
  return <ul></ul>;
};
