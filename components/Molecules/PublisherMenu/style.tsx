import { ListItem } from 'components/KebabMenu/styles';
import styled from 'styled-components';

export const PublisherMenuItem = styled(ListItem)`
  display: flex;
  align-items: center;
  gap: 12px;
  &:last-child {
    color: ${({ theme }) => theme.palette.red[100].value};
  }
`;
