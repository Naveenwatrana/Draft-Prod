/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import TextComp from 'components/textComp';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from 'components/Loader/Loader';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { MELTWATER_ITEMS } from 'pages/workspace/type';
import { useIsMobile } from 'common/hooks/useIsMobile';
import lang from 'common/lang';
import { Container, HeaderContainer, StyledButton } from './styles';
import { IMeltwaterSettingsValues, SettingsProps, schema } from './type';
import { useUpdateMeltwaterConnectionMutation } from '../Meltwater/meltwaterService';
import { MeltwaterContainer } from '../Meltwater/style';
import SubSidebar from '../SubSidebar';
import { ATS } from './ats';
const {
  meltwater: {
    settings: {
      feedSettingsSubtext, rss, xml,
    },
  },
  workspace: {
    settings: {
      feedSettings, atsIntegration,
    },
  },
} = lang;
const Settings = ({ data, isUserB2C, draftCompanyUser }: SettingsProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<IMeltwaterSettingsValues>({
    resolver: yupResolver(schema),
    defaultValues: data,
  });
  const [sideBarItems, setSidebarItems] = useState<string[]>([]);
  const [sideBarSelect, setSidebarSelect] = useState('');
  const [updateFeed, updateFeedResult] = useUpdateMeltwaterConnectionMutation();
  const isMobile = useIsMobile();
  useEffect(() => {
    const sidebarArr = [];
    if (!isUserB2C) {
      sidebarArr.push(atsIntegration);
      setSidebarSelect(atsIntegration);
    }
    if (!isUserB2C && draftCompanyUser) {
      sidebarArr.push(feedSettings);
    }
    setSidebarItems(sidebarArr);
  }, []);
  const onSubmit: SubmitHandler<IMeltwaterSettingsValues> = (
    formData: IMeltwaterSettingsValues,
  ) => {
    if (data?.id) {
      updateFeed({
        body: {
          meltwater_xml: formData.meltwater_xml,
          meltwater_rss: formData.meltwater_rss,
        },
        id: data?.id,
      })
        .unwrap()
        .then(() => {
          showNotification(
            'Updated Link Successfully',
            NotificationType.SUCCESS,
          );
        })
        .catch((e) => {
          e?.data?.errors?.meltwater_rss
            && setError('meltwater_rss', {
              message: e?.data?.errors?.meltwater_rss,
            });
          e?.data?.errors?.meltwater_xml
            && setError('meltwater_xml', {
              message: e?.data?.errors?.meltwater_xml,
            });
          showNotification(e.data.message, NotificationType.ERROR);
        });
    } else {
      // TODO: Add API Integration
    }
  };
  return (
    <MeltwaterContainer>
      {!isMobile && (
        <SubSidebar
          items={sideBarItems}
          onSelect={(item : string) => { setSidebarSelect(item); }}
          selected={sideBarSelect}
        />
      )}
      {sideBarSelect === atsIntegration && (
        <ATS />
      )}
      {sideBarSelect === feedSettings && (
        <Container onSubmit={handleSubmit(onSubmit)}>
          {updateFeedResult.isLoading && <Loader />}
          <HeaderContainer>
            <TextComp component="h3">{feedSettings}</TextComp>
            <TextComp component="h4">{feedSettingsSubtext}</TextComp>
            <InputComp
              type={InputType.TEXT}
              labelText={xml.label}
              id="meltwater_xml"
              placeholder={xml.placeholder}
              error={errors?.meltwater_xml}
              data-cy="XML"
              register={register}
            />
            <InputComp
              type={InputType.TEXT}
              labelText={rss.label}
              id="meltwater_rss"
              placeholder={rss.placeholder}
              error={errors?.meltwater_rss}
              data-cy="RSS"
              register={register}
            />
            <StyledButton
              label="Connect"
              primary
              type="submit"
              disabled={!isDirty}
            />
          </HeaderContainer>
        </Container>
      )}
    </MeltwaterContainer>
  );
};

export default Settings;
