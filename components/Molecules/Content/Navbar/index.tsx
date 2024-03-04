import lang from 'common/lang';
import ChevronLeft from 'components/Icons/LeftChevron';
import Stepper from 'components/Atoms/Stepper';
import { ArticleSteps } from 'pages/article/create/types';
import {
  Container,
  CreateArticleText,
  IconWrapper,
} from './style';
const {
  article: {
    step: { create, tags },
  },
} = lang;
const stepsToRender = [
  { name: create, step: ArticleSteps.CREATE },
  { name: tags, step: ArticleSteps.TAGS },
];
type NavbarProps = {
  step?: number;
  title: string;
  handleBack: () => void;
  noStepper?: boolean;
};

const Navbar = ({
  step, title, handleBack, noStepper = true,
}: NavbarProps) => {
  return (
    <Container>
      <CreateArticleText>
        <IconWrapper onClick={handleBack}>
          <ChevronLeft data-cy="goBackCreateCards" />
        </IconWrapper>
        {title}
      </CreateArticleText>
      {noStepper && step && <Stepper stepsToRender={stepsToRender} step={step} />}
    </Container>
  );
};

export default Navbar;
