import { usePresignedUrlMutation } from 'common/utils/s3upload/service';
import { useOnboardingMutation } from 'pages/pro/profileService';
import React, { ReactNode } from 'react';

type Onboarding = ReturnType<typeof useOnboardingMutation>[0];
type PresignedUrl = ReturnType<typeof usePresignedUrlMutation>[0];

export type UploadContentProps = {
  labelText?: string;
  info?: string;
  labelBrowse: string;
  fileSize?: ReactNode;
  info1?: string;
  info2?: string;
};

export type UploadContainerProps = {
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  children: React.ReactNode;
  imageName?: string;
};

export type ImageTitleProps = {
  fileName: string;
  removeImage: () => void;
};

export type UploadData = (
  data: {
    image: File;
    mantra: string;
  } | null,
  onBoarding: Onboarding,
  preSignedUrl?: PresignedUrl,
) => Promise<boolean>;
