import lang from 'common/lang';
import {
  Container,
  CreateCompanyText,
  Step,
  StepName,
  StepsContainer,
  StepsCount,
} from './style';
import { CreateCompanySteps } from '../types';
const {
  company: {
    createCompanyPage,
    step: { url, validateEmail, completeProfile },
  },
} = lang;
const stepsToRender = [
  { name: url, step: CreateCompanySteps.URL },
  { name: validateEmail, step: CreateCompanySteps.VALIDATE_EMAIL },
  { name: completeProfile, step: CreateCompanySteps.COMPLETE_PROFILE },
];
type NavbarProps = {
  step: number;
};

const Navbar = ({ step }: NavbarProps) => {
  return (
    <Container>
      <CreateCompanyText>{createCompanyPage}</CreateCompanyText>
      <StepsContainer>
        {stepsToRender.map((stepToRender) => (
          <Step active={step === stepToRender.step} key={stepToRender.name}>
            <StepsCount>{stepToRender.step}</StepsCount>
            <StepName>{stepToRender.name}</StepName>
          </Step>
        ))}
      </StepsContainer>
    </Container>
  );
};

export default Navbar;
