export enum CardSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
export type DefaultCardProps = {
  type: string;
  width?: string;
  height?: string;
  primaryText?: string;
  secondaryText?: string;
  tertiaryText?: string;
  tertiaryPairText?: [string, string];
  isLocalVideo?: string;
  longText?: string;
  size?: CardSizes;
  longTextTitle?: string;
  isSplitCard?: boolean;
  isStopped?: boolean;
  followUser?: () => void;
  range?: {
    from: number;
    to: number;
  };
  icon?: string;
  cover?: string;
  totalCardsinStack?: number;
  primaryFontSize?: string;
  hideHeader?: boolean;
  showCardType?: boolean;
  showSave?: boolean;
  onClick?: () => void;
  links?: {
    name: string;
    url: string;
  }[];
  projects?: {
    name: string;
    role: string;
    duration: {
      from: number;
      to: number;
    };
  }[];
  hideBorder?: boolean;
  className?: string;
  withFollowButton?: boolean;
  userId?: string;
  isAuthorCompany?: boolean;
  following?: boolean;
  userNameClickable?: boolean;
};

export type ContentSectionProps = {
  primaryFontSize?: string;
  longText?: string;
  longTextTitle?: string;
  icon?: string;
  secondaryText?: string;
  size?: CardSizes;
  type?: string;
  range?: {
    from: number;
    to: number;
  };
  tertiaryText?: string;
  tertiaryPairText?: [string, string];
  links?: {
    name: string;
    url: string;
  }[];
  primaryText?: string;
  shrinkText?: boolean;
  withFollowButton?: boolean;
  userId?: string;
  isAuthorCompany?: boolean;
  followUser?: () => void;
  following?: boolean;
  userNameClickable?: boolean;
};

export type DefaultCardHeaderProps = {
  hideHeader?: boolean;
  totalCardsinStack?: number;
  type: string;
  showCardType?: boolean;
  showSave?: boolean;
};

export type ProjectSectionProps = {
  primaryFontSize?: string;
  projects?: {
    name: string;
    role: string;
    duration: {
      from: number;
      to: number;
    };
  }[];
};
