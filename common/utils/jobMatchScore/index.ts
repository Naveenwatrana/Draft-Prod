export const jobMatchScore = (totalSkills: number, matchedSkills: number) => {
  if (totalSkills === 0 || matchedSkills === 0) return 0;
  return Math.round((matchedSkills / totalSkills) * 100);
};
