import { Textarea } from 'components/Description/styles';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';
import Image from 'next/image';
import { VideoContainerProps } from './types';

type lengthProps = {
  minLength?: boolean;
}

export const EditName = styled(TextComp)`
  color: ${(props) => props.theme.palette.white['100'].value};
  margin-bottom: 30px;
  font-family: ${({ theme }) => theme.defaultFont};
`;

export const SubmitButton = styled(ButtonComp)`
  width: 148px;
`;

export const SkipButton = styled(ButtonComp)`
  margin-right: 36px;
  color: ${(props) => props.theme.palette.green['80'].value};
  background: none;
  margin-right: 36px;
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
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
  height: 264px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (max-width: 768px) {
    justify-content: space-between;
    gap: 16px;
    margin: 20px 0;
    height: 100%;
  }
`;

export const VideoContainer = styled.div<VideoContainerProps>`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    border-radius: 12px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({ withTitle }) => withTitle ? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(18, 18, 20, 0.51) 60%, #000000 91.15%)' : ''};
      border-radius: 12px;
      z-index: 1;
      object-fit: cover;
    }
`;
export const Title = styled(TextComp)<lengthProps>`
  max-width: ${({ minLength }) => minLength ? '310px' : '675px'};
  position: absolute;
  z-index: 1;
  bottom: 16px;
  left: 20px;
  color: ${(props) => props.theme.palette.white['100'].value};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  text-overflow: clip;
  -webkit-line-clamp: ${({ minLength }) => minLength ? 2 : 1};
`;
export const HightLightImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
