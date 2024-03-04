import TextComp from 'components/textComp';
import styled from 'styled-components';

export const ProjectContainer = styled.div<{ margin?: string }>`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  word-break: break-word;
  margin: ${({ margin }) => (margin ? margin : '16px')};
`;

export const ProjectWrapper = styled.div``;

export const ProjectName = styled(TextComp)`
  font-size: 1em;
`;
export const ProjectRole = styled(TextComp)`
  font-size: 1em;
  font-weight: 300;
`;
export const ProjectDuration = styled(TextComp)`
  font-size: 1em;
  font-weight: 300;
  color: #a9abab; //TODO: Get color from theme
`;
