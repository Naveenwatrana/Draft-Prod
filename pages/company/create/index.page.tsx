import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useWindowDimensions } from 'common/hooks';
import DesktopCreateCompany from './Desktop';
import MobileCreateCompany from './Mobile';

export const CreateCompany = () => {
  useHandleMissingSession();
  const { isDesktopView } = useWindowDimensions();
  return isDesktopView ? <DesktopCreateCompany /> : <MobileCreateCompany />;
};

export default CreateCompany;
