import React, { useEffect, useState } from 'react';
import { Logo } from '@icons';
import { useNavigation, useRouterLoading } from '@lib/router';
import { useHomeState } from '@hooks/useHomeState';

export const Home = () => {
  const navigation = useNavigation();
  const { logoMoved, textVisible, isInitialLoaded } = useHomeState();
  const done = useRouterLoading();
  const onOrderClick = () => {
    navigation.push({ to: '/menu' });
  };

  useEffect(() => {
    console.log('home mount');
    done();
  }, []);

  return (
    <div className="home">
      <div
        className={`logo-wrap ${isInitialLoaded ? 'fade-in' : ''}`}
        style={
          logoMoved && !textVisible
            ? { transform: 'translateY(-8.5rem)', transition: '1s' }
            : {}
        }
      >
        <img className="logo" src={Logo} alt="logo" />
      </div>
      {textVisible && [
        <div
          key="text-wrap"
          className={`text-wrap ${isInitialLoaded ? 'fade-in' : ''}`}
        >
          <span className="logo-text">COFFEE</span>
          <span className="logo-text">KING</span>
        </div>,
        <div
          key="button-wrap"
          className={`button-wrap ${isInitialLoaded ? 'fade-in' : ''}`}
        >
          <button onClick={onOrderClick} className="btn">
            주문하기
          </button>
        </div>,
      ]}
    </div>
  );
};
