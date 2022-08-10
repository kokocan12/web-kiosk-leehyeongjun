import { ReactNode } from 'react';

export const Dim = ({ children }: { children?: ReactNode }) => {
  return <div className="dim">{children}</div>;
};
