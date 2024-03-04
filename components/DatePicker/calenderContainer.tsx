import { CalendarContainer } from 'react-datepicker';
import { CalenderWrapper } from 'components/DatePicker/styles';
import { CalenderContainerProps } from 'components/DatePicker/types';

const CalenderContainer = ({ className, children }: CalenderContainerProps) => (
  <CalendarContainer className={className}>
    <CalenderWrapper>{children}</CalenderWrapper>
  </CalendarContainer>
);

export default CalenderContainer;
