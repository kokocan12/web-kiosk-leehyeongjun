import { useNavigation } from '@lib/router';
import { useRef, useState } from 'react';

export const useOrderModalSlider = () => {
  const transition = useRef(false);
  const [moveY, setMoveY] = useState(0);
  const DIFF_MAX = document.body.clientHeight;
  const touchStartY = useRef<number>(0);
  const touchStartTimestamp = useRef<number>(0);
  const { query, changeQuery } = useNavigation();

  const onTouchStart = (evt: React.TouchEvent) => {
    touchStartY.current = evt.touches[0].clientY;
    touchStartTimestamp.current = new Date().valueOf();
  };

  const onTouchMove = (evt: React.TouchEvent) => {
    const currentY = evt.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    transition.current = false;

    if (diff > 0) {
      setMoveY(diff);
    }
  };

  const onTouchEnd = () => {
    const timestamp = new Date().valueOf();
    transition.current = true;
    const MAX_INTERVAL = 300;
    const timeDiff = timestamp - touchStartTimestamp.current;

    if (timeDiff <= MAX_INTERVAL) {
      if (moveY > 0) {
        setMoveY(DIFF_MAX);
      }
      return;
    }

    if (moveY > DIFF_MAX / 3) {
      setMoveY(DIFF_MAX);
    } else {
      setMoveY(0);
    }
  };

  const onTransitionEnd = () => {
    if (moveY >= DIFF_MAX) {
      changeQuery(query);
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTransitionEnd,
    moveY,
    transition,
    DIFF_MAX,
  };
};
