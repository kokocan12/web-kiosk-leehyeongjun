import { useNavigation, useRouterLoading } from '@lib/router';
import { useEffect } from 'react';

export const PageNotFound = () => {
  const done = useRouterLoading();
  const { push } = useNavigation();

  const onHomeButtonClick = () => {
    push({ to: '/' });
  };

  useEffect(() => {
    done();
  }, []);
  return (
    <div className="page-not-found">
      <h1 className="not-found-text">@..@ 페이지를 찾을 수 없습니다.</h1>
      <button onClick={onHomeButtonClick} className="btn home-btn">
        홈으로
      </button>
    </div>
  );
};
