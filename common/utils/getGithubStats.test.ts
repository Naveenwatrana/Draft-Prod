import { getGithubStats } from './getGithubStats';

describe('getGithubStats', () => {
  it('should return the correct stats', () => {
    const contributions = [
      {
        date: '2021-01-01',
        count: 1,
      },
      {
        date: '2021-01-02',
        count: 2,
      },
      {
        date: '2021-01-03',
        count: 3,
      },
    ];
    const expected = {
      totalDays: 3,
      totalCommits: 6,
      mostContributionsInSingleDay: 'Jan 03, 2021',
    };
    expect(getGithubStats(contributions)).toEqual(expected);
  });
});
