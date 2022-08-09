import { Logo } from '@icons';
import { useMenuState } from '@hooks/useMenuState';

export const Menu = () => {
  const {
    categories,
    onCategoryClick,
    category,
    leftFoods,
    middleFoods,
    rightFoods,
  } = useMenuState();

  return (
    <div className="menu">
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
          <ul className="category-wrap">
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

      <div className="contents-wrap">
        <div className="food-container">
          <div className="food-slide-wrap">
            <ul className="food-list-wrap left">
              {leftFoods.map((foodItem) => {
                return (
                  <li className="food-item" key={foodItem.id}>
                    <span className="food-text">{foodItem.name}</span>
                    <img
                      className="food-img"
                      src={foodItem.imgUrl}
                      alt="food-img"
                    />
                  </li>
                );
              })}
            </ul>
            <ul className="food-list-wrap middle">
              {middleFoods.map((foodItem) => {
                return (
                  <li className="food-item" key={foodItem.id}>
                    <span className="food-text">{foodItem.name}</span>
                    <img
                      className="food-img"
                      src={foodItem.imgUrl}
                      alt="food-img"
                    />
                  </li>
                );
              })}
            </ul>
            <ul className="food-list-wrap right">
              {rightFoods.map((foodItem) => {
                return (
                  <li className="food-item" key={foodItem.id}>
                    <span className="food-text">{foodItem.name}</span>
                    <img
                      className="food-img"
                      src={foodItem.imgUrl}
                      alt="food-img"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
