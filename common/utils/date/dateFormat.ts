import {
  format, formatDistance, isToday, isYesterday,
} from 'date-fns';

const regexMMDDYYYYFormat = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/;
export const getDateFromMMDDYYFormat = (date: string) => {
  if (typeof date === 'string' && date.match(regexMMDDYYYYFormat) !== null) {
    const array = date.split('-');
    return new Date(Number(array[2]), Number(array[0]) - 1, Number(array[1]));
  } else {
    return new Date(date);
  }
};

export const formatDate = (date: string, dateFormat: string) => {
  return format(getDateFromMMDDYYFormat(date), dateFormat);
};
export const formatDateDistance = (date: string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const formatTimeStamp = (dateString: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isToday(date)) {
    return format(date, 'h:mm a');
  } else if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, 'MMM dd');
  }
  return format(date, 'MMM dd, yyyy');
};
