import { formatDate } from './date/dateFormat';
import { Commit } from './types';

export const getGithubStats = (contributions: Commit[]) => {
  const totalDays = contributions.filter((commits: Commit) => commits.count > 0);
  const totalCommits = totalDays.map((commits: Commit) => commits.count).reduce((a: number, b: number) => a + b, 0);
  const mostContributionsInSingleDay = totalDays.sort((a: Commit, b: Commit) => b.count - a.count)[0].date;
  return {
    totalDays: totalDays.length,
    totalCommits,
    mostContributionsInSingleDay: formatDate(mostContributionsInSingleDay, 'MMM dd, yyyy'),
  };
};
