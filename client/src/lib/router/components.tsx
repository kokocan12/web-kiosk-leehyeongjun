import React, { useEffect, useRef, useState } from 'react';
import { invariant, queryToString, stringToQuery } from '@lib/utils';
import {
  NavigationContext,
  LocationContext,
  TransitionContext,
  LoadingContext,
} from './context';
import { useLocation, useRouteTransition } from './hooks';

interface RouterProps {
  children?: React.ReactNode;
}

export interface Navigate {
  push: (options: { to: string }) => void;
  replace: (options: { to: string }) => void;
  query: { [key: string]: string };
  changeQuery: (query: { [key: string]: string }) => void;
}

export function Router({ children = null }: RouterProps) {
  const [, setState] = useState({});
  const isLoading = useRef(true);
  const location = window.location;
  const prevPath = useRef<string>(null!);
  const currentRouteNumber = useRef(0);
  const direction = useRef(false);
  const lastURL = useRef<string>(location.pathname);
  const isTransitioning = useRef(false);
  const isPopState = useRef(false);

  const navigate: Navigate = {
    push: ({ to }) => {
      prevPath.current = location.pathname;
      window.history.pushState(null, '', to);
      isLoading.current = true;
      currentRouteNumber.current ^= 1;
      direction.current = true;
      lastURL.current = to;
      isPopState.current = false;
      reload();
    },
    replace: ({ to }) => {
      prevPath.current = location.pathname;
      window.history.replaceState(null, '', to);
      isLoading.current = true;
      currentRouteNumber.current ^= 1;
      direction.current = true;
      lastURL.current = to;
      isPopState.current = false;
      reload();
    },
    query: stringToQuery(location.search),
    changeQuery: (query: { [key: string]: string }) => {
      const currentPath = location.pathname;
      window.history.replaceState(
        null,
        '',
        `${currentPath}${queryToString(query)}`,
      );
      reload();
    },
  };

  const onPopState = (evt: PopStateEvent) => {
    prevPath.current = '';
    isTransitioning.current = false;
    isPopState.current = true;
    // isLoading.current = true;
    // direction.current = false;
    // lastURL.current = location.pathname;
    currentRouteNumber.current ^= 1;

    reload();
  };

  const reload = () => {
    setState({});
  };

  useEffect(() => {
    window.onpopstate = onPopState;
  }, []);

  return (
    <NavigationContext.Provider value={{ navigate }}>
      <LocationContext.Provider value={{ location }}>
        <TransitionContext.Provider
          value={{
            currentRouteNumber: currentRouteNumber.current,
            isLoading,
            prevPath,
            reload,
            direction,
            isTransitioning,
            isPopState,
          }}
        >
          {children}
        </TransitionContext.Provider>
      </LocationContext.Provider>
    </NavigationContext.Provider>
  );
}

interface RoutesProps {
  children?: React.ReactNode;
}

export function Routes({ children }: RoutesProps) {
  const location = useLocation();

  const {
    isLoading,
    reload,
    prevPath,
    currentRouteNumber,
    direction,
    isTransitioning,
    isPopState,
  } = useRouteTransition();

  const routes: [React.ReactElement[], React.ReactElement[]] = [[], []];

  React.Children.forEach(children, (element: React.ReactNode) => {
    if (!React.isValidElement(element)) {
      return;
    }

    if (element.props.path === prevPath.current) {
      routes[currentRouteNumber ^ 1].push(element.props.element);
    }

    if (
      element.props.path === location.pathname ||
      element.props.path === '*'
    ) {
      routes[currentRouteNumber].push(element.props.element);
    }
  });

  const done = () => {
    isTransitioning.current = true;
    isLoading.current = false;
    reload({});
  };

  const onTransitionEnd = () => {
    isTransitioning.current = false;
    reload({});
  };

  const TRANSITION_DURATION = '350ms';

  return (
    <LoadingContext.Provider value={{ done }}>
      {isLoading.current && (
        <div className="loader" key="loading-bar">
          <div className="loading-bar" />
        </div>
      )}
      {isLoading.current
        ? currentRouteNumber === 0
          ? [
              <div
                className={`wrap0 ${direction.current ? 'left-fade-in' : ''}`}
                key="wrap0"
                style={
                  direction.current
                    ? {
                        position: 'fixed',
                        left: '95%',
                        transition: TRANSITION_DURATION,
                        width: '100%',
                      }
                    : {
                        position: 'fixed',
                        zIndex: -1,
                        opacity: 0,
                      }
                }
              >
                {routes[0][0]}
              </div>,
              <div
                className="wrap1"
                key="wrap1"
                style={
                  direction.current
                    ? {
                        position: 'fixed',
                        width: '100%',
                        transition: TRANSITION_DURATION,
                      }
                    : {
                        position: 'fixed',
                        width: '100%',
                        left: '0%',
                        zIndex: 10,
                      }
                }
              >
                {routes[1][0]}
              </div>,
            ]
          : [
              <div
                className="wrap0"
                key="wrap0"
                style={
                  direction.current
                    ? {
                        position: 'fixed',
                        width: '100%',
                        transition: TRANSITION_DURATION,
                      }
                    : {
                        position: 'fixed',
                        width: '100%',
                        left: '0%',
                        zIndex: 10,
                      }
                }
              >
                {routes[0][0]}
              </div>,
              <div
                className={`wrap1 ${direction.current ? 'left-fade-in' : ''}`}
                key="wrap1"
                style={
                  direction.current
                    ? {
                        position: 'fixed',
                        left: '95%',
                        transition: TRANSITION_DURATION,
                      }
                    : {
                        position: 'fixed',
                        zIndex: -1,
                        opacity: 0,
                      }
                }
              >
                {routes[1][0]}
              </div>,
            ]
        : !isPopState.current && isTransitioning.current
        ? currentRouteNumber === 0
          ? [
              <div
                className="wrap0"
                key="wrap0"
                style={{
                  position: 'fixed',
                  left: '0%',
                  transition: TRANSITION_DURATION,
                  width: '100%',
                }}
                onTransitionEnd={onTransitionEnd}
              >
                {routes[0][0]}
              </div>,
              <div
                className="wrap1 fade-out"
                key="wrap1"
                style={{
                  position: 'fixed',
                  width: '100%',
                  transition: TRANSITION_DURATION,
                }}
                onTransitionEnd={onTransitionEnd}
              >
                {routes[1][0]}
              </div>,
            ]
          : [
              <div
                className="wrap0 fade-out"
                key="wrap0"
                style={{
                  position: 'fixed',
                  width: '100%',
                  transition: TRANSITION_DURATION,
                }}
                onTransitionEnd={onTransitionEnd}
              >
                {routes[0][0]}
              </div>,
              <div
                className="wrap1"
                key="wrap1"
                style={{
                  width: '100%',
                  position: 'fixed',
                  left: '0%',
                  transition: TRANSITION_DURATION,
                }}
                onTransitionEnd={onTransitionEnd}
              >
                {routes[1][0]}
              </div>,
            ]
        : currentRouteNumber === 0
        ? [
            <div className="wrap0" key="wrap0">
              {routes[0][0]}
            </div>,
          ]
        : [
            <div className="wrap1" key="wrap1">
              {routes[1][0]}
            </div>,
          ]}
    </LoadingContext.Provider>
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
