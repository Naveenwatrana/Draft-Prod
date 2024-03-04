import { ReactNode } from 'react';

export type LayoutWithNavbarProps = {
  children: ReactNode;
  loggedInUser?: boolean;
  showNavbar?: boolean;
};
