export enum NavigationType {
  YOU = 'you',
  CONNECT = 'connect',
  EXPLORE = 'explore',
  CAREER = 'career',
  FOR_BUSINESS = 'forBusiness',
  LOGIN = 'login',
}
export type HomeHeaderProps = { activeMenu?: NavigationType };

export type NavMenuItemProps = {
  active?: boolean;
};
