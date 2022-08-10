import { useFoodOptions } from '@hooks/useFoodOptions';
import { useFoods } from '@hooks/useFoods';
import { useIsMobile } from '@hooks/useIsMobile';
import { Minus, Plus } from '@icons';
import { useNavigation } from '@lib/router';
import { comma, setBodyOverflowYHidden } from '@lib/utils';
import { useEffect } from 'react';
import { Dim } from './base/Dim';

export const OrderModal = () => {
  const { data: foods } = useFoods();
  const { data: options } = useFoodOptions();
  const { hash } = useNavigation();
  const isMobile = useIsMobile();

  const selectFood = foods?.find((food) => food.id === +hash.order);
  const foodSizeOptions = options?.size[+hash.order];
  const foodTemperatureOptions = options?.temperature[+hash.order];

  useEffect(() => {
    setBodyOverflowYHidden(true);

    return () => setBodyOverflowYHidden(false);
  }, []);

  if (!selectFood) return <Dim />;

  return (
    <Dim>
      <div
        className={`order-modal-container ${
          isMobile ? 'slide-up' : ''
        } fade-in`}
      >
        <h1 className="head-text">원하시는 옵션을 선택해주세요.</h1>
        <div className="img-wrap">
          <img
            className="food-img"
            src={selectFood?.imgUrl}
            alt={selectFood?.name}
          />
        </div>
        <div className="button-wrap">
          <h1 className="button-guide-text">
            {selectFood?.name}({comma(selectFood?.basePrice!)})
          </h1>
          <div className="size-wrap">
            {foodSizeOptions?.s && (
              <>
                <input type="radio" name="size" id={`${hash.order}-s`} />
                <label className="btn" htmlFor={`${hash.order}-s`}>
                  작은 것({comma(foodSizeOptions.s)})
                </label>
              </>
            )}
            {foodSizeOptions?.m && (
              <>
                <input type="radio" name="size" id={`${hash.order}-m`} />
                <label className="btn" htmlFor={`${hash.order}-m`}>
                  중간({comma(foodSizeOptions.m)})
                </label>
              </>
            )}
            {foodSizeOptions?.l && (
              <>
                <input type="radio" name="size" id={`${hash.order}-l`} />
                <label className="btn" htmlFor={`${hash.order}-l`}>
                  큰 것({comma(foodSizeOptions.l)})
                </label>
              </>
            )}
          </div>
          <div className="temperature-wrap">
            {foodSizeOptions?.s && (
              <>
                <input type="radio" name="temperature" id={`${hash.order}-c`} />
                <label className="btn" htmlFor={`${hash.order}-c`}>
                  차가운 음료({comma(foodTemperatureOptions?.c!)})
                </label>
              </>
            )}
            {foodSizeOptions?.m && (
              <>
                <input type="radio" name="temperature" id={`${hash.order}-h`} />
                <label className="btn" htmlFor={`${hash.order}-h`}>
                  뜨거운 음료({comma(foodTemperatureOptions?.h!)})
                </label>
              </>
            )}
          </div>
          <div className="count-wrap">
            <button className="count-btn plus-btn">
              <img className="count-icon-img" src={Minus} alt="minus" />
            </button>
            <span className="count-text">{0}</span>
            <button className="count-btn minus-btn">
              <img className="count-icon-img" src={Plus} alt="plus" />
            </button>
          </div>

          <div className="save-button-wrap">
            <button className="btn save-btn">담기</button>
          </div>
        </div>
      </div>
    </Dim>
  );
};
