import { useSyncState } from '@lib/global-state';

export const Menu = () => {
  const [state, mutate] = useSyncState('count', 0);
  return <h1>Menu{state}</h1>;
};
