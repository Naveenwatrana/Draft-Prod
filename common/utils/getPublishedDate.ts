import { dateFormatDMY } from 'common/constants';
import { formatDate } from './date/dateFormat';

export const publishedDate = (createdAt?: string, shouldBeVisible?: boolean) => {
  if (createdAt && shouldBeVisible) {
    return formatDate(createdAt, dateFormatDMY);
  }
  return '';
};
