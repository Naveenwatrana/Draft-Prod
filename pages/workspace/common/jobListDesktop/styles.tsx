import styled from 'styled-components';
import MoreMenu from 'components/Icons/MoreAction.svg';
import ButtonComp from 'components/buttonComp';
import { UserAvatar } from 'pages/feed/NewCards/style';

type ListRowItemProps = {
    color? :string;
    semiBold? :boolean;
    isOverFlow?: boolean;
    maxWidth?: string;
    center?: boolean;
}

type ListHeaderItemProps = {
    center?: boolean;
}

export const List = styled.table`
    width: 100%;
    height: fit-content;
    border-collapse: collapse;
    border: 0;
    table-layout: auto;
`;

export const ListHeader = styled.tr`
    padding: 8px 0;
    
`;

export const ListHeaderItem = styled.th<ListHeaderItemProps>`
    text-align: start;
    font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.gray['10'].value};
    padding: 0;
    height: 34px;
    ${(props) => props.center ? 'text-align: center;' : ''}
`;

export const ListRow = styled.tr`
    padding: 16px 0;
    border-top: 1px solid ${(props) => props.theme.palette.gray['60'].value};
    width: 100%;
`;

export const ListRowItem = styled.td<ListRowItemProps>`
    height: 64px;
    padding: 0 5px;
    position: relative;
    font-weight: ${(props) => props.theme.typography[`14 ${props.semiBold ? 'semibold' : 'regular'}`].fontWeight};
    font-size: ${(props) => props.theme.typography[`14 ${props.semiBold ? 'semibold' : 'regular'}`].fontSize.value}px;
    color: ${(props) => props.color ? props.color : props.theme.palette.white['100'].value};
    ${(props) => props.isOverFlow ? `
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    ` : ''}
    ${(props) => props.maxWidth ? `
        max-width: ${props.maxWidth}
    ` : ''}
    ${(props) => props.width ? `width: ${props.width};` : ''}
    ${(props) => props.center ? 'text-align: center;' : ''}
`;

export const MoreMenuIcon = styled(MoreMenu)`
    cursor: pointer;
    padding: 8px 8px;
    border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
    border-radius: 8px;
    // background: ${(props) => props.theme.palette.gray['60'].value};
    &:hover{
        border-radius: 8px;
        background: ${(props) => props.theme.palette.gray['60'].value};
    } 
`;

export const JobDetailPreviewCards = styled.div`
  .infinite-scroll-component {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // max-width: 1024px;
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
  margin: 50px 0px;
  margin-left: 291px;
  padding: 0 24px;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;
export const SearchJobsButton = styled(ButtonComp)`
  margin-top: 24px;
`;
export const Wrapper = styled.div`
  width: 250px;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;
export const NoApplicationsWrapper = styled(ApplicationsWrapper)`
  align-items: center;
`;
export const Content = styled.div`
    flex: 4.5;
    display: flex;
    margin-left: 121px;
    @media (max-width: 768px) {
        margin-left: 0px;
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
    justify-content: space-between;
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
    font-size: 10px;
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.palette.gray[10].value};
`;

export const JobSkillsCount = styled.div`
    font-size: 14px;
    display: flex;
    margin-top: 5px;
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
    float: right;
    margin-left: 5em; 
    cursor: pointer;
`;

export const Divider = styled.hr`
  border: 1px solid ${(props) => props.theme.palette.gray[40].value};
  margin: 0px 16px 16px 16px;
`;

export const StatusRow = styled.div`
  font-size: 9px;
  display: flex;
  padding: 0px 16px 16px 16px;
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

export const JobStatus = styled.div`
    background: #FFFFFF1A;
    padding: 6px 8px 6px 8px;
    border-radius: 32px;
    gap: 8px;
    color: ${(props) => props.theme.palette.white[100].value};
    font-size: 14px;
    line-height: 18px;
    text-transform: capitalize;
    position: absolute;
    top: 20px;
    right: 20px;
`;

export const AvatarStack = styled.div`
    display: flex;
    
    ${UserAvatar}{
      border: 1px solid #2F2D30;
      color: #121112;
      background-color: ${(props) => props.theme.palette.white[100].value};
    }
    ${UserAvatar}:nth-child(2){
      margin-left: -15px;
    }
    ${UserAvatar}:nth-child(3){
      margin-left: -15px;
    }
    ${UserAvatar}:nth-child(4){
      margin-left: -15px;
    }
`;
