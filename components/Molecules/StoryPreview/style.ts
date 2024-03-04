import { TitleText } from 'components/Atoms/TitleText';
import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 40px 16px 0;
`;
export const Heading = styled(TitleText)`
  width: 100%;
`;
export const StoryImage = styled(Image)`
  display: flex;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`;
export const StoryImg = styled.img`
  height: auto;
`;
export const StoryText = styled.div`
  background: ${({ theme }) => theme.palette.gray[50].value};
  border-radius: 0 0 16px 16px;
  padding: 24px;
  word-break: break-word;
  text-wrap: wrap;
`;
