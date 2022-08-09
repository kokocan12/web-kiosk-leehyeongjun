import { isPlainObject } from '@lib/utils';
import { useLayoutEffect, useRef, useState } from 'react';

const globalState = new Map();
const subscribers = new Map();

function useSyncState<T>(key: string, initialState: T) {
  const [, setState] = useState({});

  const oldState = globalState.get(key);
  const currentState =
    oldState !== undefined
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

    notify();
  };

  const notify = () => {
    const subs = subscribers.get(key) as Function[];

    subs.forEach((item) => item({}));
  };

  useLayoutEffect(() => {
    let subs = subscribers.get(key);

    if (!subs) {
      subs = subscribers.set(key, []).get(key);
    }

    subs.push(setState);

    return () => {
      subscribers.set(
        key,
        subs.filter((item: Function) => item !== setState),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, mutate] as [T, (newState: Partial<T>) => void];
}

function useAsyncState<T>(
  key: string,
  fetcher: (key: string) => Promise<T>,
): [isLoading: boolean, data: T | undefined, revalidate: () => void] {
  const [, setState] = useState({});
  const data = useRef(globalState.get(key));
  const isLoading = useRef(data.current === undefined);

  const revalidate = () => {
    globalState.delete(key);
    fetchData();
  };

  const fetchData = () => {
    isLoading.current = true;
    fetcher(key).then((res) => {
      isLoading.current = false;
      globalState.set(key, res);
      data.current = res;
      notify();
    });
  };

  const notify = () => {
    const subs = subscribers.get(key) as Function[];
    subs.forEach((item) => item({}));
  };

  useLayoutEffect(() => {
    let subs = subscribers.get(key);

    if (!subs) {
      subs = subscribers.set(key, []).get(key);
    }

    subs.push(setState);
    if (!data.current) fetchData();

    return () => {
      subscribers.set(
        key,
        subs.filter((item: Function) => item !== setState),
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isLoading.current, data.current, revalidate];
}

export { useSyncState, useAsyncState };
