import { FooterSection } from 'pages/web/HomePage/Footer/CommonFooter/style';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  align-items: center;
  background: #121112;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    padding: 50px 0;
    height: auto;
  
  }
`;
export const FormContainer = styled.div`
  width: calc(50% - 300px);
  padding: 0 150px;
  min-height: 515px;
  @media (max-width: 1024px) {
    padding: 45px 20px;
    width: calc(100% - 40px);
    min-height: calc(100vh - 100px);
  }
`;
export const GraphImage = styled.div`
  width: 50%;
  @media (max-width: 1024px) {
    width: 100%;
    display: none;
    img {
      width: 100%;
      height: auto;
    }
  }
`;
export const LoaderContainer = styled.div`
  position: fixed;
  top: 40vh;
  z-index: 0;
  @media (min-width: 1024px) {
    left: 20%;
  }
`;
export const HubSpotFormContainer = styled.div`
  position: relative;
  z-index: 1;
  background: ${({ theme }) => theme.palette.gray[80].value};
`;
export const Wrapper = styled.div`
  ${FooterSection} {
    margin-top: 0;
  }
`;
export const FooterContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;
