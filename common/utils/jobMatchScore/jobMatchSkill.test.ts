import { jobMatchScore } from '.';

describe('jobMatchScore', () => {
  it('should return 0 if totalSkills is 0', () => {
    expect(jobMatchScore(0, 10)).toEqual(0);
  });
  it('should return 0 if matchedSkills is 0', () => {
    expect(jobMatchScore(10, 0)).toEqual(0);
  });
  it('should return 100 if totalSkills is equal to matchedSkills', () => {
    expect(jobMatchScore(10, 10)).toEqual(100);
  });
  it('should return 50 if totalSkills is double of matchedSkills', () => {
    expect(jobMatchScore(10, 5)).toEqual(50);
  });
});
