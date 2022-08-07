import React, { useEffect, useState } from 'react';
import { invariant } from '@lib/utils';
import { NavigationContext, LocationContext } from './context';
import { useLocation } from './hooks';

interface RouterProps {
  children?: React.ReactNode;
}

export interface Navigate {
  push: (options: { to: string }) => void;
  replace: (options: { to: string }) => void;
}

export function Router({ children = null }: RouterProps) {
  const [_, setState] = useState({});

  const navigate: Navigate = {
    push: ({ to }) => {
      window.history.pushState(null, '', to);
      setState({});
    },
    replace: ({ to }) => {
      window.history.replaceState(null, '', to);
      setState({});
    },
  };
  const location = window.location;

  const onPopState = (evt: PopStateEvent) => {
    setState({});
  };

  useEffect(() => {
    window.onpopstate = onPopState;
  }, []);

  return (
    <NavigationContext.Provider value={{ navigate }}>
      <LocationContext.Provider value={{ location }} children={children} />
    </NavigationContext.Provider>
  );
}

interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export function Route(props: RouteProps): React.ReactElement | null {
  invariant(true, '<Route> should be used as the child of <Routes>');

  return null;
}

interface RoutesProps {
  children?: React.ReactNode;
}

export function Routes({ children }: RoutesProps) {
  const location = useLocation();
  let routes: React.ReactElement[] = [];

  React.Children.forEach(children, (element: React.ReactNode) => {
    if (!React.isValidElement(element)) {
      return;
    }

    if (
      element.props.path === location.pathname ||
      element.props.path === '*'
    ) {
      routes.push(element.props.element);
    }
  });

  return routes[0];
}
