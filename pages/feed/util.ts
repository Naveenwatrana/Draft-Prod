import { FeedResponse, IFeedData } from './types';

const defaultWindowWidth = 450;
const defaultCardWidth = 396;
const defaultSpacing = 20;
export const getNumberOfCardsColumns = (
  windowWidth: number,
  cardWidth: number = defaultCardWidth,
  spacing: number = defaultSpacing,
) => windowWidth > 2 * cardWidth ? Math.floor(((windowWidth || defaultWindowWidth) - spacing) / cardWidth) : 1;

export function deepCopyArray<T>(array: Array<T>): Array<T> {
  return JSON.parse(JSON.stringify(array));
}

export const appendFeedInFeedsData = (previousFeeds: IFeedData[][], feed: IFeedData[], width: number): IFeedData[][] => {
  try {
    const feedDataToAppend: IFeedData[] = deepCopyArray(feed);
    const numberOfColumn = getNumberOfCardsColumns(width);
    const feedsData: IFeedData[][] = previousFeeds?.length ? deepCopyArray(previousFeeds) : new Array(numberOfColumn).fill('').map(() => []);
    const lastIndexX = feedsData.findIndex((d) => d.length);
    const lastIndexY = feedsData?.[lastIndexX]?.findIndex((d) => d?.id);
    let indexX = lastIndexX > -1 ? lastIndexX : 0;
    let indexY = lastIndexY > -1 ? lastIndexY : 0;
    for (let index = 0; index < feedDataToAppend.length; index += 1) {
      const element = feedDataToAppend[index];
      if (feedsData?.[indexX]?.[indexY - 1]?.type === element?.type || (feedsData?.[indexX - 1]?.[indexY]?.type === element?.type)) {
        const previousMatchingIndex = feedDataToAppend.findIndex((aa) => aa.type !== element.type);
        if (previousMatchingIndex > -1) {
          feedsData[indexX].push(feedDataToAppend[previousMatchingIndex]);
          feedDataToAppend.splice(previousMatchingIndex, 1);
          index -= 1;
        } else {
          feedsData[indexX].push(element);
          feedDataToAppend.splice(index, 1);
          index -= 1;
        }
      } else {
        feedsData[indexX].push(element);
        feedDataToAppend.splice(index, 1);
        index -= 1;
      }
      if (indexX >= numberOfColumn - 1) {
        indexX = 0;
        indexY += 1;
      } else {
        indexX += 1;
      }
    }
    return feedsData;
  } catch (error) {
    return [];
  }
};

export const separateFeedData = (feedRes: FeedResponse): IFeedData[] => {
  return Object.values(feedRes).flatMap((value) => value);
};

export function shuffleArray<T>(arr: T[]): T[] {
  const array = deepCopyArray(arr);
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function formatWebsiteName(website: string): string {
  const formatedWebsite = website.replace('https://', '').replace('http://', '').replace('www.', '');
  return formatedWebsite;
}
