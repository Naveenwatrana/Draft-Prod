import Link from 'next/link';
import styled from 'styled-components';

type widthProps = {
  maxLength?: boolean;
  minLength?: boolean;
}

export const Container = styled(Link)<widthProps>`
  display: flex;
  flex: 1;
  flex-direction: row;
  max-width: ${({ maxLength }) => maxLength ? '295px' : '664px'};
  padding: 24px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  background: #1e1c1f; // TODO: Add Color
`;

export const Wrapper = styled.div<widthProps>`
  display: flex;
  height: 100%;
  flex-direction: ${({ maxLength }) => maxLength ? 'row-reverse' : 'column'};
  gap: 24px;
  width: 100%;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  >:nth-child(2) {
    width: calc(100% - 30px);
    overflow-wrap: break-word;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  position: absolute;
  right: 0;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ImgContainer = styled.img<widthProps>`
  display: ${({ minLength }) => minLength && 'none'};
  border-radius: 16px;
  border: 1px solid #39363b;
  object-fit: cover;
  width: ${({ maxLength }) => maxLength ? '50%' : '100%'};
  height: ${({ maxLength }) => maxLength ? '200px' : '245px'};
`;

export const InfoContainer = styled.div<widthProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 24px;
  width: 100%;
  overflow: hidden;
`;

export const WebsiteLink = styled.div`
  color: #a69dab; // TODO: Add Color
  font-family: ${({ theme }) => theme.defaultFont};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  line-height: 18px;
`;

export const Title = styled.div`
  font-family: ${({ theme }) => theme.defaultFont};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  overflow: hidden;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
  text-overflow: ellipsis;
`;

export const MoreBtnContainer = styled.div<widthProps>`
  width: 100%;
  cursor: pointer;
  align-items: center;
  background-color: #ffffff1a;
  height: 45px;
  display: flex;
  justify-content: center;
  border-radius: 18px;
  font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['16 semibold'].fontSize.value}px;
  margin-top: ${({ maxLength }) => maxLength ? '20px' : '0'};
`;

export const Description = styled.div<widthProps>`
color: ${({ theme }) => theme.palette.gray[10].value};
font-family: ${({ theme }) => theme.defaultFont};
font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
font-style: normal;
font-weight: 500;
overflow: hidden;
word-wrap: break-word;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
white-space: pre-wrap;
text-overflow: clip;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
