import { invariant } from '@lib/utils';
import { useContext } from 'react';
import {
  LoadingContext,
  LocationContext,
  NavigationContext,
  TransitionContext,
} from './context';

export const useLocation = () => {
  const context = useContext(LocationContext);

  invariant(
    !context,
    'Component is not child of <Router>, if you want to use useLocation hook, place component into <Router> ',
  );

  return context.location;
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  invariant(
    !context,
    'Component is not child of <Router>, if you want to use useNavigation hook, place component into <Router> ',
  );

  return context.navigate;
};

export const useRouteTransition = () => {
  const context = useContext(TransitionContext);

  invariant(
    !context,
    'Component is not child of <Router>, if you want to use useTransition hook, place component into <Router> ',
  );

  return context;
};

export const useRouterLoading = () => {
  const context = useContext(LoadingContext);
  invariant(
    !context,
    'Component is not child of <Router>, if you want to use useRouterLoading hook, place component into <Router> ',
  );

  return context.done;
};
