import { useTodoList } from '@hooks/useTodoList';

export const Receipt = () => {
  const { data, revalidate, isLoading } = useTodoList();

  return (
    <ul>
      {!isLoading &&
        data?.map((item) => {
          return <li key={item}>{item}</li>;
        })}
    </ul>
  );
};
