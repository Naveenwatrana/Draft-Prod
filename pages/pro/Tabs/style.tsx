import { StyledCarousel } from 'components/CardStack/styles';
import styled from 'styled-components';
import TextComp from 'components/textComp';
import ButtonComp from 'components/buttonComp';
import { DividerComp } from 'components/Divider/styles';
import { Textarea } from 'components/Description/styles';

export const ContentContainer = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  flex-wrap: wrap;
  overflow: auto;
  height: calc(100vh - 152px);

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  justify-content: center;
  @media screen and (max-width: 1023px) {
    padding: 0;
    width: min-content;
    overflow: unset;
  }
  > div:last-child {
  }
`;
export const InfiniteScrollComponentContainer = styled.span`
  @media screen and (max-width: 1023px) {
    .infinite-scroll-component {
      height: calc(100vh - 104px) !important;
      overflow: unset !important;
    }
  }
  ${StyledCarousel} {
    cursor: pointer;
  }
  width: 100%;
`;

export const FiltersContainer = styled.div`
  min-width: 372px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
  h6 {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-bottom: 8px;
    margin-top: 2px;
  }
  h3 {
    margin: 24px 0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  > div:last-child > ${DividerComp} {
    display: none;
  }
`;

export const ResumeFiltersContainer = styled(FiltersContainer)`
  @media screen and (min-width: 1023px) {
    margin-top: 90px;
  }
`;
export const EditName = styled(TextComp)`
  color: ${(props) => props.theme.palette.white['100'].value};
  margin-bottom: 30px;
  font-family: ${({ theme }) => theme.defaultFont};
`;

export const SubmitButton = styled(ButtonComp)`
  width: 148px;
  height: 44px;
  background-color: rgba(226, 35, 26, 0.15); // TODO add color
  color: ${({ theme }) => theme.palette.red[110].value};
  :hover {
    background-color: rgba(226, 35, 26, 0.15); // TODO add color
  }
  :disabled {
    background-color: rgba(226, 35, 26, 0.15); // TODO add color
  }
`;

export const SkipButton = styled(ButtonComp)`
  margin-right: 36px;
  color: ${(props) => props.theme.palette.green['80'].value};
  background: none;
`;

export const DynamicTag = styled.span`
  font-weight: 600;
`;

export const ButtonGroupDeleteModal = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 32px;
  width: 100%;
  button {
    width: 100%;
  }
  @media screen and (min-width: 1023px) {
    gap: 0px;
    button {
      max-width: 179px;
      font-size: 14px;
      width: auto;
    }
    flex-direction: row-reverse;
  }
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.palette.gray['80'].value};
  padding: 32px;
  border-radius: 4px;
  width: 669px;
  margin: 0 auto;
  min-height: 537px;
  border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
  border-radius: 12px;
  box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;

  ${DividerComp} {
    margin: 0;
  }

  
  @media screen and (max-width: 1023px) {
    ${Textarea} {
      height: 400px;
      max-height: 40vh;
      @media screen and (max-height: 844px) {
        max-height: 20vh;
      }
    }
    height: calc(100% - 50px);
    max-height: calc(100vh - 65px);
    border-radius: 0;
    margin-bottom: 0;
    padding: 36px 24px 24px;
    flex-direction: column;
    display: flex;
    width: calc(100% - 32px);
    max-width: calc(100% - 32px);
  }
`;

export const DeleteModalContainer = styled(Container)`
  width: 352px;
  min-height: unset;
  height: max-content;
  padding: 24px;
  align-items: center;
  display: flex;
  flex-direction: column;
  ${EditName} {
    text-align: center;
  }
  @media screen and (min-width: 1023px) {
    height: auto;
    width: 385px;
    padding: 32px;
    ${SkipButton} {
      margin-left: 32px;
    }
  }
`;

export const BlankProfileNotification = styled.div`
  width: 100%;
  margin-top: 40px;
  padding: 24px;
  text-align: center;
  background: linear-gradient(90deg, rgba(227, 108, 253, 0.15) 4.71%, rgba(0, 88, 251, 0.15) 57.55%, rgba(46, 192, 251, 0.15) 100%), linear-gradient(0deg, #002A3E, #002A3E), linear-gradient(0deg, #244050, #244050);

  font-size: 14px;
  color: ${(props) => props.theme.palette.white['80'].value};
  border-radius: 8px;

`;
