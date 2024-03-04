import TextComp from 'components/textComp';
import styled from 'styled-components';
import ChevronLeft from '../Icons/LeftChevron';

type CalenderIconContainerProps = {
  open?: boolean;
}

export const DatePickerContainer = styled.div`
  input {
    width: 100%;
  }
  position: relative;

  .react-datepicker {
    background: none;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    font-family: ${({ theme }) => theme.defaultFont};
  }

  .react-datepicker__input-container {
    display: flex;
  }

  .react-datepicker__week {
    .react-datepicker__day {
      font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
      font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
      color: ${(props) => props.theme.palette.gray['70'].value};
      margin: 8px 10px;
    }
    .react-datepicker__day--disabled {
      color: ${(props) => props.theme.palette.gray['30'].value};
    }
  }

  .react-datepicker__day-name {
    font-size: ${(props) => props.theme.fontSize['0'].value}px;
    font-weight: 300;
    color: ${(props) => props.theme.palette.gray['30'].value};
    margin: 8px 10px;
  }

  .react-datepicker__header {
    border: none;
    background: ${(props) => props.theme.palette.gray['50'].value};
    padding: 8px 0 0;

    
    > div > div:nth-child(2) > button:first-child,
    > div > div:first-child > button:last-child,
    > div > div:first-child > button:first-child > svg:first-child,
    > div > div:last-child > button:first-child,
    > div > div:last-child > button:last-child > svg:first-child {
      display: none;
    }

    > div > div:nth-child(2) > button:last-child {
      display: block;
    }
  }

  .react-datepicker__month-container,
  .react-datepicker__year--container {
    background: ${(props) => props.theme.palette.gray['50'].value};
    padding: 10px;
    height: 250px;
    border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
    box-shadow: 8px 3px 22px 10px rgba(0, 0, 0, 0.13);
    border-radius: 12px;
    overflow-y: auto;
  }
  .react-datepicker__month-wrapper {
    display: flex;
  }
  .react-datepicker__month-wrapper{
    > div{
      min-width: 66px !important;
    }
  }
  .react-datepicker__month {
    margin: 0;
  }
  .react-datepicker__day-names {
    border-top: 1px solid #aeaeae;
    text-transform: uppercase;
    margin: 0 10px;
  }

  .react-datepicker__day:hover {
    border-radius: 40px;
    background-color: ${(props) => props.theme.palette.gray['40'].value};
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected {
    border-radius: 40px;
    background-color: ${(props) => props.theme.palette.green['80'].value};
    color: ${(props) => props.theme.palette.gray['80'].value} !important;
    &:hover {
      background-color: ${(props) => props.theme.palette.green['80'].value};
    }
  }

  .react-datepicker__day--outside-month {
    color: ${(props) => props.theme.palette.gray['30'].value}!important;
  }

  .react-datepicker__month-text,
  .react-datepicker__year-text {
    margin: 8px;
    width: 2rem;
    font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
    color: ${(props) => props.theme.palette.gray['70'].value};
    padding: 8px 16px;
  }

  .react-datepicker__month-text:hover,
  .react-datepicker__year-text:hover {
    border-radius: 40px;
    background-color: ${(props) => props.theme.palette.gray['40'].value};
    padding: 8px 16px;
  }

  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__month-text--selected,
  .react-datepicker__year-text--keyboard-selected,
  .react-datepicker__year-text--selected {
    border-radius: 40px;
    background-color: ${(props) => props.theme.palette.green['80'].value};
    color: ${(props) => props.theme.palette.gray['80'].value} !important;
    padding: 8px 16px;
    &:hover {
      background-color: ${(props) => props.theme.palette.green['80'].value};
    }
  }
  .react-datepicker__year-text, .react-datepicker__year-text:hover,.react-datepicker__year-text--keyboard-selected,
  .react-datepicker__year-text--selected  {
    width: 100px;
    padding: 8px 0px;
    @media (max-width: 1023px) {
    width: 80px;
  }
  }

  .react-datepicker__month--disabled {
    color: ${(props) => props.theme.palette.gray['30'].value}!important;
  }
  .react-datepicker-wrapper {
    display: block;
  }

`;

export const CalenderWrapper = styled.div`
  position: relative;
`;

export const CustomInput = styled.input`
  font-family: ${({ theme }) => theme.defaultFont};
  font-size: 16px;
  line-height: 24px;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 12px;
  background: ${(props) => props.theme.palette.gray['50'].value};
  border: solid 1px ${(props) => props.theme.palette.gray['40'].value};
  color: ${(props) => props.theme.palette.white['100'].value};
  font-weight: 300;
  cursor: pointer;
  margin-top: 4px;
  :disabled {
    background: ${(props) => props.theme.palette.gray['80'].value};
  }
`;

export const CustomLabel = styled(TextComp)`
  font-weight: 600;
  font-size: 12px;
`;

export const HeaderContainer = styled.div`
  margin: 0 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArrowLeft = styled(ChevronLeft)``;

export const ArrowRight = styled(ChevronLeft)`
  transform: rotate(180deg);
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 24px;
  padding: 0 5px;
  color: ${(props) => props.theme.palette.gray['30'].value};
`;

export const HeaderContent = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.palette.gray['70'].value};
  font-family: ${({ theme }) => theme.defaultFont};
  font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
  padding: 2px;
`;

export const CalenderIconContainer = styled.span<CalenderIconContainerProps>`
  cursor: pointer;
  svg {
    path {
      stroke: ${({ open, theme }) => open ? theme.palette.white['100'].value : theme.palette.gray['20'].value}
    }
    position: absolute;
    right: 18px;
    top: 40px;
  }
`;
