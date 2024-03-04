import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const JobDetailPreviewCards = styled.div`
  .infinite-scroll-component {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    height: fit-content;
    gap: 20px;
  }
  .infinite-scroll-component__outerdiv {
    width: auto;
  }
  ul.slick-dots {
    bottom: 50px !important;
  }
  .slick-slider.slick-initialized > button {
    height: calc(100% - 50px);
  }
  > div {
    width: 300px;
  }
  @media (max-width: 426px) {
    justify-content: center;
    padding-bottom: 120px;
    .slick-slider .slick-list {
      z-index: 0;
    }
    .slick-slider.slick-initialized > button {
      z-index: 1;
    }
    .infinite-scroll-component > div {
      width: 320px;
    }
    .infinite-scroll-component {
      justify-content: center;
    }
  }
`;

export const ApplicationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;
  margin-top: 26px;
  padding: 0 8px;
  width: 100%;
  padding: 0px;
  @media (min-width: 1024px) {
    padding: 0 24px;
    margin-left: 291px;
}
`;
export const SearchJobsButton = styled(ButtonComp)`
  margin-top: 30px;
`;
export const Wrapper = styled.div`
  width: 300px;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  margin-left: -120px;
`;

export const IconWrapper = styled.div`
  margin-bottom: 30px;
`;

export const NoApplicationsWrapper = styled(ApplicationsWrapper)`
  align-items: center;
`;
export const Content = styled.div`
    flex: 4.5;
    display: flex;
    @media (min-width: 1024px) {
      margin-left: 121px;
    }
`;

export const CardContainer = styled.div`
    border-radius: 16px;
    padding: 8px;
    background-color: ${(props) => props.theme.palette.gray[50].value};
`;

export const JobInfo = styled.div`
    display: flex;
    padding: 16px;
`;

export const JobInfoCount = styled.div`
    height: 52px;
    width: 52px;
    border-radius: 71px;
    background: linear-gradient(90deg, #5FF088 -30.07%, rgba(84, 171, 172, 0.6) 77.94%),
    linear-gradient(116.15deg, rgba(95, 240, 136, 0.8) -11.18%, rgba(71, 218, 220, 0.8) 73.6%);
    font-size: 19px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const JobSkills = styled.div`
    padding-left: 1.72em;
    font-size: 9px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; 
    color: ${(props) => props.theme.palette.gray[10].value};
`;

export const JobSkillsCount = styled.div`
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const JobMatchingSkillsCount = styled.span`
    font-weight: 600;
    color: ${(props) => props.theme.palette.white[100].value};
`;

export const ViewJobButton = styled.div`
    border: 1px solid ${(props) => props.theme.palette.white['100a'].value};
    border-radius: 8px;
    width: 78px;
    height: 32px;
    text-align: center;
    font-size: 0.86em;
    font-weight: 600;
    display: block;
    color: ${(props) => props.theme.palette.white[100].value};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 12px 0px 12px;
    margin-top: 8px;
    float: right;
    margin-left: 10em; 
    cursor: pointer;
`;

export const Divider = styled.hr`
  border: 1px solid ${(props) => props.theme.palette.gray[40].value};
  margin: 0px 16px 0px 16px;
`;

export const StatusRow = styled.div`
  font-size: 9px;
  display: flex;
  padding: 16px;
  justify-content: space-between;
`;

export const StatusText = styled.div`
  fontSize: 9px;
  color: ${(props) => props.theme.palette.gray[10].value};
`;

export const JobApplicationFooter = styled.div`
    background-color: #1E1C1F;
    display: flex;
    flex-direction: column;
    border-radius: 0px 0px 16px 16px;
    padding: 16px;
    gap: 8px;
    color: ${(props) => props.theme.palette.white[100].value};
`;

export const MatchScoreRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    line-height: 16px;
`;

export const Score = styled.span`
    padding: 4px 8px 4px 8px;
    background: linear-gradient(90deg, #3D3C85 0%, #49489F 100%);
    border-radius: 32px;
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
`;

export const GotoMessage = styled.div`
    color: ${(props) => props.theme.palette.green['80'].value};
    cursor:pointer;
`;

export const PlaceHolderText = styled.span`
    color: ${(props) => props.theme.palette.green['80'].value};
    cursor:pointer;
`;
