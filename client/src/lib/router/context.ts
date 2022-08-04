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
