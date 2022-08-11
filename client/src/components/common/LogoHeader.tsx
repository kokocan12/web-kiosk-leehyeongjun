import { useNavigation } from '@lib/router';
import { HomeIcon, Logo } from '@icons';

export const LogoHeader = () => {
  const navigation = useNavigation();

  const onHomeButtonClick = () => {
    navigation.push({ to: '/' });
  };

  return (
    <div className="banner">
      <div className="icon-wrap">
        <img className="icon-img" src={Logo} alt="logo" />
      </div>
      <div className="text-wrap">
        <span className="text">COFFEE</span>
        <span className="text">KING</span>
      </div>
      <button onClick={onHomeButtonClick} className="home-icon-wrap">
        <img className="home-icon-img" src={HomeIcon} alt="home-icon" />
      </button>
    </div>
  );
};
