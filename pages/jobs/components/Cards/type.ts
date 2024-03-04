import { IOption } from 'components/MultipleInputTextArea/types';
import { IFeedData } from 'pages/feed/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';

export type SkillsYouHaveCardProps = {
  skills: IOption[];
};

export type OptionsProps = {
  withoutBorder?: boolean;
  contained?: boolean;
};

export type GridItemProps = {
  fullWidth?: boolean;
};

export type DefaultJobCardProps = {
  coverCardData: JobCoverCardFelids;
  centered?: boolean;
  height?: number;
  width?: number;
  onSave?: () => void;
  editable?: boolean;
  jobDetailsData?: IFeedData;
};
