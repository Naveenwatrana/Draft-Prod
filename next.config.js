/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    shouldRunMSW: process.env.REACT_APP_SHOULD_RUN_MSW || false,
    rollbarAccessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    appNodeEnv: process.env.REACT_APP_NODE_ENV,
    fromHerokuVarsSecret: process.env.HEROKU_VAR_PUBLIC_SECRET,
  },
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['page.tsx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'draft-api-production.s3.eu-west-2.amazonaws.com',
      pathname: '/**',
      port: '',
    }, {
      protocol: 'https',
      hostname: 'draft-prod.akamaized.net',
      pathname: '/**',
      port: '',
    },
    {
      protocol: 'https',
      hostname: 'draftfl.akamaized.net',
      pathname: '/**',
      port: '',
    }
  ],
  },
};

