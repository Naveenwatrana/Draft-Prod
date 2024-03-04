import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const JobDetailsButton = styled(ButtonComp)`
  position: absolute;
  z-index: 10;
  top: 460px;
  left: 200px;
  width: max-content;
  color: ${({ theme }) => theme.palette.white['100'].value};
  :hover {
    color: ${({ theme }) => theme.palette.white['100'].value};
  }
`;
export const DetailsText = styled(TextComp)`
  font-weight: ${({ theme }) => theme.typography['20 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['20 regular'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.white['100'].value};
  margin-bottom: 32px;
  white-space: pre-wrap;
  word-break: break-word;
  height: 350px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
