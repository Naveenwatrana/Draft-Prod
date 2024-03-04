import { Env } from 'types';

const stagingUrl = process.env.NEXT_PUBLIC_STAGING_URL;
const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const getEnv = () => {
  if (typeof window !== 'undefined') {
    if (productionUrl && window && window.location.href.includes(productionUrl)) {
      return Env.PRODUCTION;
    }
    if (stagingUrl && window && window.location.href.includes(stagingUrl)) {
      return Env.STAGING;
    }
  }
};
