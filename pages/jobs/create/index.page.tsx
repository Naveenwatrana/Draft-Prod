import { useIsMobile } from 'common/hooks/useIsMobile';
import { ToastContainer } from 'react-toastify';
import MobileCreateJob from './Mobile';
import DesktopCreateJob from './Desktop';
const CreateJob = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {isMobile ? <MobileCreateJob /> : <DesktopCreateJob />}
    </>
  );
};

export default CreateJob;
