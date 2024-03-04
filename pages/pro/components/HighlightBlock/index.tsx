import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import lang from 'common/lang';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import Loader from 'components/Loader/Loader';
import { deleteMediaFile, uploadMediaFile } from 'utils/uploadMediaFile';
import { mediaValidations } from 'components/CardCreationWizard/components/CardFields/utils';
import { IImage } from 'components/ImageUpload/types';
import { useAppSelector } from 'common/hooks/state';
import {
  Container,
  EditName as TextBlockTitle,
} from './style';
import { IHighlightBlockFormValues } from './types';
import { highLightBlockSchema } from '../../basicDetails/schema';
import { CrossIconWrapper } from '../ActionSection/style';
import { useAddBlockMutation, useEditBlockMutation } from '../../profileService';
import { showNotification } from '../Projects/util';
import { NotificationType } from '../Projects/ViewProject/types';
import { BlockType, BlocksEntity } from '../../types';
import HighlightBlockForm from './Form';

type HighlightBlockProps = {
  onClose: () => void;
  block?: BlocksEntity;
  numberOfBlocks?: number;
  setSkip: () => void;
};

const {
  profile: {
    block: {
      highlight: { title: highlightTitle },
    },
  },
} = lang;

const { imageError } = lang.cardCreationWizard;

const HighlightBlock = ({
  onClose, block, numberOfBlocks, setSkip,
}: HighlightBlockProps) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [addBlock, result] = useAddBlockMutation();
  const [editBlock, editBlockResult] = useEditBlockMutation();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IHighlightBlockFormValues>({
    resolver: yupResolver(highLightBlockSchema),
    defaultValues: {
      title: block?.fields?.title,
      media: (block?.fields?.media as string),
    },
  });
  const editMedia = async (mediaFileUrl: string, newMediaFile: File) => {
    try {
      await deleteMediaFile(mediaFileUrl as string);
      const mediaPath = await uploadMediaFile(newMediaFile, currentUser.username);
      if (mediaPath) {
        return mediaPath;
      }
    } catch (error: any) {
      showNotification(error?.data?.message, NotificationType.ERROR);
    }
  };
  const onSubmit: SubmitHandler<IHighlightBlockFormValues> = async (data) => {
    setSkip();
    setLoading(true);
    const companyDetails = {
      blockable_type: 'companies',
      blockable_id: userIsCompany?.id,
    };
    if (block?.id) {
      const body = {
        type: BlockType.HIGHLIGHT,
        sort: block?.sort || numberOfBlocks,
        fields: {
          title: data?.title,
          media: data.media,
        },
      };
      if (data.media !== block?.fields?.media) {
        const path = await editMedia(block.fields.media as string, (data.media as IImage).file);
        body.fields.media = path;
      }
      editBlock({
        id: block.id,
        payload: {
          ...body,
          ...(userIsCompany ? companyDetails : {}),
        },
      }).unwrap().then((e) => {
        onClose();
      }).catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      }).finally(() => {
        setLoading(false);
      });
      return;
    }
    if (data.media && (data.media as IImage).file) {
      setLoading(true);
      const mediaPath = await uploadMediaFile((data.media as IImage).file, currentUser.username);
      if (mediaPath) {
        const body = {
          type: BlockType.HIGHLIGHT,
          sort: block?.sort || numberOfBlocks,
          fields: {
            title: data?.title,
            media: mediaPath,
          },
        };
        addBlock({
          ...body,
          ...(userIsCompany ? companyDetails : {}),
        }).unwrap().then((e) => {
          onClose();
        }).catch((error) => {
          showNotification(error?.data?.message, NotificationType.ERROR);
        }).finally(() => {
          setLoading(false);
        });
      }
    }
  };
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
    setValue('media', { file: files[0], id: uuidv4() }, { shouldValidate: true, shouldDirty: true });
  };

  const withMedia = true;
  const watchMedia = watch('media');

  return (
    <Container>
      {(result.isLoading || editBlockResult.isLoading || loading) && <Loader />}
      <TextBlockTitle component="h2">{highlightTitle}</TextBlockTitle>
      <CrossIconWrapper onClick={onClose} />
      <HighlightBlockForm
        handleSubmit={handleSubmit(onSubmit)}
        withMedia={withMedia}
        formFields={{
          media: watchMedia,
          title: watch('title'),
        }}
        errors={errors}
        register={register}
        onUploadMedia={onUploadMedia}
        removeMedia={removeMedia}
        onClose={onClose}
        block={block}
      />
    </Container>
  );
};

export default HighlightBlock;
