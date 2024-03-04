import styled from 'styled-components';
import { IconWrapperProps } from 'components/Atoms/IconWrapper';
import { Avatar } from 'components/NavBar/styles';
import Text from 'components/textComp';
import Image from 'next/image';
import { SkillSection, SkillTag } from 'components/Organisms/ProfileBio/style';
import { CardButton } from 'components/ProfileCard/styles';
import { UserInfo } from 'pages/jobs/details/styles';

export const ArticalTitleContainer = styled.div`
    padding: 16px 16px 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const CardIcon = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  right: 16px;
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const CountContainer = styled(CardIcon)`
  display: flex;
  top: 16px;
  left: 16px;
  right: auto;
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const ArticalContainer = styled.div<{width?: number}>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #201E21;
  color: #807984;
  position: relative;
  width:${({ width }) => width ? `${width}px` : '318px'};
  height: fit-content;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid #39363B;
      &::before {
          content: '';
          position: absolute;
          width:${({ width }) => width ? `${width}px` : '318px'};
          height: 186px;
          background: linear-gradient(180deg, rgba(35, 35, 39, 0) 0%, #201E21 100%);
          z-index: 5;
          margin-top: 134px;
        };
        ${CardIcon}{
            display: flex;
        };
        ${CountContainer}{
            display: flex;
        };
  }
  `;

export const PostContainer = styled.div<{width?: number}>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #201E21;
  color: #807984;
  position: relative;
  width:${({ width }) => width ? `${width}px` : '318px'};
  height: fit-content;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid #39363B;
      &::before {
          content: '';
          position: absolute;
          width:${({ width }) => width ? `${width}px` : '318px'};
          height: 186px;
          background: linear-gradient(180deg, rgba(35, 35, 39, 0) 0%, #201E21 100%);
          z-index: 5;
          margin-top: 278px;
        }
        ${CardIcon}{
            display: flex;
        }
  }
`;

export const JobContainer = styled.div<{width?: number}>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: transparent;
  color: #807984;
  position: relative;
  width:${({ width }) => width ? `${width}px` : '318px'};
  height: fit-content;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid #39363B;
      ${CardIcon}{
          display: flex;
      }
  }
`;

export const UserContainer = styled.div<{width?: number}>`
  background-color: #1F1D20;
  width:${({ width }) => width ? `${width}px` : '318px'};
  height: fit-content;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid #39363B;
      ${CardIcon}{
          display: flex;
      }
  }
  ${SkillSection}{
    justify-content: center;
    margin-bottom: 16px;
    ${SkillTag}{
      border: 1px solid #FAFFB0B2;
    }
  }
  ${UserInfo}{
    padding: 16px;
  }
`;

export const HighlightedMantra = styled.div`
    position: absolute;
    z-index: 2;
    background: #0000001d;
    top: 0px;
    height: 220px ;
    width: 92%;
    padding: 16px;
    display: none;
    align-items: end;
    border-radius: 0px 0px 16px 16px;  
    span {
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;  
      overflow: hidden; 
    }
    @media (max-width: 1023px) {
      display: block;
    }
`;

export const UserCardBlock = styled.div<{width?: number}>`
  background-color: #1F1D20;
  width:${({ width }) => width ? `${width}px` : '294px'};
  height: fit-content;
  border-radius: 16px;
  padding: 13px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const UserCardName = styled(Text)`
  font-size: 16px;
`;
export const UserCardLocation = styled(Text)`
  color: A69DAB;
  font-size: 11px;
  text-align: center;
`;
export const UserCardBio = styled(Text)`
  text-align: center;
`;
export const UserImage = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 24px;
`;

export const LinkContainer = styled.div<{width?: number}>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #201E21;
  color: #807984;
  position: relative;
  width:${({ width }) => width ? `${width}px` : '318px'};
  height: fit-content;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid #39363B;
      &::before {
          content: '';
          position: absolute;
          width:${({ width }) => width ? `${width}px` : '318px'};
          height: 186px;
          background: linear-gradient(180deg, rgba(35, 35, 39, 0) 0%, #201E21 100%);
          z-index: 5;
          margin-top: 164px;
        }
        ${CardIcon}{
            display: flex;
        }
  }
`;

export const VideoContainer = styled.div`
  object-fit: cover;
  border-radius: 16px 16px 0px 0px;
  height: 464px;
  overflow: hidden;
  position: relative;
`;

export const MediaVideoContainer = styled.div`
  object-fit: cover;
  border-radius: 0px 0px 16px 16px;
  height: 252px;
  overflow: hidden;
  position: relative;
`;

export const ArticalPreviewImage = styled.img`
  height: 320px;
  object-fit: cover;
  border-radius: 16px 16px 0px 0px;
`;

export const PostPreviewImage = styled.img`
  height: 464px;
  object-fit: cover;
  border-radius: 16px 16px 0px 0px;
`;

export const FeedTitle = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  max-height: 118px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

export const PostCaption = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  max-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export const CreatorInfo = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
`;

export const FeedFooter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const FeedAuthor = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: 12px;
  line-height: 18px;
`;

export const FeedDate = styled.div`
  color: #807984;
  font-size: 12px;
  line-height: 18px;
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
`;

export const MatchPercent = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: 24px;
  line-height: 32px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
`;

export const UpvoteWrapper = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 16px;
  align-items: center;
  color: ${({ theme }) => theme.palette.white['100'].value};
  gap: 4px;
`;

export const CommentsWrapper = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 16px;
  align-items: center;
  color: ${({ theme }) => theme.palette.white['100'].value};
  gap: 4px;
  margin-left: 4px;
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const IconWrapper = styled.button<IconWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 38px;
    cursor: pointer;
    padding: 8px;
    gap: 6px;
    background: ${({ bg }) => bg ? bg : 'none'};
    border: none;
    border-radius: 16px;
    font-size: 12px;
    line-hight: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.white['100'].value};
    background-color: rgba(43,44,45,0.80);
    backdrop-filter: blur(16px);
`;

export const CountWrapper = styled.button<IconWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 38px;
    cursor: pointer;
    padding: 8px;
    gap: 6px;
    background: ${({ bg }) => bg ? bg : 'none'};
    border: none;
    border-radius: 16px;
    font-size: 12px;
    line-hight: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.white['100'].value};
    background-color: rgba(43,44,45,0.80);
    backdrop-filter: blur(16px);
`;

export const UserAvatar = styled(Avatar)`
  border: none;
`;

export const JobDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: #1A1A33;
    border-radius: 16px 16px 0px 0px;
    padding: 16px;
    `;

export const JobFooter = styled.div`
    background-color: #212040;
    display: flex;
    border-radius: 0px 0px 16px 16px;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
`;

export const CompanyInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

export const CompanyLogo = styled.img`
  border-radius: 12px;
  width: 60px;
  height: 60px;
`;

export const JobTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const JobTitle = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: 20px;
  line-height: 26px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
`;

export const CompanyName = styled.div`
  color: #A69DAB;
  font-size: 14px;
  line-height: 18px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
`;

export const JobAttribute = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: 14px;
  line-height: 18px;
  gap: 4px 0px 4px 0px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
`;

export const LinkPreviewImage = styled.img`
  height: 350px;
  object-fit: cover;
  border-radius: 16px 16px 0px 0px;
`;

export const WebsiteLink = styled.div`
  color: #A69DAB;
  font-size: 16px;
  line-height: 24px;
`;

export const ProfileImage = styled.img`
  width: 100px;
`;

export const SliderContainer = styled.div`
  width: 100%;
  height: 252px;
  overflow: hidden;
  position: relative;
  .slick-next:before {
    position: absolute;
    right: 30px;
  }

  .slick-slide:after {
    background: linear-gradient(
      180deg,
      #131315 15%,
      #1212145c 50%,
      #131315 100%
    );
    border-radius: 12px;
  }

  .slick-list {
    height: 100%;
    z-index: 1;
    .slick-track{
      display: flex;
    }
  }
  @media (max-width: 1023px) {
    ${CardButton} {
      svg {
        display: unset;
      }
    } 
  }
  &:hover {
    ${HighlightedMantra}{
      display: flex;
    }

    ${CardButton} {
      svg {
        display: unset;
      }
      top: 100px;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(12px);
      svg {
        width: 10px;
        display: unset;
      }
    }
  }
  .slick-dots {
    li {
      margin: -4px;

      .slick-active button:before {
        opacity: 1;
      }

      button:before {
        color: ${({ theme }) => theme.palette.white[100].value};
      }
    }
  }
  @media (max-width: 992px), (max-height: 900px) and (max-width: 992px){
    width: 41.6vh;
  }
`;
