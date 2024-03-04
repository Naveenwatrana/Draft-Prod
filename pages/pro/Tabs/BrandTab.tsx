import React, { useMemo } from 'react';
import lang from 'common/lang';
import BasicDetailsDesktop from 'pages/pro/basicDetails/desktop';
import BasicDetailsMobile from 'pages/pro/basicDetails/mobile';
import LogoIcon from 'components/Icons/icon';
import { useParams } from 'next/navigation';
import {
  ContainerWrapper, Container, DetailsContainer, LogoWrapper, NoDetailsContainer,
} from '../styles';
import Blocks from '../components/Blocks';
import NoBlocks from '../basicDetails/components/NoBlocks';
import { BlankProfileNotification } from './style';

const {
  profile: { noProfileBlock },
} = lang;
type BrandTabProps = {
  isDesktopView: boolean;
  addCardStep?: boolean;
  onCloseWizard: (open: boolean) => void;
  open: boolean;
  data: any;
  isLoading: boolean;
  isError: boolean;
  isCurrentUser?: boolean;
  setSkip: () => void;
};
const BrandTab = ({
  isDesktopView,
  addCardStep,
  onCloseWizard,
  open,
  data,
  isLoading,
  isError,
  isCurrentUser,
  setSkip,
}: BrandTabProps) => {
  const isUserDeckAvailable = data?.data?.cards && data?.data?.cards.length > 0;
  const params = useParams();
  const isResponsiveBlock = useMemo(() => params?.tab?.[1] === 'brand', [params]);

  return (
    <ContainerWrapper>
      {(!isUserDeckAvailable && !data?.blocks.length && isCurrentUser) && (
        <BlankProfileNotification>
          {noProfileBlock.message}
        </BlankProfileNotification>
      )}
      <Container>
        {isDesktopView && (
          <BasicDetailsDesktop
            addCardStep={addCardStep}
            setOpenWizard={onCloseWizard}
            openWizard={open}
            data={data}
            isLoading={isLoading}
            isError={isError}
            isCurrentUser={isCurrentUser}
          />
        )}
        {!isDesktopView && (
          <BasicDetailsMobile data={data} setOpenWizard={onCloseWizard} openWizard={open} />
        )}
        {!data?.blocks.length && isCurrentUser && (
          <NoDetailsContainer>
            <NoBlocks />
          </NoDetailsContainer>
        )}
        {data?.blocks.length > 0 && (
          <DetailsContainer minWidth={isResponsiveBlock ? 700 : 600}>
            <Blocks
              brandLayout={data?.brand_layout}
              id={data?.id}
              ownProfile={isCurrentUser}
              blocks={data?.blocks}
              numberOfBlocks={(data?.blocks?.length || 0) + 1}
              setSkip={setSkip}
            />
            <LogoWrapper>
              <LogoIcon theme="grey" />
            </LogoWrapper>
          </DetailsContainer>
        )}
      </Container>
    </ContainerWrapper>
  );
};

export default BrandTab;
