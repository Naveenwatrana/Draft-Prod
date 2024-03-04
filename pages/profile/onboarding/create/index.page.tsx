import { useIsMobile } from 'common/hooks/useIsMobile';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import {
  apiRootUrl, getProfile,
} from 'common/utils/network/endpoints';
import axios from 'axios';
import DesktopCreateOnBoarding from './Desktop';
import MobileCreateOnBoarding from './Mobile';
import { CreateOnBoardingSteps, OnboardingProps } from './types';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const localUser = cookies.user ? JSON.parse(cookies.user) : null;
  let currentUser = { data: { data: { onboarding_step: null } } };
  try {
    if (localUser.username) {
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
      return {
        props: {
          onboardingStep,
        },
      };
    }
    return {
      props: { onboardingStep: currentUser.data.data?.onboarding_step, locationOptions: [] },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export const CreateCompany = (props: OnboardingProps) => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileCreateOnBoarding {...props} /> : <DesktopCreateOnBoarding {...props} />;
};

export default CreateCompany;
