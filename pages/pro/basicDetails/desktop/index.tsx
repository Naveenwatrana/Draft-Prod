import Loader from 'components/Loader/Loader';
import { useCallback, useEffect, useState } from 'react';
import { formateBioData } from 'common/utils/helpers';
import { useNavigate } from 'common/utils/router-fill';
import { data as cardsMockData } from 'pages/article/cardsMockData';
import CardCreationWizard from 'components/CardCreationWizard';
import { useAppDispatch } from 'common/hooks/state';
import { setUserInfo } from 'pages/pro/profileSlice';
import useProfileDeck from 'common/hooks/useProfileDeck';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import UserProfileDeck from '../UserProfileDeck';
import ViewBasicDetails from '../components/ViewBasicDetails';
import BlankUserCard from '../components/BlankUserCard';

type BasicDetailsProps = {
  data: any;
  isLoading: boolean;
  isError: boolean;
  isCurrentUser?: boolean;
  openWizard: boolean;
  setOpenWizard: (state: boolean) => void;
  addCardStep?: boolean;
};

const BasicDetails = ({
  data, isLoading, isError, isCurrentUser, openWizard, setOpenWizard, addCardStep,
}: BasicDetailsProps) => {
  const { loadExistingCards, loadFreshCards, uploadSaveCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.USER);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mantra, setMantra] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [picture, setPicture] = useState('');
  const [, setUserProfileCoverValue] = useState('');
  const [loading, setLoading] = useState(false);

  const openCardWizard = useCallback(() => {
    if (data?.data?.cards && data.data.cards.length > 0) {
      loadExistingCards(data.data.cards);
      setOpenWizard(true);
      return;
    }
    loadFreshCards(data?.data?.mantra, data?.data?.presigned_profile_cover);
    setOpenWizard(true);
  }, [data?.data, loadExistingCards, loadFreshCards, setOpenWizard]);

  useEffect(() => {
    if (isError) {
      navigate('/404');
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      const {
        userMantra,
        userFirstName,
        userLastName,
        userProfileCover,
        presignedProfileCover,
      } = formateBioData(data);

      setMantra(userMantra || '');
      setFirstName(userFirstName || '');
      setLastName(userLastName || '');
      dispatch(setUserInfo(data.data));
      setPicture(presignedProfileCover);
      setUserProfileCoverValue(userProfileCover || '');
    }
  }, [data]);

  const handleSaveCards = async () => {
    setLoading(true);
    await uploadSaveCards();
    setOpenWizard(false);
    setLoading(false);
  };

  const isUserDeckAvailable = data?.data?.cards && data?.data?.cards.length > 0;
  const isData = data?.data;
  return (
    <>
      {(isLoading || loading) && <Loader />}
      {isUserDeckAvailable && <UserProfileDeck data={data.data} setEditImageDetail={openCardWizard} onCardClick={() => { /* To Be Implemented */ }} />}
      {!isUserDeckAvailable && isCurrentUser && isData && (
        <BlankUserCard
          firstName={firstName}
          lastName={lastName}
          picture={picture}
          mantra={mantra}
          setEditImageDetail={openCardWizard}
        />
      )}
      {!isCurrentUser && !isUserDeckAvailable && isData && (
        <ViewBasicDetails
          firstName={firstName}
          lastName={lastName}
          picture={picture}
          mantra={mantra}
          setEditImageDetail={openCardWizard}
        />
      )}
      {openWizard && (
        <CardCreationWizard
          maxCards={3}
          activeCardId={1}
          cardData={cardsMockData}
          setIsOpen={(state) => setOpenWizard(state)}
          title="Edit Deck"
          isOpen={openWizard}
          onSave={handleSaveCards}
          onClose={() => setOpenWizard(false)}
          addCardStep={addCardStep}
          showOnlyCover={false}
        />
      )}
    </>
  );
};

export default BasicDetails;
