import { TextComp } from 'components/textComp';
import styled from 'styled-components';
import { IconsContainer } from 'pages/pro/styles';

type UserBioContainerProps = {
    isEditing?: boolean;
}

export const Title = styled(TextComp)`
    margin-bottom: 24px;
`;

export const ReadMore = styled.span`
    font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
`;

export const UserBio = styled(TextComp)`
    font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 26px;
    padding: 18px 0;
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column; 
    background: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 32px;
    border-radius: 4px;
    max-width: 906px;
    width: 100%;
    margin: 0 auto;
`;

export const Counter = styled.div`
    display: flex;
    justify-content: right;
    margin-bottom: 10px;
`;

export const UserBioContainer = styled.div<UserBioContainerProps>`
  padding: 24px;
  position: relative;
  background: ${({ theme }) => theme.palette.gray['60'].value};
  border: solid 1px ${({ theme }) => theme.palette.gray['40'].value} ;
  border:${({ theme, isEditing }) => isEditing && `solid 1px ${theme.palette.gray['20'].value}`} ;
  padding: 24px;
  border-radius: 12px;
  :hover {
    background: ${({ theme }) => theme.palette.gray['50'].value};
  }
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
      }
    }
  }
`;

export const UserBioText = styled(TextComp)`
    margin-top: 18px;
`;
