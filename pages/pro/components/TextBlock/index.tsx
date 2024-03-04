import React from 'react';
import { ToastContainer } from 'react-toastify';
import Divider from 'components/Divider/Divider';
import { InputType } from 'components/inputComp/types';
import lang from 'common/lang';
import Description from 'components/Description/Description';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BLOCK_TITLE_MAX_LENGTH } from 'common/constants';
import {
  ButtonGroup,
  Container,
  EditName as TextBlockTitle,
  Form,
  SkipButton,
  SubmitButton,
  LabelText,
  TitleComp,
} from './style';
import { ITextBlockFormValues } from './types';
import { textBlockSchema } from '../../basicDetails/schema';
import { CrossIconWrapper } from '../ActionSection/style';
import { BlocksEntity } from '../../types';

type TextBlockProps = {
  onClose: () => void;
  block?: BlocksEntity;
  onSubmit: SubmitHandler<ITextBlockFormValues>;
};

const {
  buttonText,
  profile: {
    block: {
      text: { form, title: textBlockTitle },
    },
  },
  onBoarding: { name },
} = lang;

const TextBlock = ({ onClose, block, onSubmit }: TextBlockProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ITextBlockFormValues>({
    resolver: yupResolver(textBlockSchema),
    defaultValues: {
      title: block?.fields?.title, description: block?.fields?.description,
    },
  });

  const watchTitle = watch('title');
  const watchDesc = watch('description');

  const disabledButton = !watchDesc?.trim() || (watchDesc === block?.fields?.description && block?.fields?.title === watchTitle);

  return (
    <Container>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <TextBlockTitle component="h2">{textBlockTitle}</TextBlockTitle>
      <CrossIconWrapper onClick={onClose} />
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TitleComp
          type={InputType.TEXT}
          labelText={form.title.label}
          id="title"
          placeholder={form.title.placeholder}
          register={register}
          error={errors?.title || (watchTitle?.length > BLOCK_TITLE_MAX_LENGTH ? { type: 'max', message: name.limitError } : undefined)}
          textArea={true}
          data-cy="basicDetailFirstNameInput"
        />
        <span>
          <LabelText component="h6">{form.description.label}</LabelText>
          <Description
            value={watchDesc}
            setValue={(e) => setValue('description', e)}
            maxCharacters={1000}
            placeholder={form.description.placeholder}
            height={241}
            data-cy="summary"
          />
        </span>
        <Divider />
        <ButtonGroup>
          <SkipButton
            primary
            variant="link"
            label={buttonText.cancel}
            onClick={onClose}
            data-cy="basicDetailCancel"
          />
          <SubmitButton
            primary
            label={buttonText.save}
            type="submit"
            disabled={disabledButton}
            data-cy="basicDetailSave"
          />
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default TextBlock;
