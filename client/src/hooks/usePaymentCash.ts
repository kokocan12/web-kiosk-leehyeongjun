import { useSyncState } from '@lib/global-state';

export const usePaymentCash = () => {
  const [insertedCash, setInsertedCash] = useSyncState('inserted-cash', 0);

  return { insertedCash, setInsertedCash };
};
