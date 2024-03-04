import styled from 'styled-components';

export const FileSpecificationsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;

  @media (max-width: 768px) {
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  }
`;

export default FileSpecificationsButton;
