import '../styles/globals.css';
import type { AppProps } from 'next/app';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { storeWrapper } from 'common/store/store';
import { theme } from 'common/theme';
import { ThemeProvider } from 'styled-components';
import ReactModal from 'react-modal';
import { Provider } from 'react-redux';
import Loader from 'components/Loader/Loader';
import localFont from 'next/font/local';
import { bugsnagStart } from 'utils/bugsnag';
import { IsSsrMobileContext } from 'context/isMobileContext';
import { GlobalsContext } from 'context/globalsContext';
import { LoggedInUser } from 'context/loggedInUserContext';
import { usePreviousRoute } from 'common/hooks/usePreviousRoute';
import { useOnboardingValidate } from 'common/hooks/useOnboardingValidate';
import ErrorBoundary from 'components/ErrorBoundary';
import useIsServerSidePageLoading from 'common/hooks/useIsServerSidePageLoading';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsentComponent from 'components/CookieConsent/CookieConsent';
import { getEnv } from 'utils/getEnv';
import { Env } from 'types';
import { GlobalStyle } from './styles';

ReactModal.setAppElement('#__next');
bugsnagStart();
const defaultFont = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.otf',
      weight: '400',
    },
    {
      path: '../public/fonts/Satoshi-Medium.otf',
      weight: '500',
    },
    {
      path: '../public/fonts/Satoshi-Bold.otf',
      weight: '600',
    },
  ],
});
const homePageFont = localFont({
  src: '../public/fonts/Brulia-Variable/BruliaVariable-veriable.woff2',
});

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = storeWrapper.useWrappedStore(rest);
  const isProd = getEnv() === Env.PRODUCTION;
  const previous = usePreviousRoute();
  useOnboardingValidate();
  const { loading } = useIsServerSidePageLoading();
  return (
    <ErrorBoundary>
      <GlobalsContext.Provider value={rest.pageProps.globals}>
        <IsSsrMobileContext.Provider value={rest.pageProps.isSsrMobile}>
          <LoggedInUser.Provider value={rest.pageProps.loggedInUser}>
            <Provider store={store}>
              <ThemeProvider
                theme={{ ...theme, defaultFont: defaultFont.style.fontFamily, homePageFont: homePageFont.style.fontFamily }}
              >
                {loading && <Loader />}
                <GlobalStyle defaultFont={defaultFont.style.fontFamily} />
                {isProd && <CookieConsentComponent />}
                <Component {...props.pageProps} previousRoute={previous} />
              </ThemeProvider>
            </Provider>
          </LoggedInUser.Provider>
        </IsSsrMobileContext.Provider>
      </GlobalsContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
