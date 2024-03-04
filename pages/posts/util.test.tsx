import { PostViewResponse } from 'components/Molecules/ViewContent/types';
import { mapOldPost } from './util';

describe('mapOldPost', () => {
  it('should return reordered array', () => {
    const objectUnderTest: PostViewResponse = {
      cards: [
        {
          id: '1',
          type: 'card',
          fields: {
            media: 'a',
            mantra: 'test mantra',
            description: '',
            heading: '',
            links: [],
          },
        },
      ],
      creator: {
        first_name: '',
        last_name: '',
        presigned_profile_cover: '',
        logo: undefined,
        name: '',
        id: '',
        followed: false,
        username: '',
        cards: undefined,
      },
      published_date: null,
      id: '',
      saved: false,
      upvotes: [],
      saves_count: 0,
      upvotes_count: 0,
      creator_type: '',
      tags: [],
    };
    const result = { caption: 'test mantra', media: ['a'], tags: [] };
    const newPostData = mapOldPost(objectUnderTest);
    expect(result).toEqual(newPostData);
  });
});
