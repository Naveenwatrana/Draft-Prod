import styled from 'styled-components';
import { AccordionItemHeaderProps } from './types';

export const AccordionItemHeader = styled.div<AccordionItemHeaderProps>`
  padding: 24px 0;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  line-height: 24px;
  svg {
    margin-right: 10px;
    transform: rotate(${({ active }) => (active ? 0 : -90)}deg);
  }
`;

export const StyledAccordionItem = styled.div`
  border-top: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  &:first-child {
    border-top: none;
    ${AccordionItemHeader} {
      padding-top: 0;
    }
  }
  cursor: pointer;
`;

export const AccordionItemContent = styled.div`
  padding-bottom: 24px;
`;
