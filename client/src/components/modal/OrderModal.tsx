import { useEffect } from 'react';
import { useFoodOptions } from '@hooks/useFoodOptions';
import { useFoods } from '@hooks/useFoods';
import { useIsMobile } from '@hooks/useIsMobile';
import { useOrderModalSlider } from '@hooks/useOrderModalSlider';
import { useOrderModalOptionState } from '@hooks/useOrderModalOptionState';
import { CloseIcon, Minus, Plus } from '@icons';
import { useNavigation } from '@lib/router';
import {
  combineOrder,
  comma,
  orderToCode,
  setBodyOverflowYHidden,
} from '@lib/utils';
import { Dim } from './base/Dim';
import { useShoppingBasketState } from '@hooks/useShoppingBasketState';

export const OrderModal = () => {
  const { data: foods } = useFoods();
  const { data: options } = useFoodOptions();
  const { hash, query, changeQuery } = useNavigation();
  const isMobile = useIsMobile();
  const {
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onTransitionEnd,
    moveY,
    transition,
    DIFF_MAX,
  } = useOrderModalSlider();

  const selectFood = foods?.find((food) => food.id === +hash.order);
  const foodSizeOptions = options?.size[+hash.order];
  const foodTemperatureOptions = options?.temperature[+hash.order];

  const { onCountChangeClick, onOptionChange, order } =
    useOrderModalOptionState(
      selectFood!,
      foodSizeOptions!,
      foodTemperatureOptions!,
    );

  const { orders, setOrders } = useShoppingBasketState();

  const onCloseClick = () => {
    changeQuery(query);
  };

  const onSaveClick = () => {
    const code = orderToCode(order);

    if (orders[code]) {
      const oldOrder = orders[code];
      setOrders({ ...orders, [code]: combineOrder(oldOrder, order) });
    } else {
      setOrders({ ...orders, [code]: order });
    }

    onCloseClick();
  };

  useEffect(() => {
    setBodyOverflowYHidden(true);
    return () => setBodyOverflowYHidden(false);
  }, []);

  if (!selectFood || !foodSizeOptions || !foodTemperatureOptions)
    return <Dim />;

  return (
    <Dim>
      <div
        className={`order-modal-container ${
          isMobile ? 'slide-up' : ''
        } fade-in`}
        onTransitionEnd={onTransitionEnd}
        style={
          isMobile
            ? {
                transform: `translateY(${moveY}px)`,
                ...(transition.current ? { transition: '200ms ease-out' } : {}),
                opacity: !isNaN(moveY / DIFF_MAX) ? 1.2 - moveY / DIFF_MAX : 1,
              }
            : {}
        }
      >
        <div className="head-text-wrap">
          <h1 className="head-text">원하시는 옵션을 선택해주세요.</h1>
          <button onClick={onCloseClick} className="close-btn">
            <img className="close-icon" src={CloseIcon} alt="close-icon" />
          </button>
        </div>
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="img-wrap"
        >
          <img
            className="food-img"
            src={selectFood?.imgUrl}
            alt={selectFood?.name}
          />
        </div>
        <div className="button-wrap">
          <h1 className="button-guide-text">
            {selectFood?.name}({comma(order.eachPrice)})
          </h1>
          <div className="size-wrap">
            {foodSizeOptions?.s && (
              <>
                <input
                  onChange={onOptionChange}
                  value="s"
                  checked={order.options.size === 's'}
                  type="radio"
                  name="size"
                  id={`${hash.order}-s`}
                />
                <label className="btn" htmlFor={`${hash.order}-s`}>
                  작은 것({comma(foodSizeOptions.s)})
                </label>
              </>
            )}
            {foodSizeOptions?.m && (
              <>
                <input
                  onChange={onOptionChange}
                  value="m"
                  checked={order.options.size === 'm'}
                  type="radio"
                  name="size"
                  id={`${hash.order}-m`}
                />
                <label className="btn" htmlFor={`${hash.order}-m`}>
                  중간({comma(foodSizeOptions.m)})
                </label>
              </>
            )}
            {foodSizeOptions?.l && (
              <>
                <input
                  onChange={onOptionChange}
                  value="l"
                  checked={order.options.size === 'l'}
                  type="radio"
                  name="size"
                  id={`${hash.order}-l`}
                />
                <label className="btn" htmlFor={`${hash.order}-l`}>
                  큰 것({comma(foodSizeOptions.l)})
                </label>
              </>
            )}
          </div>
          <div className="temperature-wrap">
            {foodTemperatureOptions?.c && (
              <>
                <input
                  onChange={onOptionChange}
                  value="c"
                  checked={order.options.temperature === 'c'}
                  type="radio"
                  name="temperature"
                  id={`${hash.order}-c`}
                />
                <label className="btn" htmlFor={`${hash.order}-c`}>
                  차갑게({comma(foodTemperatureOptions?.c!)})
                </label>
              </>
            )}
            {foodTemperatureOptions.h && (
              <>
                <input
                  onChange={onOptionChange}
                  value="h"
                  checked={order.options.temperature === 'h'}
                  type="radio"
                  name="temperature"
                  id={`${hash.order}-h`}
                />
                <label className="btn" htmlFor={`${hash.order}-h`}>
                  뜨겁게({comma(foodTemperatureOptions?.h!)})
                </label>
              </>
            )}
          </div>
          <div className="count-wrap">
            <button
              onClick={onCountChangeClick.bind(null, -1)}
              className="count-btn plus-btn"
            >
              <img className="count-icon-img" src={Minus} alt="minus" />
            </button>
            <span className="count-text">{order.unit}</span>
            <button
              onClick={onCountChangeClick.bind(null, 1)}
              className="count-btn minus-btn"
            >
              <img className="count-icon-img" src={Plus} alt="plus" />
            </button>
          </div>

          <div className="save-button-wrap">
            <button onClick={onSaveClick} className="btn save-btn">
              담기
            </button>
          </div>
        </div>
      </div>
    </Dim>
  );
};
