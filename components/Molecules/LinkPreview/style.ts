import { TitleText } from 'components/Atoms/TitleText';
import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 40px 16px 0;
  @media (max-width: 768px) {
    width: calc(100vw - 40px);
    padding: 20px;
  }
`;
export const Heading = styled(TitleText)`
  width: 100%;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
`;
export const StoryImage = styled(Image)`
  display: flex;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`;
export const StoryImg = styled.img`
  border-radius: 16px 16px 0 0;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;
export const StoryText = styled.div`
  background: ${({ theme }) => theme.palette.gray[50].value};
  border-radius: 0 0 16px 16px;
  padding: 24px;
`;
export const Content = styled.div`
  width: 100%;
`;
export const StoryTitle = styled.div`
  border: none;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  line-height: ${({ theme }) => theme.typography['24 semibold'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  transition: 0.3s;
  max-height: 180px;
  overflow: hidden;
  &:focus {
    outline: none;
  }
  & * {
    font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight} !important;
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px !important;
    line-height: ${({ theme }) => theme.typography['24 semibold'].lineHeights.value}px !important;
    color: ${({ theme }) => theme.palette.white[100].value} !important;
    background-color: transparent !important;
  }
  &[contenteditable=true]:empty:not(:focus):before{
    content:attr(data-ph);
    pointer-events: none;
    font-size: 24px;
    color: #828384;
  }
`;
