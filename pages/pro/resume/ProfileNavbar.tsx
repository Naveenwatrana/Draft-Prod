import { useIsMobile } from 'common/hooks/useIsMobile';
import DesktopNavbar from 'pages/pro/components/navbar/desktop';
import MobileNavbar from 'pages/pro/components/navbar/mobile/mobile';

export type ProfileNavBar = {
  handleBack: () => void;
  activeTab: number;
  name: string;
  followerCount: number;
  followingCount: number;
  location?: string | null;
  userName: string;
  setSkip?: () => void;
}

const ProfileNavBar = ({
  handleBack, activeTab, name, followerCount, followingCount, location, userName, setSkip,
}: ProfileNavBar) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileNavbar
        onBack={handleBack}
        activeTab={activeTab}
        name={name}
        location={location}
      />
    );
  }
  return (
    <DesktopNavbar
      onBack={handleBack}
      activeTab={activeTab}
      followerCount={followerCount}
      followingCount={followingCount}
      name={name}
      location={location}
      userName={userName}
      setSkip={setSkip}
    />
  );
};

export default ProfileNavBar;
