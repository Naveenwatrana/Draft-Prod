import { getMonth, getYear } from 'date-fns';
import {
  ArrowButton, ArrowLeft, ArrowRight, HeaderContainer, HeaderContent,
} from 'components/DatePicker/styles';

const months = Array.from({ length: 12 }, (_, i) => {
  return new Date(0, i).toLocaleString('en-US', { month: 'long' });
});

const getYearRange = (year: number) => {
  const years = Array.from({ length: 12 }, (_, i) => {
    return Array.from({ length: 12 }, (__, j) => {
      return 1981 + i * 12 + j;
    });
  });
  const yearIndex = years.findIndex((yearArray) => yearArray.includes(year));
  const yearArray = years[yearIndex];
  const firstYear = yearArray[0];
  const lastYear = yearArray[yearArray.length - 1];
  return `${firstYear} - ${lastYear}`;
};

const handleArrowClick = (e: any, callback: any) => {
  e.preventDefault();
  callback();
};

const CalenderHeader = ({
  date,
  decreaseYear,
  increaseYear,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  showYearPicker,
  setShowYearPicker,
  setShowMonthPicker,
}: any) => (
  <HeaderContainer>
    <div>
      <ArrowButton onClick={(e) => handleArrowClick(e, decreaseYear)} disabled={prevYearButtonDisabled}>
        <ArrowLeft />
        <ArrowLeft />
      </ArrowButton>
      <ArrowButton onClick={(e) => handleArrowClick(e, decreaseMonth)} disabled={prevMonthButtonDisabled}>
        <ArrowLeft />
      </ArrowButton>
    </div>
    <div>
      {!showYearPicker && (
        <HeaderContent type="button" onClick={() => setShowMonthPicker(true)}>
          {months[getMonth(date)]}
        </HeaderContent>
      )}
      <HeaderContent type="button" onClick={() => setShowYearPicker(true)}>
        {showYearPicker ? getYearRange(getYear(date)) : getYear(date)}
      </HeaderContent>
    </div>
    <div>
      <ArrowButton onClick={(e) => handleArrowClick(e, increaseMonth)} disabled={nextMonthButtonDisabled}>
        <ArrowRight />
      </ArrowButton>
      <ArrowButton onClick={(e) => handleArrowClick(e, increaseYear)} disabled={nextYearButtonDisabled}>
        <ArrowRight />
        <ArrowRight />
      </ArrowButton>
    </div>
  </HeaderContainer>
);

export default CalenderHeader;
