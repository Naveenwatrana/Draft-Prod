import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { getCard, updateCardFields, updateCardStatus } from 'components/CardCreationWizard/slice';
import { Card, ImageFields } from 'components/CardCreationWizard/types';
import lang from 'common/lang';
import { FILE_SIZE_ONE_MB } from 'common/constants';
import { CoverCardFieldsProps } from '../types';
import { ICoverCardFields, schema, schemaForMantraNotRequired } from './types';
import { checkLocalImage, getFileFromUrl } from './util';
import Form from './Form';
import { mediaValidations } from '../utils';

const { imageError } = lang.cardCreationWizard;
const { company } = lang;

const CoverCardFields = ({
  selectedCard, withMedia = true, withLogo, handleEditImage, jobCoverCardsData,
}: CoverCardFieldsProps) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector<Card>(getCard(selectedCard.id));

  const defaultValues = {
    mantra: card?.fieldValues?.mantra as string || '',
    media: card.fieldValues?.media as string || null,
    logo: card.fieldValues?.logo as string || null,
  };

  const {
    watch,
    setValue,
    setError,
    formState: {
      errors, isValid, touchedFields,
    },
  } = useForm<ICoverCardFields>({
    resolver: yupResolver(jobCoverCardsData ? schemaForMantraNotRequired : schema),
    defaultValues,
    mode: 'onChange',
  });
  useEffect(() => {
    if (card?.fieldValues?.logo) {
      const isLocal = checkLocalImage(card.fieldValues.logo as string);
      if (!isLocal) {
        return;
      }
      getFileFromUrl(card?.fieldValues?.logo as string, card?.fieldValues?.fileType as string)
        .then((file) => {
          const logoFile = { file, id: uuidv4() };
          setValue('logo', logoFile);
        });
    }
  }, [card?.fieldValues?.logo, setValue, card?.fieldValues?.fileType]);
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
    const isFormValid = isValid || (Object.keys(touchedFields).length > 0 && Object.keys(errors).length < 1);
    dispatch(updateCardStatus({ id: card.id, status: isFormValid }));
  }, [
    card, isValid, setValue, dispatch, watch, errors, touchedFields,
  ]);

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
    const filePayload = {
      id: selectedCard.id, field: ImageFields.media, value: URL.createObjectURL(files[0]),
    };
    if (files[0].type.includes('video')) {
      dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.localVideo, value: true }));
    }
    dispatch(updateCardFields(filePayload));
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.fileType, value: files[0].type }));
    if (handleEditImage && !files[0].type.includes('video')) {
      handleEditImage(true);
    }
  };
  const onUploadLogo = async (files: File[] | null) => {
    if (!files) {
      removeLogo();
      return;
    }
    if (files[0].size <= FILE_SIZE_ONE_MB) {
      const img = new Image();
      img.src = URL.createObjectURL(files[0]);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        if (width === height && width >= 200) {
          setValue(
            'logo',
            { file: files[0], id: uuidv4() },
            { shouldValidate: true, shouldDirty: true },
          );
          const filePayload = {
            id: selectedCard.id, field: 'logo', value: img.src,
          };
          dispatch(updateCardFields(filePayload));
        } else {
          setError('logo', {
            message: company.logoError,
          });
        }
      };
    } else {
      setError('logo', { message: 'Error' });
    }
  };
  const updateMantra = (e: string) => {
    dispatch(updateCardFields({ id: selectedCard.id, field: 'mantra', value: e }));
    setValue('mantra', e, { shouldValidate: true, shouldDirty: true });
  };
  const removeMedia = () => {
    setValue('media', null);
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.media, value: '' }));
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.fileType, value: '' }));
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.localVideo, value: '' }));
    dispatch(updateCardFields({ id: selectedCard.id, field: ImageFields.croppedImage, value: '' }));
  };
  const removeLogo = () => {
    setValue('logo', null);
    dispatch(updateCardFields({ id: selectedCard.id, field: 'logo', value: '' }));
  };
  return (
    <Form
      fields={{
        mantra: watch('mantra'),
        media: watch('media'),
        logo: watch('logo'),
      }}
      updateMantra={updateMantra}
      removeMedia={removeMedia}
      removeLogo={removeLogo}
      onUploadMedia={onUploadMedia}
      onUploadLogo={onUploadLogo}
      errors={errors}
      withMedia={withMedia}
      withLogo={withLogo}
      jobCoverCardsData={jobCoverCardsData}
    />
  );
};

export default memo(CoverCardFields);
