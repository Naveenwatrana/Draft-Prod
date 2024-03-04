import { ReactElement } from 'react';

export type PreviewCardProps = {
    picture: string;
    children?: ReactElement | ReactElement[];
    cypressLocator?: string;
    className?: string;
    height?: number;
  }

export type ImageSectionProps = {
    image: string;
  }
export type ImageContainerProps = {
    height?: number;
};

export type StyledCardProps = {
  image?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}
