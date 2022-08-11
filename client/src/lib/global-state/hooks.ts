import { useLayoutEffect, useState } from 'react';

const globalState = new Map();
const subscribers = new Map();
const fetchDebouncer = new Map();

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
    globalState.set(key, newState);
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
  let data = globalState.get(key);
  let isLoading = data === undefined;

  const revalidate = () => {
    globalState.delete(key);
    fetchData();
  };

  const fetchData = () => {
    clearTimeout(fetchDebouncer.get(key));
    const timer = setTimeout(() => {
      fetcher(key).then((res) => {
        globalState.set(key, res);
        notify();
      });
    });
    fetchDebouncer.set(key, timer);
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
    if (!data) fetchData();

    return () => {
      subscribers.set(
        key,
        subs.filter((item: Function) => item !== setState),
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isLoading, data, revalidate];
}

export { useSyncState, useAsyncState };
