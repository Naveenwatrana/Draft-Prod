import {
  formatCloseJobPayload, getSkillsNotMatched, mapMatchingFields, whoYouAreFieldsMap, cleanObject,
} from './utils';

describe('getSkillsNotMatched', () => {
  it('should return unique values from array', () => {
    const matchedSkills = [
      { id: 'a', tag: 'a', type: 'skill' },
    ];
    const allSkills = [
      { id: 'a', tag: 'a', type: 'skill' },
      { id: 'b', tag: 'b', type: 'skill' },
    ];
    const expected = ['b'];
    const result = getSkillsNotMatched(matchedSkills, allSkills);
    expect(result).toEqual(expected);
  });
  it('should return all skills if no skills are matched', () => {
    const matchedSkills = [
      { id: 'a', tag: 'a', type: 'skill' },
    ];
    const allSkills = [
      { id: 'b', tag: 'b', type: 'skill' },
    ];
    const expected = ['b'];
    const result = getSkillsNotMatched(matchedSkills, allSkills);
    expect(result).toEqual(expected);
  });
  it('should return empty array if undefined array passed', () => {
    const matchedSkills = undefined;
    const allSkills = undefined;
    const expected: string[] = [];
    const result = getSkillsNotMatched(matchedSkills, allSkills);
    expect(result).toEqual(expected);
  });
});

describe('formatCloseJobPayload', () => {
  it('should return the payload for close job edit api', () => {
    const closeJobValues = {
      hiredForThisRole: true,
      foundCandidateOnDraft: true,
      candidateName: { label: 'Candidate A', value: '123' },
    };
    const expected = {
      candidate_name: 'Candidate A',
      candidate_user_id: 123,
      found_candidate_on_the_draft: true,
      hired: true,
    };
    const result = formatCloseJobPayload(closeJobValues);
    expect(result).toEqual(expected);
  });
  it('should filter out null values from payload', () => {
    const closeJobValues = {
      hiredForThisRole: true,
      foundCandidateOnDraft: null,
      candidateName: null,
    };
    const expected = {
      hired: true,
    };
    const result = formatCloseJobPayload(closeJobValues);
    expect(result).toEqual(expected);
  });
  it('should allow false value in nullable field from values from payload', () => {
    const closeJobValues = {
      hiredForThisRole: true,
      foundCandidateOnDraft: false,
    };
    const expected = {
      hired: true,
      found_candidate_on_the_draft: false,
    };
    const result = formatCloseJobPayload(closeJobValues);
    expect(result).toEqual(expected);
  });
});

describe('mapMatchingFields', () => {
  it('should return mapped matched values', () => {
    const matched = {
      base_salary_match: true,
      target_earning: true,
      employment_type: true,
      location_type: true,
      location: false,
    };
    const result = mapMatchingFields(whoYouAreFieldsMap, matched);
    const expected = ['salaryFrom', 'oteFrom', 'employmentType'];
    expect(result).toEqual(expected);
  });
});

describe('cleanObject', () => {
  it('should remove properties with undefined values', () => {
    const obj = { prop1: 'value1', prop2: undefined };
    const cleaned = cleanObject(obj);
    expect(cleaned).toEqual({ prop1: 'value1' });
  });

  it('should remove properties with null values', () => {
    const obj = { prop1: 'value1', prop2: null };
    const cleaned = cleanObject(obj);
    expect(cleaned).toEqual({ prop1: 'value1' });
  });

  it('should not remove properties with other falsy values', () => {
    const obj = {
      prop1: 'value1', prop2: 0, prop3: '', prop4: false,
    };
    const cleaned = cleanObject(obj);
    expect(cleaned).toEqual({
      prop1: 'value1', prop2: 0, prop3: '', prop4: false,
    });
  });

  it('should return an empty object if all properties have undefined or null values', () => {
    const obj = { prop1: undefined, prop2: null };
    const cleaned = cleanObject(obj);
    expect(cleaned).toEqual({});
  });

  it('should return an empty object if the input object is empty', () => {
    const obj = {};
    const cleaned = cleanObject(obj);
    expect(cleaned).toEqual({});
  });
});
