import Loader from 'components/Loader/Loader';
import { data as cardsMockData } from 'pages/article/cardsMockData';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useAppDispatch } from 'common/hooks/state';
import {
  setIsEditing, setUserInfo,
} from 'pages/pro/profileSlice';
import { useWindowDimensions } from 'common/hooks';
import useProfileDeck from 'common/hooks/useProfileDeck';
import CardCreationWizardMobile from 'components/CardCreationWizard/Mobile';
import ModalElement from 'components/Modal/Modal';
import lang from 'common/lang';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import { BasicDetailsContainer } from '../styles';
import { DetailGroup } from './styles';
import UserProfileDeck from '../UserProfileDeck';
import { BasicDetailsMobileProps } from '../type';

const { saveDeck, editDeck } = lang.deck;

const BasicDetails = ({
  setOpenWizard, openWizard, data,
}: BasicDetailsMobileProps) => {
  const dispatch = useAppDispatch();
  const { isDesktopView } = useWindowDimensions();
  const { loadExistingCards, loadFreshCards, uploadSaveCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.USER);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data.data));
    }
  }, [
    data, dispatch,
  ]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflowY = 'auto'; };
  }, []);

  const handleSaveCards = async () => {
    setLoading(true);
    await uploadSaveCards();
    setOpenWizard(false);
    setLoading(false);
    setOpenWizard(false);
  };

  const openCardWizard = useCallback(() => {
    if (data?.data?.cards && data.data.cards.length > 0) {
      loadExistingCards(data.data.cards);
      setOpenWizard(true);
      return;
    }
    loadFreshCards(data?.data?.mantra, data?.data?.presigned_profile_cover);
    setOpenWizard(true);
  }, [data?.data, loadExistingCards, loadFreshCards, setOpenWizard]);

  return (
    <>
      {loading && <Loader />}
      {data?.data && (
        <BasicDetailsContainer
          ref={wrapperRef}
          onClick={() => {
            if (!isDesktopView) {
              dispatch(setIsEditing(true));
            }
          }}
        >
          <DetailGroup>
            <UserProfileDeck data={data.data} setEditImageDetail={openCardWizard} onCardClick={openCardWizard} />
          </DetailGroup>
        </BasicDetailsContainer>
      )}
      <ModalElement isOpen={openWizard}>
        <CardCreationWizardMobile onSave={handleSaveCards} maxCards={3} cardData={cardsMockData} title={editDeck} onClose={() => setOpenWizard(false)} saveButtonText={saveDeck} />
      </ModalElement>
    </>
  );
};

export default BasicDetails;
