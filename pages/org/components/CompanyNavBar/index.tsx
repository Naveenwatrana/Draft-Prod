import { useIsMobile } from 'common/hooks/useIsMobile';
import { useNavigate } from 'common/utils/router-fill';
import DesktopNavbar from 'pages/company/DesktopNavbar';
import MobileNavbar from 'pages/company/MobileNavbar';
import { CompanyNavbarProps } from './types';

const CompanyNavbar = ({ data, activeTab }: CompanyNavbarProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/feed');
  };
  if (isMobile) {
    return (
      <MobileNavbar
        onBack={handleBack}
        companyData={data}
        activeTab={activeTab}
      />
    );
  }
  return (
    <DesktopNavbar
      onBack={handleBack}
      companyData={data}
      activeTab={activeTab}
    />
  );
};

export default CompanyNavbar;
