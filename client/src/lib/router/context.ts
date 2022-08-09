import React from 'react';
import { Navigate } from './components';

interface NavigationContextTypes {
  navigate: Navigate;
}

export const NavigationContext = React.createContext<NavigationContextTypes>(
  null!,
);

interface LocationContextTypes {
  location: Location;
}

export const LocationContext = React.createContext<LocationContextTypes>(null!);

interface TransitionContextTypes {
  prevPath: React.MutableRefObject<string>;
  isLoading: React.MutableRefObject<boolean>;
  reload: Function;
  currentRouteNumber: number;
  direction: React.MutableRefObject<boolean>;
  isTransitioning: React.MutableRefObject<boolean>;
  isPopState: React.MutableRefObject<boolean>;
}

export const TransitionContext = React.createContext<TransitionContextTypes>(
  null!,
);

interface LoadingContextTypes {
  done: Function;
}

export const LoadingContext = React.createContext<LoadingContextTypes>(null!);
