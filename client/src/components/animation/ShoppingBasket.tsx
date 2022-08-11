import { useShoppingBasketState } from '@hooks/useShoppingBasketState';
import { HotIcon, ShoppingCloseIcon, SnowIcon } from '@icons';
import { useLocation, useNavigation } from '@lib/router';
import { isEmptyObject } from '@lib/utils';

const activeMenus = ['/menu', '/payment'];

export const ShoppingBasket = () => {
  const { hash, push } = useNavigation();
  const location = useLocation();

  const { restCount, orders, setOrders, itemListRef } =
    useShoppingBasketState();

  const onCancelClick = () => {
    setOrders({});
  };

  const onItemDeleteClick = (key: string) => {
    const newOrders: { [key: string]: any } = {};

    for (const item in orders) {
      if (item !== key) newOrders[item] = orders[key];
    }

    setOrders(newOrders);
  };

  const onClickPayment = () => {
    push({ to: '/payment' });
  };

  if (
    hash.order ||
    activeMenus.includes(location.pathname) === false ||
    isEmptyObject(orders)
  )
    return <></>;

  return (
    <div className="shopping-basket-wrap fade-in">
      <div className="food-list-wrap" ref={itemListRef}>
        {Object.entries(orders).map(([key, val]) => {
          return (
            <div key={key} className="food-item-wrap">
              <img className="food-item-img" src={val.imgUrl} alt="img-url" />
              <span className="abs count-text">{val.unit}</span>
              {val.options.temperature === 'c' && (
                <span className="abs temper">
                  <img className="cool-img" src={SnowIcon} alt="cool" />
                </span>
              )}
              {val.options.temperature === 'h' && (
                <span className="abs temper">
                  <img className="hot-img" src={HotIcon} alt="hot" />
                </span>
              )}

              <span className="abs size">{val.options.size.toUpperCase()}</span>
              <button
                onClick={onItemDeleteClick.bind(null, key)}
                className="abs delete-button"
              >
                <img
                  className="delete-icon-img"
                  src={ShoppingCloseIcon}
                  alt="shopping-close-icon"
                />
              </button>
            </div>
          );
        })}
      </div>
      <div className="timer-wrap">
        <span className={`timer-text ${restCount < 5 ? 'highlight' : ''}`}>
          {restCount}s
        </span>
      </div>
      <div className="button-wrap">
        <button className="btn cancel-btn" onClick={onCancelClick}>
          전체취소
        </button>
        <button
          className="btn payment-btn"
          disabled={location.pathname !== '/menu' ? true : false}
          onClick={onClickPayment}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};
