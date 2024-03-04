import { apiRootUrl, content } from 'common/utils/network/endpoints';

export const getContentApiUrl = (user: string, localCompanyUserName?: string) => {
  const url = `${apiRootUrl}${content}?username=${user}&page=1`;
  if (localCompanyUserName) {
    return `${url}&company=${localCompanyUserName}`;
  }
  return url;
};

export const profileTabs = [{
  name: 'Brand',
  onClick: '',
},
{
  name: 'Resume',
  onClick: 'resume',
},
{
  name: 'Content',
  onClick: 'content',
},
];

export const orgTabs = [{
  name: 'Brand',
  onClick: '',
},
{
  name: 'Insights',
  onClick: 'insights',
},
{
  name: 'Content',
  onClick: 'content',
},
{
  name: 'Jobs',
  onClick: 'jobs',
},
];
