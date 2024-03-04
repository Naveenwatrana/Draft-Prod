import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useIsMobile } from 'common/hooks/useIsMobile';
import DesktopCreateOrganization from './Desktop';
import MobileCreateOrganization from './Mobile';

export const CreateCompany = () => {
  useHandleMissingSession();
  const isMobile = useIsMobile();
  return !isMobile ? (
    <DesktopCreateOrganization />
  ) : (
    <MobileCreateOrganization />
  );
};

export default CreateCompany;
