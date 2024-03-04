import React from 'react';
import LogoIcon from 'components/Icons/icon';
import { BlocksEntity } from 'pages/pro/types';
import {
  Container,
  DetailsContainer,
  LogoWrapper,
} from '../style';
import Blocks from '../Blocks';
import CompanyDeckDesktop from '../Deck/Desktop';
import CompanyDeckMobile from '../Deck/Mobile';

type BrandTabProps = {
  data: {
    data: {
      purpose?: string;
      id: string;
      blocks?: BlocksEntity[];
      name: string;
      bio: string;
      logo: string;
      cover: string;
      cards?: any[];
    };
  };
  editable?: boolean;
  editCards: (state: boolean) => void;
  isDesktopView: boolean;
  openWizard: boolean;
  setOpenWizard: (open: boolean) => void;
  handleSaveCards: () => void;
  setSkip: () => void;
  isOwnProfile?: boolean;
};

const BrandTab = ({
  data, editable, editCards, isDesktopView, openWizard, setOpenWizard, handleSaveCards, setSkip, isOwnProfile,
}: BrandTabProps) => {
  return (
    <Container>
      {isDesktopView && <CompanyDeckDesktop isOwnProfile={isOwnProfile} data={data?.data} editCards={editCards} />}
      {!isDesktopView && (
        <CompanyDeckMobile
          isOwnProfile={isOwnProfile}
          handleSaveCards={handleSaveCards}
          openWizard={openWizard}
          setOpenWizard={setOpenWizard}
          data={data?.data}
          editCards={editCards}
        />
      )}
      <DetailsContainer>
        <Blocks id={data?.data?.id} isOwnProfile={isOwnProfile} companyData={data?.data} editable={editable} setSkip={setSkip} />
        <LogoWrapper>
          <LogoIcon theme="grey" />
        </LogoWrapper>
      </DetailsContainer>
    </Container>
  );
};

export default BrandTab;
