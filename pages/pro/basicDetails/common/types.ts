import { usePresignedUrlMutation } from 'common/utils/s3upload/service';
import { useUpdateUserMutation } from 'pages/pro/profileService';
import React from 'react';

type UpdateUserMutationHook = ReturnType<typeof useUpdateUserMutation>[0];
type PresignedUrl = ReturnType<typeof usePresignedUrlMutation>[0];

export type UploadContentProps = {
  labelText?: string;
  info: string;
  labelBrowse: string;
};

export type UploadContainerProps = {
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  imageName?: string;
  children: React.ReactNode;
};

export type ImageTitleProps = {
  fileName: string;
  removeImage: () => void;
};

export type UploadData = (
  data: {
    image: File | string;
    mantra: string;
    path?: string;
  },
  updateUserDetail: UpdateUserMutationHook,
  preSignedUrl: PresignedUrl,
  shouldUploadImage: boolean,
  shouldDeleteImage: boolean,
) => Promise<boolean>;
