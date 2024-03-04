import React from 'react';
import CompanyProfileDeck from 'pages/company/ProfileDeck';
import { CardsContainer } from 'pages/company/style';
import { ICompanyProfile } from 'pages/company/ProfileDeck/types';

export type CompanyDeckDesktopProps = {
  data: ICompanyProfile;
  editCards: (state: boolean) => void;
  isOwnProfile?: boolean;
};

const CompanyDeckDesktop = ({ data, editCards, isOwnProfile }: CompanyDeckDesktopProps) => {
  return (

    <CardsContainer>
      <CompanyProfileDeck
        data={data}
        setEditImageDetail={editCards}
        onCardClick={() => { /**/ }}
        isOwnProfile={isOwnProfile}
      />
    </CardsContainer>
  );
};

export default CompanyDeckDesktop;
