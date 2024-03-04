import { loginUrl } from 'common/utils/network/appRouts';
import { NavigationType } from './Header/types';
import meltWaterImage from './images/meltwater.png';

export const videoCard = {
  title: 'Why you should consider a career in tech',
  id: 7,
  date: '2 days ago',
  published_date: '2 days ago',
  comments_count: 32,
  upvotes_count: 1300,
  media: ['https://draft-prod.akamaized.net/data/banner-video.mp4'],
  creator: {
    name: 'Fast Company',
    cards: [
      {
        fields: {
          media: 'https://draftfl.akamaized.net/the-draft/1694694563623_img_82_png.png',
        },
      },
    ],
  },
};
export const meltwaterCard = {
  image: meltWaterImage.src,
  header: "How Gen Z's Impact On The Workplace Continues To Grow",
  status: true,
  author: 'Fast Company',
  domain: 'https://www.fastcompany.com/',
  id: 1,
};
export const cards = [{
  author: 'Sarabjeet Singh',
  id: 1,
  title: 'Why millennials, not Gen Z, became the side hustle generation',
  comments_count: 32,
  upvotes_count: 1300,
  creator: {
    name: 'Fast Company',
    cards: [
      {
        fields: {
          media: 'https://draftfl.akamaized.net/the-draft/1694694563623_img_82_png.png',
        },
      },
    ],
  },
  preview_image: 'https://draftfl.akamaized.net/barry-allen/1706601923124_coverimage_png.png',
},
{
  title: 'Why you should consider a career in tech',
  id: 2,
  date: '2 days ago',
  published_date: '2 days ago',
  preview_image: 'https://draftfl.akamaized.net/tiktok/1694691480227_img_53_jpeg.jpeg',
},
{
  author: 'Sarabjeet Singh',
  id: 3,
  title: 'How to build a great company culture',
  preview_image: 'https://draftfl.akamaized.net/rockstar-games/1694756317281_img_75_jpeg.jpeg',
},
{
  title: 'America\'s offices are emptier than at any point in at least four decades, reflecting years of overbuilding and shifting work habits',
  id: 4,
  date: '2 days ago',
  published_date: '2 days ago',
  preview_image: 'https://draftfl.akamaized.net/tiktok/1694691480227_img_53_jpeg.jpeg',
},
{
  title: 'New York Wants More Electric Ubers. Everyone Is Mad',
  id: 4,
  date: '2 days ago',
  published_date: '2 days ago',
  preview_image: 'https://draftfl.akamaized.net/rockstar-games/1694756317281_img_75_jpeg.jpeg',
},
];
export const mockJob = {
  matches: {
    base_salary_match: true,
    location_type: true,
    location: true,
    skills: true,
  },
  salary_from: 100000,
  salary_to: 200000,
  location_type: 'Hybrid',
  location: 'New York, NY',
  user_matched_skills_count: 8,
  job_skills_count: 12,
  match_score: 87,
  company: {
    logo: 'https://draftfl.akamaized.net/roblox/1694756107380_img_88_jpeg.jpeg',
    name: 'Roblox',
  },
  title: 'Software Engineer',
  created_at: '2024-01-10T18:30:00.000Z',
};
export const userDanBrown = {
  UserImage: 'https://draft-prod.akamaized.net/data/dan-brown.png',
  username: 'Dan Brown',
  location: 'Jacksonville, FL ',
  bio: 'Passionate marketer with a flair for creativity, helping brands soar to new heights through strategic campaigns. #MarketingGuru"',
  tags: ['Leadership', 'Copywriting', 'Marketing', 'Strategy', 'Content Marketing', '3+'],
};
export const userBartek = {
  UserImage: 'https://draft-prod.akamaized.net/data/bartek.png',
  username: 'Dan Brown',
  location: 'Jacksonville, FL ',
  bio: 'Passionate marketer with a flair for creativity, helping brands soar to new heights through strategic campaigns. #MarketingGuru"',
  tags: ['Leadership', 'Copywriting', 'Marketing', 'Strategy', 'Content Marketing', '3+'],
};

export const links = [{
  id: 1,
  name: 'You',
  type: NavigationType.YOU,
  link: '/#you',
}, {
  id: 2,
  name: 'Connect',
  type: NavigationType.CONNECT,
  link: '/#connect',
}, {
  id: 3,
  name: 'Explore',
  type: NavigationType.EXPLORE,
  link: '/#explore',
}, {
  id: 4,
  name: 'Career',
  type: NavigationType.CAREER,
  link: '/#career',
}];
export const secondaryNavLinks = [{
  id: 5,
  name: 'For Business',
  type: NavigationType.FOR_BUSINESS,
  link: '/business',
}];
export const prodMenu = [{
  id: 5,
  name: 'For Business',
  type: NavigationType.FOR_BUSINESS,
  link: '/business',
}, {
  id: 6,
  name: 'Login',
  type: NavigationType.LOGIN,
  link: loginUrl,
}];
