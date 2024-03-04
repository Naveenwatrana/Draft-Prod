'use client';

import { useAppSelector } from 'common/hooks/state';
import { useRouter } from 'next/router';
import {
  useResendEmailMutation,
  useVerifyQuery,
} from 'pages/account/userService';
import { useParams } from 'common/utils/router-fill';
import Loader from 'components/Loader/Loader';
import { useEffect } from 'react';
import lang from 'common/lang';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { loginUrl, onboardingUrl } from 'common/utils/network/appRouts';
import LinkExpired from './LinkExpired';

const {
  SignUp: { expiredMessage },
} = lang;

const VerifyEmail = () => {
  const router = useRouter();
  const params = useParams();
  const {
    isSuccess,
    isError,
    isLoading,
    error,
    data: verifyData,
  } = useVerifyQuery(params.token, { skip: !params?.token });
  const [resendEmail, result] = useResendEmailMutation();

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const errorMessage = (error as any)?.data?.message;
  useEffect(() => {
    if (verifyData?.message) { showNotification(verifyData.message, NotificationType.SUCCESS); }
  }, [verifyData?.message]);
  useEffect(() => {
    if (params?.token) {
      if (!user) {
        router.push(loginUrl);
      }
      if (isSuccess && user) {
        router.push(token ? onboardingUrl : loginUrl);
      }
      if (isError && errorMessage !== expiredMessage) {
        router.push(loginUrl);
      }
    }
  }, [user, isSuccess, router, isError, errorMessage, token, verifyData]);

  if (errorMessage === expiredMessage) {
    return (
      <>
        {result.isLoading && <Loader />}
        <LinkExpired
          onResend={() => {
            resendEmail(user.email)
              .unwrap()
              .then((data) => {
                showNotification(data.message, NotificationType.SUCCESS);
                router.push(loginUrl);
              })
              .catch((err) => showNotification(err.data.message, NotificationType.ERROR));
          }}
        />
      </>
    );
  }

  return (
    <div>
      {isLoading && <Loader data-testid="loader" />}
    </div>
  );
};

export default VerifyEmail;
