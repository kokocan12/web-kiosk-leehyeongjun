import { CategoryTypes } from '@hooks/useCategories';

import { RefObject } from 'react';
import { LogoHeader } from '@components';

type BannerPropTypes = {
  categoryRef: RefObject<HTMLUListElement>;
  categories: CategoryTypes[];
  category: string;
  onCategoryClick: (categoryId: number) => void;
};

export const Header = ({
  categoryRef,
  categories,
  category,
  onCategoryClick,
}: BannerPropTypes) => {
  return (
    <header className="banner-wrap">
      <LogoHeader />
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
