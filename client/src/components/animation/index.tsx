import { Loader } from './Loader';
import { MainLogo } from './MainLogo';
import { ShoppingBasket } from './ShoppingBasket';

const AnimationLayer = () => {
  return (
    <div className="animation-layer">
      <MainLogo key="main-logo" />
      <ShoppingBasket />
      <Loader />
    </div>
  );
};

export default AnimationLayer;
