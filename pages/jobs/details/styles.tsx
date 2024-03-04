import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';
import TextComp from 'components/textComp';
import {
  JobApplicationFooter, JobInfoCount, NoApplicationsWrapper, PlaceHolderText, Wrapper,
} from 'pages/workspace/common/jobApplicationsDesktop/styles';
import { IconWrapperProps, IconWrapper as IIconWrapper } from 'components/Atoms/IconWrapper';
import { ApplicationSearchInput } from 'components/NavBar/styles';
import { ApplicantCardContainerProps, JobCardsContainerProps, QuickFilterProps } from './types';

export const CompanyPageContainer = styled.div`
    background: ${({ theme }) => theme.palette.gray[80].value};
    height: auto;
    min-height: 100vh;
    @media screen and (max-width: 1023px) {
      overflow-y: auto;
      overflow-x: hidden;
    }
    align-items: center;
    display: flex;
    flex-direction: column;
    svg:last-child {
      align-self: center;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 32px 24px;
    height: calc(100% - 64px);
    overflow-y: scroll;
`;

export const CompanyLogo = styled.img`
  border-radius: 8.8px;
  width: 74px;
  height: 74px;
  margin-bottom:16px;
`;

export const CompanyProfile = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction:column;
    margin-bottom: 32px;
`;

export const ComapnyName = styled.div`
    font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom:22px;
`;

export const JobPostion = styled.div`
    font-weight: ${(props) => props.theme.typography['32 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['32 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom: 5px;
    text-align: center;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const JobLocation = styled.div`
    font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['16 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.gray['10'].value};
    margin-bottom:22px;
    text-align: center;
`;

export const JobPayRange = styled.div`
    font-weight: ${(props) => props.theme.typography['24 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['24 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom:22px;
`;

export const JobActionBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:32px;

    .publish:hover {
        background-color: ${(props) => props.theme.palette.violet['80'].value} !important;
    }
`;

export const Box = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

export const EditIcon = styled.span`
    font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
    margin-left: 9px;
`;

export const JobDesc = styled.div`
    border-radius: 12px;
    max-width: 909px;
    min-width: 909px;
    padding: 24px;
    margin-top: 32px;
    background: ${(props) => props.theme.palette.gray['60'].value};
    @media (max-width: 988px) {
        max-width: none;
        min-width: calc(100% - 48px);
    };
`;

export const JobDecsTitle = styled.div`
    font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom: 16px;
`;

export const Description = styled.div`
    font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    line-height: 26px;
    margin-bottom: 16px;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const LoadMore = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const JobDetailPreviewCards = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    z-index: 1;
`;

export const JobDetailPreviewCardsMobile = styled.div`
    width: 300px; 
    @media (max-width : 426px) {
        width: 100%;
    }
`;

export const PublishButton = styled(ButtonComp)`
  background: ${(props) => props.theme.palette.green['80'].value};
  padding: 12px 20.5px;
  white-space: nowrap;
  border-radius: 16px;
  &[disabled] {
    background: ${(props) => props.theme.palette.green['15'].value};
  }
`;

export const CloseJobButton = styled(ButtonComp)`
  border: solid 1px #5FF088;
  padding: 12px 20.5px;
  white-space: nowrap;
`;

export const JobCardsContainer = styled.div<JobCardsContainerProps>`
  width: min-content;
  border-radius: 16px;
  ${({ notAvailable }) => {
    return notAvailable
      && `
        background: rgba(226, 35, 26, 0.15); // TODO: Add color     
        padding: 8px 8px 16px;
    `;
  }}
  ${({ candidateView, theme }) => {
    return (
      candidateView && `
      background: ${theme.palette.gray[50].value};
      padding: 8px 8px 16px;
    `
    );
  }}
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const JobDetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 350px;
  @media screen and (min-width: 1023px) {
    position: fixed;
    padding-right: 10px;
    overflow-y: auto;
    height: calc(100vh - 164px);
  }
`;

export const JobDetailAction = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

export const EditHighLightButton = styled.button`
  border: 1px solid ${({ theme }) => theme.palette.green[80].value};
  border-radius: 16px;
  padding: 8px 16px;
  background: transparent;
  width: 188px;
  height: 44px;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  line-height: 18px;
  :hover {
    background: ${({ theme }) => theme.palette.green[80].value};
    color: ${({ theme }) => theme.palette.gray[100].value};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.palette.green['80'].value};
    opacity: 0.2;
    color: ${({ theme }) => theme.palette.gray[100].value};
  }
`;

export const FilledButtonIcon = styled.div<IconWrapperProps>`
display: flex;
align-items: center;
justify-content: center;
height: 44px;
cursor: pointer;
padding: 0 10px;
gap: 6px;
background: ${({ bg }) => bg ? bg : 'none'};
border: 1px solid ${({ border, theme }) => border ? border : theme.palette.gray[40].value};
border-radius: 16px;
${({ primary, theme }) => primary && `
  background: ${theme.palette.green[100].value};
  color: ${theme.palette.gray[60].value};
  & > * {
    color: ${theme.palette.gray[60].value};
    fill: ${theme.palette.gray[60].value};
    stroke: ${theme.palette.gray[60].value};
  }
  & > svg > path {
    color: ${theme.palette.gray[60].value};
    fill: ${theme.palette.gray[60].value};
    stroke: ${theme.palette.gray[60].value};
  }
`}

&:hover {
    outline: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    background: ${({ theme }) => theme.palette.gray[60].value};
    //FIXME: use color from theme. Currently, there is no color with this value in the theme

    //FIXME: use color from theme. Currently, there is no color with this value in the theme
}
`;

export const JobDetailSectionTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography['32 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['32 semibold'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  text-transform: capitalize;
`;

export const JobDetailSectionSubTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  line-height: 14px;
  color: ${({ theme }) => theme.palette.gray[10].value};
`;

export const DividerComp = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.gray['40'].value};
`;

export const JobHeighlight = styled.div`
  display: flex;
  gap: 16px;
  ${PlaceHolderText} {
    padding-top: 4px;
  }
`;
export const HeighlightIcon = styled.div`
  width: 24px;
  padding-top: 4px;
`;

export const HeighlightValues = styled.div`
  display: flex; 
  gap: 6px; 
  flex-direction: row;
  flex-wrap: wrap;
`;

export const RatingTag = styled.span`
  padding: 8px 16px; 
  border-radius: 32px;
  border: 1px solid #837694;
  font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
  line-height: 26px;
  display: flex; 
  align-items: center;
  text-wrap: nowrap;
  background-color: #C4B0DE;
  gap: 16px;
  color: #282629;
  width: fit-content;
`;

export const BackButtonWrapper = styled.div`
  display: flex;
  align-items: left;
  position: fixed;
  width: 100%;
  padding-left: 100px;
  padding-top: 20px;
  div {
    width: 40px;
  }
  ${IIconWrapper} {
    width: 44px;
    border-radius: 26px;
  }
`;

export const HeighlightTag = styled.div<{ isActive?: boolean }>`
  padding: 4px 10px; 
  border-radius: 32px;
  border: 1px solid #837694;
  font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
  line-height: 18px;
  background-color: ${({ isActive, theme }) => isActive ? '#C4B0DE' : 'transparent'};
  color: ${({ isActive, theme }) => isActive ? '#282629' : 'auto'};
  display: flex; 
  align-items: center;
  text-wrap: nowrap;
  height: 24px;
`;

export const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MiddleText = styled(TextComp)`
  text-align: center;
  padding: 8px;
  font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
  line-height: 20px;
`;

export const MatchSkillCount = styled(JobInfoCount)`
  border-radius: 99.673px;
  width: 100% !important;
  max-width: 52px;
  border: 1.404px solid ${({ theme }) => theme.palette.green[100].value};
  background: linear-gradient(
    116deg,
    rgba(95, 240, 136, 0.3) -11.18%,
    rgba(71, 218, 220, 0.3) 73.6%
  ); // TODO: Add Color
`;

export const DraftScoreTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  > span {
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  }
  > span:last-child {
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    overflow: hidden;
  }
`;

export const DraftScoreContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

export const NoApplicationsData = styled(NoApplicationsWrapper)`
  margin-top: 20vh;
`;

export const NoApplicationsText = styled(Wrapper)`
  width: 400px;
  margin-left: -250px;
`;

export const IconWrapper = styled.div`
  margin-bottom: 30px;
`;

export const ApplicationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 40px;
  margin-top: 125px;
  margin-bottom: 20px;
  width: 100%;
`;

export const ApplicationListWrapper = styled.div`
  padding: 5vh 10vw;
  width: calc(100% - 20vw);
`;

export const RecommendationWrapper = styled.div`
  padding: 5vh 10vw;
  width: calc(100% - 20vw);
`;

export const JobApplicantesList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 24px;
  gap: 24px;
  overflow: auto;
  ${NoApplicationsData} {
    margin-top: 10vh;
  }
  `;
export const ViewJobButton = styled.div`
      background: ${(props) => props.theme.palette.gray[40].value};
      border-radius: 8px;
      width: 78px;
      text-align: center;
      font-size: 0.86em;
      font-weight: 600;
      display: block;
      color: ${(props) => props.theme.palette.white[100].value};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 6px 0px 6px;
      margin-top: -4px;
      float: right;
      margin-left: 5px; 
      cursor: pointer;
`;

export const LitCandidate = styled.div`
    border: 1px solid ${(props) => props.theme.palette.white['100a'].value};
    border-radius: 8px;
    height: 32px;
    text-align: center;
    font-size: 0.86em;
    font-weight: 600;
    display: block;
    color: ${(props) => props.theme.palette.white[100].value};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 4px 0px 4px;
    margin-top: -4px;
    float: right;
    margin-left: 40px; 
    cursor: pointer;
`;

export const Divider = styled.hr`
  border: 1px solid ${(props) => props.theme.palette.gray[40].value};
  margin: 0px 0px 0px 16px;
`;

export const CardContainer = styled.div<ApplicantCardContainerProps>`
  cursor: pointer;
  border-radius: 16px;
  padding: 8px;
  background-color: ${(props) => props.theme.palette.gray[50].value};
  ${({ shortlisted, theme }) => shortlisted
    && `
    background-color: ${theme.palette.violet['100'].value};
    ${LitCandidate} {
      border: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(9px);
      }
      ${ViewJobButton} {
        background: rgba(255, 255, 255, 0.10);
        backdrop-filter: blur(2px);
      }
      ${Divider} {
        border-color: rgba(247, 247, 247, 0.30);
      }
    `}
`;

export const UserInfo = styled.div`
    display: flex;
    padding: 16px;
`;
export const ResCardContainer = styled.div<ApplicantCardContainerProps>`
  cursor: pointer;
  border-radius: 16px;
  background: #1F1D20;
  position: relative;
  ${({ shortlisted, theme }) => shortlisted
    && `
    background: ${theme.palette.violet['100'].value};
    ${LitCandidate} {
      border: 1px solid rgba(255, 255, 255, 0.05);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(9px);
      }
      ${ViewJobButton} {
        background: rgba(255, 255, 255, 0.10);
        backdrop-filter: blur(2px);
      }
      ${Divider} {
        border-color: rgba(247, 247, 247, 0.30);
      }
    `}
    ${JobApplicationFooter} {
      background: ${(props) => props.theme.palette.gray[50].value};
    }
    ${LitCandidate} {
      border-radius: 16px;
      padding: 4px 10px;
      border: none;
      background: ${(props) => props.theme.palette.gray[50].value};
    }
    ${UserInfo} {
      min-height: 225px;
    }
    ${JobApplicantesList} {
      justify-content: center;
    }
`;

export const RecommendationSearchInput = styled(ApplicationSearchInput)`
  border-radius: 24px;
`;

export const ShortListElement = styled.div`
    position: absolute;
    width: 100%;
    top: 16px;
    right: 16px;
`;

export const UserDetail = styled.div`
    display: flex;
    flex-direction: column;
    width: 332px;
    align-items: center;
    gap: 16px;
`;

export const UserText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100%;
`;

export const MantraText = styled.p`
    text-align: center;
`;

export const UserName = styled.span`
    font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
    word-break: break-word;
`;

export const UserLocation = styled.span`
    font-size: 14px;
    color: ${(props) => props.theme.palette.gray[10].value};
    text-decoration: capitalize;
`;

export const UserInfoCount = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 71px;
    background: linear-gradient(90deg, #5FF088 -30.07%, rgba(84, 171, 172, 0.6) 77.94%),
    linear-gradient(116.15deg, rgba(95, 240, 136, 0.8) -11.18%, rgba(71, 218, 220, 0.8) 73.6%);
    font-size: 19px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
export const UserSkillsContiner = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
`;
export const SkillsTopContiner = styled.div`
    display: flex;
    flex: auto;
    margin-bottom: 8px;
`;
export const JobSkills = styled.div`
    padding-left: 1.72em;
    font-size: 9px;
    display: flex;
    flex-direction: column;
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

export const StatusRow = styled.div`
  font-size: 9px;
  display: flex;
  padding: 8px 4px 8px 16px;
  justify-content: space-between;
`;

export const StatusText = styled.div`
  fontSize: 9px;
  color: ${(props) => props.theme.palette.gray[10].value};
`;

export const FilterContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const QuickFilterContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 16px;
`;

export const QuickFilterOption = styled.div<QuickFilterProps>`
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    background: ${(props) => props.isActive ? props.theme.palette.white[100].value : props.theme.palette.gray[50].value};
    color: ${(props) => props.isActive ? props.theme.palette.gray[50].value : props.theme.palette.white[100].value};
    border-radius: 32px;
    cursor: pointer;
    font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
`;
