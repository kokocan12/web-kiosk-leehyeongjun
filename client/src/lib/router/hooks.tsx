import { useContext } from 'react';
import { LocationContext, NavigationContext } from './context';

export const useLocation = () => {
  const context = useContext(LocationContext);

  return context.location;
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  return context.navigate;
};
