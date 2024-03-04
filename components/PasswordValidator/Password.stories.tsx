import { ComponentStory, ComponentMeta } from '@storybook/react';
import PasswordValidator from 'components/PasswordValidator/Password';
import StoryWrapper from 'components/wrapper/wrapper';
import { REGEX_CAPITAL_LETTER, REGEX_MIN_EIGHT_CHARACTER, REGEX_SPECIAL_CHARACTER } from 'common/constants';

export default {
  title: 'DesignSystem/PasswordValidator',
  component: PasswordValidator,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PasswordValidator>;

const Template: ComponentStory<typeof PasswordValidator> = (args) => <StoryWrapper><PasswordValidator {...args} /></StoryWrapper>;

export const SimpleInput = Template.bind({});
SimpleInput.args = {
  validations: [
    { message: '8 characters', valid: (value) => REGEX_MIN_EIGHT_CHARACTER.test(value), id: 1 },
    { message: '1 upper case letter', valid: (value) => REGEX_CAPITAL_LETTER.test(value), id: 2 },
    { message: '1 special characer', valid: (value) => REGEX_SPECIAL_CHARACTER.test(value), id: 3 },
  ],
};
