import React, { useEffect, useState } from 'react';
import { Logo } from '@icons';
import { useNavigation } from '@lib/router';

export const Home = () => {
  const navigation = useNavigation();
  const [textVisible, setTextVisible] = useState(false);
  const [logoMoved, setLogoMoved] = useState(false);

  const onOrderClick = () => {
    navigation.push({ to: '/menu' });
  };

  useEffect(() => {
    setTimeout(() => {
      setLogoMoved(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (logoMoved) {
      setTimeout(() => {
        setTextVisible(true);
      }, 1000);
    }
  }, [logoMoved]);

  return (
    <div id="home">
      <div
        className="logo-wrap fade-in"
        style={
          logoMoved && !textVisible
            ? { transform: 'translateY(-8.5rem)', transition: '1s' }
            : {}
        }
      >
        <img className="logo" src={Logo} alt="logo" />
      </div>
      {textVisible && [
        <div className="text-wrap fade-in">
          <span className="logo-text">COFFEE</span>
          <span className="logo-text">KING</span>
        </div>,
        <div className="button-wrap fade-in">
          <button onClick={onOrderClick} className="btn">
            주문하기
          </button>
        </div>,
      ]}
    </div>
  );
};
