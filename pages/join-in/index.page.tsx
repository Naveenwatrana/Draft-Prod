import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import HomeHeader from 'pages/web/HomePage/Header';
import { theme } from 'common/theme';
import CommonFooter from 'pages/web/HomePage/Footer/CommonFooter';
import { ColorRing } from 'react-loader-spinner';
import { useIsMobile } from 'common/hooks/useIsMobile';
import Graphic from './images/graphic.png';
import {
  Container, FooterContainer, FormContainer, GraphImage, HubSpotFormContainer, LoaderContainer, Wrapper,
} from './style';

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: { portalId: string; formId: string; target: string; region: string; }) => void;
      },
    };
  }
}
const JoinInPage = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      <Head>
        <style>
          {`
          h2 {
            font-size: 24px;
          }
          .hs-error-msgs {
            margin-left: 15px;
          }
          .hs-error-msg {
            color: red;
          }
          h3 {
            margin-bottom: 24px;
            font-size: 16px;
          }
          input {
            border-radius: 8px;
            height: 22px;
            padding: 12px;
            border: none;
            width: 100%;
            background: ${theme.palette.gray[50].value};
            color: ${theme.palette.white[100].value};
            @media (max-width: 1024px) {
              width: calc(100% - 24px);
            }
          }
          .hs-richtext {
            margin: 24px 0;
            font-size: 12px;
          }
          .hs_submit input {
            height: 44px;
            color: #121112;
            background-color: ${theme.palette.green[100].value};;
          }
          .hs-fieldtype-text {
            margin-bottom: 20px;
          }
          .hs-fieldtype-text label {
            margin-bottom: 4px;
            font-size: 12px;
          }
          p {
            a {
              color: ${theme.palette.green[100].value};;
            }
          }
        `}
        </style>
      </Head>
      <HomeHeader />
      <Container>
        {true && (
          <LoaderContainer>
            <ColorRing
              visible={true}
              height={64}
              width={64}
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              colors={['#43C167', '#43C167', '#43C167', '#43C167', '#43C167']}
            />
          </LoaderContainer>
        )}
        <FormContainer>
          <h2>Join in</h2>
          <HubSpotFormContainer id="hb_form_homepage" />
        </FormContainer>
        <GraphImage>
          <Image
            src={Graphic.src}
            alt={Graphic.src}
            width={Graphic.width}
            height={Graphic.height}
          />
        </GraphImage>
      </Container>
      <FooterContainer>
        <CommonFooter />
      </FooterContainer>
      <Script
        src="//js-eu1.hsforms.net/forms/embed/v2.js"
        onReady={() => {
          window.hbspt.forms.create({
            region: 'eu1',
            portalId: '26781374',
            formId: '3bee6128-7e84-4741-86d3-b0a799c584c1',
            target: '#hb_form_homepage',
          });
        }}
      />
    </Wrapper>
  );
};
export default JoinInPage;
