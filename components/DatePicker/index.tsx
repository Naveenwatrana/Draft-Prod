import { useRef, useState } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CALENDER_DATE_FORMAT } from 'common/constants';
import {
  CalenderIconContainer, CustomInput, CustomLabel, DatePickerContainer,
} from 'components/DatePicker/styles';
import CalenderContainer from 'components/DatePicker/calenderContainer';
import { DatePickerProps } from 'components/DatePicker/types';
import CalenderHeader from 'components/DatePicker/calenderHeader';
import CalenderIcon from 'components/Icons/CalenderIcon';
import { getDateFromMMDDYYFormat } from 'common/utils/date/dateFormat';

const DatePickerComp = ({
  onChange, selected, label, id, minDate, isDisabled, placeholder, placement, maxDate, cypressLocator,
}: DatePickerProps) => {
  const [showMonthPicker, setShowMonthPicker] = useState<boolean>(true);
  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const minimumSelectableDate = minDate ? new Date(minDate) : new Date(1980, 0, 1);

  const handleChange = (date: Date) => {
    if (showYearPicker) {
      setShowMonthPicker(true);
      setShowYearPicker(false);
    } else if (showMonthPicker) {
      onChange(date);
      datePickerRef.current?.setOpen(false);
    }
  };

  const renderHeader = ({ ...rest }) => (
    <CalenderHeader
      {...rest}
      showYearPicker={showYearPicker}
      setShowYearPicker={setShowYearPicker}
      setShowMonthPicker={setShowMonthPicker}
    />
  );
  const datePickerRef = useRef<ReactDatePicker>(null);
  const openDatePicker = () => {
    datePickerRef.current?.setOpen(true);
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const locale = {
    localize: {
      month: (n: number) => months[n],
    },
    formatLong: {
      date: () => 'mm/dd/yyyy',
    },
  };

  return (
    <DatePickerContainer>
      <CustomLabel>{label}</CustomLabel>
      <DatePicker
        id={id}
        locale={locale as Locale}
        renderCustomHeader={renderHeader}
        onChange={(date: Date) => handleChange(date)}
        selected={selected ? getDateFromMMDDYYFormat(selected) : null}
        dateFormat={CALENDER_DATE_FORMAT}
        placeholderText={placeholder}
        ref={datePickerRef}
        customInput={<CustomInput data-cy={cypressLocator} />}
        calendarContainer={CalenderContainer}
        popperPlacement={placement}
        maxDate={maxDate ? getDateFromMMDDYYFormat(maxDate) : new Date()}
        minDate={minimumSelectableDate}
        showMonthYearPicker={showMonthPicker}
        showYearPicker={showYearPicker}
        shouldCloseOnSelect={!showMonthPicker && !showYearPicker}
        calendarStartDay={1}
        useWeekdaysShort={true}
        disabled={isDisabled}
        onCalendarClose={() => {
          setShowMonthPicker(true);
          setShowYearPicker(false);
          setIsCalenderOpen(false);
        }}
        onCalendarOpen={() => {
          setIsCalenderOpen(true);
        }}
      />
      <CalenderIconContainer open={isCalenderOpen} onClick={openDatePicker}>
        <CalenderIcon />
      </CalenderIconContainer>
    </DatePickerContainer>
  );
};

export default DatePickerComp;
