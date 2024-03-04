import { useEffect } from 'react';
import { onboardingUpUrl, onboardingUrl } from 'common/utils/network/appRouts';
import { useRouter } from 'next/router';

export const useOnboardingValidate = () => {
  const router = useRouter();
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const user = auth && JSON.parse(auth)?.user;
    if (
      user
      && (user?.onboarding_step < 2 && !user?.onboarding_status)
      && router.pathname !== onboardingUrl
      && router.pathname !== onboardingUpUrl
    ) {
      router.replace(onboardingUpUrl);
    }
  }, [router.pathname]);
};
