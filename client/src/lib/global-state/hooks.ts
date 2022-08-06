import { isPlainObject } from '@lib/utils';
import { useLayoutEffect, useRef, useState } from 'react';

const globalState = new Map();

function useSyncState<T>(key: string, initialState: T) {
  const [, setState] = useState({});

  const oldState = globalState.get(key);
  const currentState = oldState
    ? oldState
    : (function () {
        globalState.set(key, initialState);
        return initialState;
      })();

  const state = currentState;
  const mutate = (newState: Partial<T>) => {
    if (isPlainObject(state)) {
      globalState.set(key, { ...state, ...newState });
    } else {
      globalState.set(key, newState);
    }

    setState({});
  };

  return [state, mutate] as [T, (newState: Partial<T>) => void];
}

function useAsyncState<T>(
  key: string,
  fetcher: (key: string) => Promise<T>,
): [isLoading: boolean, data: T | undefined, revalidate: () => void] {
  const [data, setData] = useState<T | undefined>(globalState.get(key));
  const isLoading = useRef(data === undefined);

  const revalidate = () => {
    globalState.delete(key);
    fetchData();
  };

  const fetchData = () => {
    isLoading.current = true;
    fetcher(key).then((res) => {
      isLoading.current = false;
      globalState.set(key, res);
      setData(res);
    });
  };

  useLayoutEffect(() => {
    if (!data) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isLoading.current, data, revalidate];
}

export { useSyncState, useAsyncState };
