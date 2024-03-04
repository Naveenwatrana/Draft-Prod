import { differenceInCalendarMonths } from 'date-fns';
import { IProjectValues } from 'pages/pro/components/Projects/types';

export const calculateYears = (years: string[]): number => {
  const sortedYears = years.sort();
  const startYear = new Date(sortedYears[0]);
  const endYear = new Date();
  return differenceInCalendarMonths(endYear, startYear);
};

export const calculateBarWidth = (input: IProjectValues, perMonthWidth: number, gridGap: number) => {
  if (input.endDate && !input.ongoing) {
    const totalMonths = differenceInCalendarMonths(new Date(input.endDate), new Date(input.startDate));
    return (totalMonths / gridGap) * (perMonthWidth);
  }
  const totalMonths = differenceInCalendarMonths(new Date(), new Date(input.startDate));
  return (totalMonths / gridGap) * (perMonthWidth);
};

export const calculateBarPosition = (project: IProjectValues, perMonthWidth: number, starDate: string, gridGap: number) => {
  const position = differenceInCalendarMonths(new Date(starDate), new Date(project.startDate));
  return Math.abs((position / gridGap) * perMonthWidth);
};
export const calculateGridSize = (months: number): number => {
  const differnce = Math.abs(months);
  const length = getGridSizeGap(differnce);
  return differnce / length;
};
export const getGridSizeGap = (months: number): number => {
  const difference = Math.abs(months);
  switch (true) {
    case (difference < 10):
      return 2;
    case (difference < 25):
      return 3;
    case (difference < 100):
      return 8;
    case (difference < 300):
      return 10;
    case (difference < 400):
      return 12;
    case (difference > 400):
      return 14;
    default:
      return 1;
  }
};

const projectColumnWidth = 240;
const linesIntensity = 2;

export const generateGraph = (years: number, width?: number) => {
  if (!width) {
    return { items: [], lines: 0 };
  }

  const totalWidth = width - projectColumnWidth;
  const lines = Math.round(totalWidth / years) / linesIntensity;
  const items = Array(years * linesIntensity).fill('').map((val, index) => index);

  return { items, lines };
};
