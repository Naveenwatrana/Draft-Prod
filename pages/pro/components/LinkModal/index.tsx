import ModalElement from 'components/Modal/Modal';
import {
  ModalContentForm,
  ModalContentWrapper,
  ModalHeader,
} from 'components/Modal/style';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import WordCounter from 'components/WordCounter/WordCounter';
import { useAddBlockMutation } from 'pages/pro/profileService';
import useCompany from 'common/hooks/useCompany';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser } from 'pages/account/authSlice';
import { AddLinkValues, LinkModalProps } from './type';
import { schema } from './schema';
import {
  StyledButtons, MyLinkCOntainer, CounterWrapper, ModalSubTitle,
} from './style';
import { showNotification } from '../Projects/util';
import { NotificationType } from '../Projects/ViewProject/types';
const {
  buttonText: { cancel, next },
  profile: {
    link: {
      addLinkForm: {
        linkTitle: { linkTitleLabel, linkTitlePlaceholder },
        url: { placeholder, label },
        modalTitle,
        subTitle,
      },
    },
  },
  linkPosts: { errorMessage },

} = lang;

const LinkModal = ({ closeModal, onSubmit }: LinkModalProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<AddLinkValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addBlockApi, addBlockResult] = useAddBlockMutation();
  const maxCharacters = 75;
  const title = watch('title');
  const disabledButton = !title?.trim();
  const { currentCompany: userIsCompany } = useCompany();

  const currentUser = useAppSelector(selectCurrentUser);

  const onLinkFormSubmit: SubmitHandler<AddLinkValues> = async (formData) => {
    setIsLoading(true);
    fetch('/api/link', {
      method: 'POST',
      body: JSON.stringify({
        url: formData.url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.done === 'error') {
          return;
        }
        const body = {
          type: 'link',
          sort: 1,
          fields: {
            title: formData.title,
            description: data.title,
            url: formData.url,
            media: data.image,
            domain: formData.url,
          },
          blockable_type: userIsCompany ? 'companies' : 'users',
          blockable_id: userIsCompany?.id || currentUser.id,
        };
        addBlockApi(body)
          .unwrap()
          .then((resData) => {
            if (resData.done === 'error') {
              showNotification(errorMessage, NotificationType.ERROR);
              return;
            }
            onSubmit({
              ...resData.data.fields,
              id: resData.data.id,
              sort: resData.data.sort,
            });
          });
      });
  };
  return (
    <ModalElement isOpen>
      {addBlockResult.isLoading && <Loader />}
      <ModalContentWrapper>
        <ModalContentForm onSubmit={handleSubmit(onLinkFormSubmit)}>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalSubTitle>{subTitle}</ModalSubTitle>
          <MyLinkCOntainer>
            <InputComp
              maxLength={75}
              type={InputType.TEXT}
              labelText={linkTitleLabel}
              id="title"
              placeholder={linkTitlePlaceholder}
              register={register}
              error={errors.title}
              style={{ borderRadius: '18px' }}
            />
            <CounterWrapper>
              <WordCounter error={title?.length > maxCharacters} total={maxCharacters} count={title?.length || 0} />
            </CounterWrapper>
          </MyLinkCOntainer>
          <InputComp
            type={InputType.TEXT}
            labelText={label}
            id="url"
            placeholder={placeholder}
            register={register}
            error={errors.url}
            style={{ borderRadius: '18px' }}
          />
          <DividerComp />
          <StyledButtons>
            <ButtonComp
              label={cancel}
              variant="link"
              primary
              onClick={closeModal}
            />
            <ButtonComp
              label={next}
              primary
              disabled={!isValid || disabledButton}
              type="submit"
            />
          </StyledButtons>
        </ModalContentForm>
      </ModalContentWrapper>
    </ModalElement>
  );
};

export default LinkModal;
