import { useWindowDimensions } from 'common/hooks';
import DesktopProfile from 'pages/pro/onboarding/desktop';
import MobileProfile from 'pages/pro/onboarding/mobile';

const Profile = () => {
  const { isDesktopView } = useWindowDimensions();
  return isDesktopView ? <DesktopProfile /> : <MobileProfile />;
};

export default Profile;
