import { useLocation } from '@lib/router';

const activePages = ['/payment/card', '/payment/cash'];

export const Loader = () => {
  const location = useLocation();

  if (activePages.includes(location.pathname))
    return (
      <div className="loader-wrap">
        <div className="loader"></div>
      </div>
    );

  return <></>;
};
