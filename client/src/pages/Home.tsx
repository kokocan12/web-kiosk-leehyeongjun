import { Logo } from '@icons';
import { useHomeState } from '@hooks/useHomeState';
import { useLocation } from '@lib/router';

export const Home = () => {
  const {
    logoMoved,
    textVisible,
    isInitialLoaded,
    onOrderClick,
    ANIMATION_DELAY,
  } = useHomeState();

  const location = useLocation();

  return (
    <div className="home">
      <div
        className={`logo-wrap ${isInitialLoaded ? 'fade-in' : ''}`}
        style={
          logoMoved && !textVisible
            ? {
                transform: 'translateY(-5.5rem)',
                transition: `${ANIMATION_DELAY}ms`,
              }
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
          <button
            onClick={onOrderClick}
            disabled={location.pathname !== '/' ? true : false}
            className="btn"
          >
            주문하기
          </button>
        </div>,
      ]}
    </div>
  );
};
