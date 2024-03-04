import { ResumeDetailsContainer } from 'pages/pro/resume/style';
import styled from 'styled-components';

type ImageContainerProps = {
  media: string;
};

type NavbarContainerProps = {
  withBorder?: boolean;
};

type NavbarFollowBtnProps = {
  following?: boolean;
};

export const Container = styled.div`
  max-width: 1212px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 991px) {
    max-width: unset;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    margin: 0;
  }
  ${ResumeDetailsContainer} {
    margin-top: 0;
  }
`;

export const ProfileContent = styled.div`
  width: 752px;
  @media screen and (max-width: 991px) {
   width: 100%;
  }
`;
export const UserBio = styled.div`
  width: 400px;
  border: 1px solid ${({ theme }) => theme.palette.gray[30].value};
`;

export const NavbarContainer = styled.div<NavbarContainerProps>`
  padding: 12px;
  height: 32px;
  width: 100%;
  position: fixed;
  width: 100%;
  background-color: #1f1d20; // TODO: Add Color
  z-index: 1;
  display: flex;
  gap: 16px;
  ${({ withBorder }) => withBorder
    && `
    border-bottom: 1px solid #2A282B; // TODO: Add Color
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 80px);
  justify-content: space-between;
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const UserName = styled.div`
  align-self: center;
`;

export const NavbarFollowBtn = styled.div<NavbarFollowBtnProps>`
  color: ${({ theme, following }) => !following ? theme.palette.green[80].value : theme.palette.gray[10].value};
  display: flex;
  height: 20px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
`;

export const UserImage = styled.div<ImageContainerProps>`
  border-radius: 8px;
  height: 34px;
  width: 34px;
  object-fit: cover;
  background-image: url(${({ media }) => media});
  background-size: cover;
`;
