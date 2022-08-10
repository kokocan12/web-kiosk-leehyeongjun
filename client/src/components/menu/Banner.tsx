import { CategoryTypes } from '@hooks/useCategories';
import { Logo } from '@icons';
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
