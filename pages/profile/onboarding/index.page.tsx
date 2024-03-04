import TextComp from 'components/textComp';
import lang from 'common/lang';
import ButtonComp from 'components/buttonComp';
import Image from 'next/image';
import { onboardingUpUrl } from 'common/utils/network/appRouts';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import { apiRootUrl, getProfile } from 'common/utils/network/endpoints';
import axios from 'axios';
import handEmoji from '../../../public/images/handemoji.png';
import {
  BtnWrapper,
  Container,
  DescriptionText,
  Frame,
  Header,
  ImageContainer,
  OnBoardingBody,
  OnBoardingWelcomeContainer,
} from './style';
import { CreateOnBoardingSteps } from './create/types';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const localUser = cookies.user ? JSON.parse(cookies.user) : null;
  let currentUser = { data: { data: { onboarding_step: null } } };
  if (localUser?.username) {
    currentUser = await axios.get(
      `${apiRootUrl}${getProfile}?username=${localUser.username}`,
    );
    const onboardingStep = localUser && currentUser.data.data?.onboarding_step;
    if (onboardingStep && onboardingStep >= CreateOnBoardingSteps.BRAND) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
  }
  return { props: {} };
}

const WelcomeOnBoarding = () => {
  const router = useRouter();

  const {
    userOnBoarding: {
      label: { WelcomeLabel },
      content: { welcomeContent },
    },
    buttonText: { start },
  } = lang;

  return (
    <Container>
      <OnBoardingBody>
        <OnBoardingWelcomeContainer>
          <Header>
            <Image src={handEmoji} alt="" />
            <TextComp component="h2">{WelcomeLabel}</TextComp>
            <DescriptionText>{welcomeContent}</DescriptionText>
          </Header>
          <BtnWrapper>
            <ButtonComp
              label={start}
              primary
              fullWidth
              data-cy="startOnboarding"
              onClick={() => router.replace(onboardingUpUrl)}
            />
          </BtnWrapper>
        </OnBoardingWelcomeContainer>
        <ImageContainer>
          <Frame />
        </ImageContainer>
      </OnBoardingBody>
    </Container>
  );
};

export default WelcomeOnBoarding;
