import {
  appendFeedInFeedsData,
  deepCopyArray,
  getNumberOfCardsColumns,
  separateFeedData,
  shuffleArray,
} from './util';

describe('Feed', () => {
  it('should return number of columns based on window width for desktop', () => {
    const data = getNumberOfCardsColumns(1920);
    expect(data).toStrictEqual(4);
  });
  it('should return number of columns based on window width for mobile', () => {
    const data = getNumberOfCardsColumns(475);
    expect(data).toStrictEqual(1);
  });
});

describe('deepCopyArray function', () => {
  it('should deepCopy the array', () => {
    const originalArray = [1];
    const deepCopiedArray = deepCopyArray(originalArray);
    expect(deepCopiedArray).toStrictEqual(originalArray);
    expect(deepCopiedArray).not.toBe(originalArray);
  });
});

describe('appendFeedInFeedsData function', () => {
  it('should process the data according to type mapping', () => {
    const appendedData = appendFeedInFeedsData(
      [],
      [
        { id: '1', type: 'type1' },
        { id: '2', type: 'type1' },
        { id: '3', type: 'type2' },
        { id: '4', type: 'type3' },
      ],
      1920,
    );
    const result = [
      [{ id: '1', type: 'type1' }],
      [{ id: '3', type: 'type2' }],
      [{ id: '2', type: 'type1' }],
      [{ id: '4', type: 'type3' }],
    ];
    expect(appendedData).toStrictEqual(result);
  });
  it('should append the data', () => {
    const appendedData = appendFeedInFeedsData(
      [
        [{ id: '5', type: 'type5' }],
        [{ id: '6', type: 'type5' }],
        [],
        [],
      ],
      [
        { id: '1', type: 'type1' },
        { id: '2', type: 'type1' },
        { id: '3', type: 'type2' },
        { id: '4', type: 'type3' },
      ],
      1920,
    );
    const result = [
      [
        { id: '5', type: 'type5' },
        { id: '1', type: 'type1' },
      ],
      [
        { id: '6', type: 'type5' },
        { id: '2', type: 'type1' },
      ],
      [{ id: '3', type: 'type2' }],
      [{ id: '4', type: 'type3' }],
    ];
    expect(appendedData).toStrictEqual(result);
  });
});

describe('separateFeedData function', () => {
  it('should separate and randomly order from feed response', () => {
    const result = [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '3',
      },
      {
        id: '4',
      },
      {
        id: '5',
      },
    ];
    const separatedFeedData = separateFeedData({
      articles: [
        {
          id: '1',
        },
      ],
      companies: [
        {
          id: '2',
        },
      ],
      jobs: [
        {
          id: '3',
        },
      ],
      users: [
        {
          id: '4',
        },
      ],
      posts: [
        {
          id: '5',
        },
      ],
    });
    expect(separatedFeedData).toStrictEqual(result);
  });
});

describe('shuffleArray', () => {
  it('should shuffle the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffledArr = shuffleArray(arr);
    expect(shuffledArr).not.toEqual(arr);
  });

  it('should not change the length of the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffledArr = shuffleArray(arr);
    expect(shuffledArr.length).toStrictEqual(arr.length);
  });

  it('should not change the elements of the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffledArr = shuffleArray(arr);
    expect(shuffledArr.sort()).toStrictEqual(arr.sort());
  });
});
