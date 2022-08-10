import React, { useRef, useState } from 'react';
import { CategoryTypes } from '@hooks/useCategories';
import { useNavigation } from '@lib/router';
import { getSideCategories, setBodyOverflowYHidden } from '@lib/utils';

export const useFoodListSlider = (
  categories: CategoryTypes[],
  currentCategory: string,
) => {
  const DIFF_MAX = Math.min(document.body.clientWidth, 800);
  const touchStartX = useRef<number>(0);
  const touchStartTimestamp = useRef<number>(0);
  const transition = useRef(false);
  const [moveX, setMoveX] = useState(0);
  const { changeQuery, query } = useNavigation();

  const onTouchStart = (evt: React.TouchEvent) => {
    touchStartX.current = evt.touches[0].clientX;
    transition.current = false;
    touchStartTimestamp.current = new Date().valueOf();
    setBodyOverflowYHidden(true);
  };

  const onTouchMove = (evt: React.TouchEvent) => {
    const currentX = evt.touches[0].clientX;
    const diff = currentX - touchStartX.current;

    if (diff > 0 && Math.abs(diff) > DIFF_MAX) {
      setMoveX(DIFF_MAX);
    } else if (diff < 0 && Math.abs(diff) > DIFF_MAX) {
      setMoveX(-1 * DIFF_MAX);
    } else {
      setMoveX(diff);
    }
  };

  const onTouchEnd = () => {
    const timestamp = new Date().valueOf();
    transition.current = true;
    const MAX_INTERVAL = 300;
    const diff = timestamp - touchStartTimestamp.current;

    if (diff <= MAX_INTERVAL) {
      if (moveX > 0) {
        setMoveX(DIFF_MAX);
      } else if (moveX < 0) {
        setMoveX(-1 * DIFF_MAX);
      }
      return;
    }

    if (Math.abs(moveX) > DIFF_MAX / 2) {
      moveX > 0 ? setMoveX(DIFF_MAX) : setMoveX(-1 * DIFF_MAX);
    } else {
      setMoveX(0);
    }
  };

  const onTransitionEnd = () => {
    const [leftCategory, rightCategory] = getSideCategories(
      categories,
      +currentCategory,
    );

    if (moveX >= DIFF_MAX) {
      query.category = leftCategory + '';
    } else if (moveX <= -1 * DIFF_MAX) {
      query.category = rightCategory + '';
    }

    setBodyOverflowYHidden(false);
    transition.current = false;
    changeQuery(query);
    setMoveX(0);
  };

  return {
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onTransitionEnd,
    moveX,
    transition,
  };
};
