import { differenceInCalendarMonths } from 'date-fns';
import { IProjectValues } from 'pages/pro/components/Projects/types';
import { calculateBarPosition, calculateBarWidth, calculateYears } from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/util';

describe('Graph Utilities', () => {
  it('should calculate start and end year from given range', () => {
    const years = ['2022-11-09', '2020-10-10', '2020-10-10', '2019-02-02', '2019-01-02'];
    const expectedOutput = differenceInCalendarMonths(new Date(), new Date('2019-01-02'));
    const output = calculateYears(years);
    expect(output).toBe(expectedOutput);
  });
  it('should calculate width of each bar on timeline', () => {
    const project: IProjectValues = {
      startDate: '2022-01-14',
      endDate: '2022-10-14',
      description: '',
      id: 1,
      title: '',
      ongoing: false,
    };
    const output = calculateBarWidth(project, 5, 1);
    const expectedOutput = 45;
    expect(expectedOutput).toBe(output);
  });
  it('should calculate width of ongoing project on timeline', () => {
    const project: IProjectValues = {
      startDate: '2022-01-14',
      endDate: '',
      description: '',
      id: 1,
      title: '',
      ongoing: true,
    };
    const output = calculateBarWidth(project, 5, 1);
    const expectedOutput = differenceInCalendarMonths(new Date(), new Date(project.startDate));
    expect(expectedOutput * 5).toBe(output);
  });
  it('should calculate position of project bar on timeline', () => {
    const project: IProjectValues = {
      startDate: '2022-01-14',
      endDate: '',
      description: '',
      id: 1,
      title: '',
      ongoing: true,
    };
    const output = calculateBarPosition(project, 5, '2022-10-01', 1);
    expect(45).toBe(output);
  });
});
