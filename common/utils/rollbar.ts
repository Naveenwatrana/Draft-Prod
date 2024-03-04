/* eslint-disable @typescript-eslint/naming-convention */
import Rollbar from 'rollbar';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

console.warn({
  rollbarAccessToken: publicRuntimeConfig.rollbarAccessToken,
  appNodeEnv: publicRuntimeConfig.appNodeEnv,
});

export const RollbarErrorTracking = (() => {
  const RollbarObj = new Rollbar({
    accessToken: publicRuntimeConfig.rollbarAccessToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: publicRuntimeConfig.appNodeEnv,
    },
  });

  const logErrorInfo = (info: Rollbar.LogArgument) => {
    if (publicRuntimeConfig.appNodeEnv !== 'development') {
      RollbarObj.info(info);
    }
  };

  const logErrorInRollbar = (error?: string) => {
    if (publicRuntimeConfig.appNodeEnv !== 'development') {
      RollbarObj.error(error);
    }
  };

  return {
    logErrorInfo,
    logErrorInRollbar,
  };
})();

export default RollbarErrorTracking;
