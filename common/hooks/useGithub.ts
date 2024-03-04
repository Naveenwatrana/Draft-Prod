import { getGithubStats } from 'common/utils/getGithubStats';
import { Contributions } from 'common/utils/types';

const useGithub = () => {
  const getUserContributions = async (username: string, year: number): Promise<Contributions> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_GITHUB_STATS_API_LINK as string}${username}?y=${year}`;
      const response = await fetch(url);
      const results = await response.json();
      return getGithubStats(results.contributions);
    } catch (e) {
      return { totalDays: 0, totalCommits: 0, mostContributionsInSingleDay: '' };
    }
  };
  return {
    getUserContributions,
  };
};

export default useGithub;
