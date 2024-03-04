import { LinkButton } from 'components/buttonComp/style';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 382px;
    background-color: #171718;
    flex-direction: column;
    border-radius: 12px;
    padding: 32px;
    margin: 0 auto;
    text-align: center;
`;
export const Title = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.palette.white[100].value};

`;

export const FileSpecificationTitle = styled(Title)`
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: 500;
  line-height: 28px;
`;
export const Description = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    margin-bottom: 24px;
`;

export const Divider = styled.div`
    background-color: ${({ theme }) => theme.palette.gray[40].value};
    height: 1px;
    width: 100%;
    margin-bottom: 24px;
`;
export const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
`;
export const Dl = styled.ul`
  text-align: left;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.palette.white[100].value};
  position: relative;
`;
export const Dd = styled.li`
  list-style: none;
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  line-height: 26px;
  margin-left: 26px;
  &:before {
    content: '•';
    font-size: 18px;
    list-style: none;
    position: absolute;
    left: 8px;
  }
`;
export const Dt = styled.li`
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    list-style: none;
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    margin-top: 20px;
    color: ${({ theme }) => theme.palette.white[100].value};
`;

export const FileSpecificationDt = styled(Dt)`
    font-weight: 500;
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;

export const FileSpecificationDd = styled(Dd)`
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;

export const FileSpecificationContainer = styled(Container)`
  border-radius: 12px;
  border: 1px solid #282629; // TODO: Add Color
  background: #121112; // TODO: Add Color
  text-align: start;
  ${LinkButton} {
    color: #99e662; // TODO: Add Color
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: 500;
    line-height: 20px;
  }
`;
