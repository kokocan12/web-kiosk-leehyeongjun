import { CategoryTypes } from '@hooks/useCategories';
import { HomeIcon, Logo } from '@icons';
import { useNavigation } from '@lib/router';
import { RefObject } from 'react';

type BannerPropTypes = {
  categoryRef: RefObject<HTMLUListElement>;
  categories: CategoryTypes[];
  category: string;
  onCategoryClick: (categoryId: number) => void;
};

export const Banner = ({
  categoryRef,
  categories,
  category,
  onCategoryClick,
}: BannerPropTypes) => {
  const navigation = useNavigation();

  const onHomeButtonClick = () => {
    navigation.push({ to: '/' });
  };

  return (
    <header className="banner-wrap">
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
      <div className="category-container">
        <ul ref={categoryRef} className="category-wrap">
          {categories?.map((categoryItem) => {
            return (
              <li
                className={`category ${
                  +categoryItem.id === +category ? 'active' : ''
                }`}
                key={categoryItem.id}
              >
                <button
                  className="category-item"
                  onClick={onCategoryClick.bind(null, categoryItem.id)}
                >
                  {categoryItem.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};
