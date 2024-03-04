import { yupResolver } from '@hookform/resolvers/yup';
import lang from 'common/lang';
import { v4 as uuidv4 } from 'uuid';
import { mediaValidations } from 'components/CardCreationWizard/components/CardFields/utils';
import MediaUpload from 'components/ImageUpload/MediaUpload';
import { uploadImageCardSchema } from 'pages/post/create/schema';
import { IUploadImageCard } from 'pages/post/create/type';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UploadMediaContentProps } from './type';
const {
  cardCreationWizard: { imageError },
} = lang;

const UploadMediaContent = ({ onAdd, showFileSpecification, showAspectRatioInfo }: UploadMediaContentProps) => {
  const {
    setValue,
    setError,
    formState: { errors },
  } = useForm<IUploadImageCard>({
    resolver: yupResolver(uploadImageCardSchema),
  });
  const removeMedia = () => {
    setValue('media', null);
  };
  const onUploadMedia = async (files: File[] | null) => {
    if (!files) {
      removeMedia();
      return;
    }
    const isMediaValid = await mediaValidations(files[0]);
    if (!isMediaValid) {
      setError('media', { message: imageError });
      return;
    }
    onAdd({ file: files[0], id: uuidv4() });
  };
  return (
    <MediaUpload
      onDrop={onUploadMedia}
      error={!!errors.media?.message}
      errorMessage={errors.media?.message}
      data-cy="imageUpload"
      showFileSpecification={showFileSpecification}
      showAspectRatioInfo={showAspectRatioInfo}
    />
  );
};

export default UploadMediaContent;
