import { TextComp } from 'components/textComp';
import styled from 'styled-components';
import { IconsContainer } from '../styles';

export const BasicDetailsContainer = styled.div`
  display: flex;
  width: 300px;
  padding: 32px;
  padding-left: 0;
  @media screen and (max-width: 1023px) {
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  position: relative;
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
        display: flex;
        top: 32px;
        right: -1rem;
      }
    }
  }
`;
export const BasicDetailsFullName = styled.div`
    width: 33%;
    justify-content: center;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
`;

export const NameTextOverFlow = styled(TextComp)`
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const EditFullNameButton = styled.div` 
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 16px;
`;
export const EditButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 16px;
`;

export const Container = styled.div`
    background-color: ${(props) => props.theme.palette.gray['80'].value};
    padding: 32px;
    border-radius: 12px;
    max-width: 733px;
    margin: 0 auto;
    width: 733px;
    border: solid 1px ${({ theme }) => theme.palette.gray['40'].value};
    box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.25);

    @media screen and (max-width: 768px) {
        max-height: 100vh;
        padding: 0 16px;
        flex-direction: column;
        display: flex;
        width: calc(100% - 32px);
        max-width: calc(100% - 32px);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;

    @media screen and (max-width: 768px) {
        justify-content: space-between;
        gap: 16px;
        margin: 20px 0;
        height: 100%;
    }
`;
