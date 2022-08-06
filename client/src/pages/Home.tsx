import { useTodoList } from '@hooks/useTodoList';
import { useSyncState } from '@lib/global-state';
import { useLocation, useNavigation } from '@lib/router';

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigation();

  const [state, mutate] = useSyncState('count', 0);

  const [profile, setProfile] = useSyncState('profile', {
    name: 'hong',
    age: 30,
  });

  const { data, revalidate, isLoading } = useTodoList();

  const onButtonClick = () => {
    navigate.push({ to: '/menu' });
  };

  const onButtonClick2 = () => {
    navigate.push({ to: '/receipt' });
  };

  const onButtonClick3 = () => {
    mutate(state + 1);
  };

  return (
    <div>
      <h1>
        home{state} {profile.name} {profile.age}
      </h1>
      <input
        value={profile.name}
        onChange={(e) => setProfile({ name: e.currentTarget.value })}
      />
      <button onClick={onButtonClick}>메뉴로 이동</button>
      <button onClick={onButtonClick2}>영수증 페이지이동</button>
      <button onClick={onButtonClick3}>state change</button>
      <ul>
        {!isLoading &&
          data?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
      </ul>
      <button onClick={revalidate}>revalidate</button>
    </div>
  );
};
