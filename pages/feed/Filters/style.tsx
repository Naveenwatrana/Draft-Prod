import styled from 'styled-components';

type FilterProps = {
  active: boolean;
};

export const FiltersContainer = styled.span`
  display: flex;
  position: fixed;
  bottom: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  z-index: 10;
  @media (max-width: 1023px) {
    width: calc(100% - 4rem);
    overflow-x: auto;
    padding: 1rem 4rem;
    bottom: 5rem;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const Filter = styled.span<FilterProps>`
  display: flex;
  align-items: center;
  color: ${({ theme, active }) => !active
    ? theme.palette.white['100'].value
    : theme.palette.gray['80'].value};
  padding: 12px;
  gap: ${({ active }) => (active ? '12px' : '10px')};
  background: ${({ theme, active }) => active ? theme.palette.white['100'].value : theme.palette.gray['80'].value};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  cursor: pointer;
  > svg {
      transform: rotate(${({ active }) => (!active ? 45 : 0)}deg);
      > * {
        stroke: ${({ theme }) => theme.palette.gray['20'].value};
        stroke-width: 1px;
      }
  }
`;
