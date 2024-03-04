import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { getCard, updateCardFields, updateCardStatus } from 'components/CardCreationWizard/slice';
import lang from 'common/lang';
import { Card, ImageFields } from 'components/CardCreationWizard/types';
import { CoverCardFieldsProps } from '../types';
import { IAboutCardFields, schema } from './types';
import { checkLocalImage, getFileFromUrl } from '../CoverCardFields/util';
import Form from './Form';
import { mediaValidations } from '../utils';

const { imageError } = lang.cardCreationWizard;

const AboutCardFields = ({ selectedCard, withMedia = true, handleEditImage }: CoverCardFieldsProps) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector<Card>(getCard(selectedCard.id));
  const defaultValues = {
    heading: card?.fieldValues?.heading as string || '',
    description: card?.fieldValues?.description as string || '',
    media: card.fieldValues?.media as string || null,
  };

  const {
    watch,
    setValue,
    setError,
    formState: {
      errors, isValid, isDirty, touchedFields,
    },
  } = useForm<IAboutCardFields>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    setValue('heading', card?.fieldValues?.heading as string || '');
  }, [card?.fieldValues?.heading, setValue]);

  useEffect(() => {
    setValue('description', card?.fieldValues?.description as string || '');
  }, [card?.fieldValues?.description, setValue]);

  useEffect(() => {
    if (card?.fieldValues?.media) {
      const isLocal = checkLocalImage(card.fieldValues.media as string);
      if (!isLocal) {
        return;
      }
      getFileFromUrl(card?.fieldValues?.media as string, card?.fieldValues?.fileType as string)
        .then((file) => {
          const mediaFile = { file, id: uuidv4() };
          setValue('media', mediaFile);
        });
    } else {
      setValue('media', null);
    }
  }, [card?.fieldValues?.media, setValue, card?.fieldValues?.fileType]);
  useEffect(() => {
    if (isDirty || touchedFields) {
      dispatch(updateCardStatus({ id: card.id, status: isValid }));
    }
  }, [isValid, isDirty, touchedFields, dispatch, card.id]);

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
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.media, value: URL.createObjectURL(files[0]) }));
    if (files[0].type.includes('video')) {
      dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.localVideo, value: true }));
      dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.fileType, value: files[0].type }));
    }
    if (handleEditImage && !files[0].type.includes('video')) {
      handleEditImage(true);
    }
  };
  const updateValue = (e: string, key: string) => {
    dispatch(updateCardFields({ id: selectedCard.id, field: key, value: e }));
    setValue(key as keyof IAboutCardFields, e, { shouldValidate: true, shouldDirty: true });
  };
  const removeMedia = () => {
    setValue('media', null);
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.media, value: '' }));
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.fileType, value: '' }));
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.localVideo, value: '' }));
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.croppedImage, value: '' }));
  };
  return (
    <Form
      fields={{
        heading: watch('heading'),
        description: watch('description'),
        media: watch('media'),
      }}
      updateValue={updateValue}
      removeMedia={removeMedia}
      onUploadMedia={onUploadMedia}
      errors={errors}
      withMedia={withMedia}
      selectedCard={card}
    />
  );
};

export default AboutCardFields;
