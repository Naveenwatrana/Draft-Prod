import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { getCard, updateCardFields, updateCardStatus } from 'components/CardCreationWizard/slice';
import { Card, ImageFields } from 'components/CardCreationWizard/types';
import lang from 'common/lang';
import { CoverCardFieldsProps } from '../types';
import { schema, ILinkCardFields, ILink } from './types';
import { checkLocalImage, getFileFromUrl } from '../CoverCardFields/util';
import Form from './Form';
import { mediaValidations } from '../utils';

const { imageError } = lang.cardCreationWizard;

const LinkCardFields = ({ selectedCard, withMedia = true, handleEditImage }: CoverCardFieldsProps) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector<Card>(getCard(selectedCard.id));
  const {
    watch,
    setValue,
    setError,
    formState: {
      errors, isValid, isDirty, touchedFields,
    },
  } = useForm<ILinkCardFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      media: card.fieldValues?.media as string || null,
      links: card.fieldValues?.links as ILink[] || [],
    },
  });
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
    }
  }, [card?.fieldValues?.media, setValue, card?.fieldValues?.fileType]);

  useEffect(() => {
    if (isDirty || touchedFields) {
      dispatch(updateCardStatus({ id: card.id, status: isValid }));
    }
  }, [isValid, isDirty, touchedFields]);

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
    if (files[0].type.includes('video')) {
      dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.localVideo, value: true }));
      dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.fileType, value: files[0].type }));
    }
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.media, value: URL.createObjectURL(files[0]) }));
    if (handleEditImage && !files[0].type.includes('video')) {
      handleEditImage(true);
    }
  };
  const updateValue = (key: string, value: ILink[]) => {
    dispatch(updateCardFields({ id: selectedCard.id, field: key, value }));
    setValue(key as keyof ILinkCardFields, value, { shouldValidate: true, shouldDirty: true });
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
        media: watch('media'),
        links: watch('links') as ILink[] || [],
      }}
      removeMedia={removeMedia}
      onUploadMedia={onUploadMedia}
      errors={errors}
      withMedia={withMedia}
      selectedCard={selectedCard}
      updateValue={updateValue}
    />
  );
};

export default LinkCardFields;
