import Loader from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { Container, Content } from './styles';
import { LayoutCompactProps } from './type';
import NavbarCompact from '../NavbarCompact';

const LayoutCompact = ({
  children,
  loading,
  currentStep,
  steps,
  title,
  onBack,
}: LayoutCompactProps) => {
  return (
    <Container>
      {loading && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <NavbarCompact
        step={currentStep}
        onBack={onBack}
        title={title}
        stepsToRender={steps}
      />
      <Content>{children}</Content>
    </Container>
  );
};

export default LayoutCompact;
