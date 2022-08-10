import { WidthBoundaryContext } from '@/components/WidthBoundary';
import { useContext } from 'react';

export const useIsMobile = () => {
  const context = useContext(WidthBoundaryContext);

  return context.isMobile;
};
