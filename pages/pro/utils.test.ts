import { apiRootUrl, content } from 'common/utils/network/endpoints';
import { getContentApiUrl } from './utils';

describe('Profile Utilities', () => {
  it('should return content api endpoint with company', () => {
    const url = getContentApiUrl('user', 'company');
    expect(url).toBe(`${apiRootUrl}${content}?username=user&page=1&company=company`);
  });
  it('should return content api endpoint without company', () => {
    const url = getContentApiUrl('user');
    expect(url).toBe(`${apiRootUrl}${content}?username=user&page=1`);
  });
});
