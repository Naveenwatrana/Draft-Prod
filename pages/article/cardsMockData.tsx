import lang from 'common/lang';
import AboutCardIcon from 'components/Icons/AboutCardIcon';
import ListCardIcon from 'components/Icons/LinksCardIcon';
import { CardTypes } from 'components/CardCreationWizard/types';
import { InputType } from 'components/input/types';

const { cards: { aboutCardDescription, linkCardDescription } } = lang;

export const data = [{
  id: 1,
  title: 'About Card',
  meta: aboutCardDescription,
  icon: <AboutCardIcon />,
  type: CardTypes.About,
  fieldValues: {},
  fields: [
    {
      id: 1,
      type: InputType.TEXT,
      label: 'description',
      maxCharacters: 50,
    },
    {
      id: 2,
      type: InputType.MEDIA,
      label: 'Add Media',
    },
  ],
  description: 'Go beyond a wall of text and describe yourself, your brand or a piece of content in less than 200 characters.',
},
{
  id: 2,
  title: 'Links',
  meta: linkCardDescription,
  icon: <ListCardIcon />,
  type: CardTypes.Link,
  fields: [],
  fieldValues: {
    links: [
      {
        title: '',
        url: '',
      },
    ],
  },
  description: 'Bring together all your key links on a single card designed to tell your community what to do or where to go.',
}];
