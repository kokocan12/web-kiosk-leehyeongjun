import { useAsyncState } from '@/lib/global-state';

(window as any).randomData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function fetcher() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((window as any).randomData);
    }, 3000);
  }) as unknown as Promise<number[]>;
}

export function useTodoList() {
  const [isLoading, data, revalidate] = useAsyncState('todo', fetcher);

  return { isLoading, data, revalidate };
}
