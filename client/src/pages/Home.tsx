import { useLocation, useNavigation } from '@/lib/router';

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigation();

  const onButtonClick = () => {
    navigate.push({ to: '/menu' });
  };

  const onButtonClick2 = () => {
    navigate.replace({ to: '/receipt' });
  };

  return (
    <div>
      <h1>home</h1>
      <button onClick={onButtonClick}>메뉴로 이동</button>
      <button onClick={onButtonClick2}>영수증 페이지이동</button>
    </div>
  );
};
