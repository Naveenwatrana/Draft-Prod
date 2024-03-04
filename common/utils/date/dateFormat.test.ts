import { dateFormat, dateFormatMY } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';

describe('Format date in given format', () => {
  it('should format date into mm-dd-yyyy format', () => {
    const date = '2022-11-21';
    const formattedDate = formatDate(date, dateFormat);
    expect(formattedDate).toBe('11-21-2022');
  });
  it('should format date into mmm yyyy format', () => {
    const date = '2022-11-21';
    const formattedDate = formatDate(date, dateFormatMY);
    expect(formattedDate).toBe('Nov 2022');
  });
});
