import { Container, Content } from 'components/LayoutWithNavbar/styles';
import TopNavigation from 'components/NavBar/TopNavigation';
import BottomNavigation from 'components/NavBar/BottomNavigation';
import { useIsMobile } from 'common/hooks/useIsMobile';
import TopNavigationWithoutAuth from 'components/Molecules/TopNavigationWOAuth';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser } from 'pages/account/authSlice';
import { LayoutWithNavbarProps } from './types';

const LayoutWithNavbar = ({
  children,
  showNavbar = true,
}: LayoutWithNavbarProps) => {
  const isMobile = useIsMobile();
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <Container>
      {currentUser && showNavbar && <TopNavigation />}
      {!currentUser && showNavbar && <TopNavigationWithoutAuth />}
      <Content showNavbar={showNavbar}>{children}</Content>
      {isMobile && showNavbar && <BottomNavigation />}
    </Container>
  );
};

export default LayoutWithNavbar;
