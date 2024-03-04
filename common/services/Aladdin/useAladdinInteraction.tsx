/* eslint-disable @typescript-eslint/naming-convention */
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { useSaveInteractionMutation } from './Aladdin.service';
import { IInteractorTypes, ISaveInteractionPayload, ISaveInteractionPayloadAPI } from './types';

const useAladdinInteraction = () => {
  const [saveInteractionApi, results] = useSaveInteractionMutation();
  const userIsCompany = useAppSelector(selectCurrentCompany);

  const saveInteraction = async (payload: ISaveInteractionPayload) => {
    const apiPayload: ISaveInteractionPayloadAPI = {
      item_id: payload.itemId,
      item_type: payload.itemType,
      event_type: payload.eventType,
    };
    if (payload.eventValue) {
      apiPayload.event_value = payload.eventValue;
    }
    if (payload.eventValue) {
      apiPayload.interactor_type = payload.interactorType;
    }
    if (userIsCompany) {
      apiPayload.interactor_type = IInteractorTypes.companies;
      apiPayload.interactor_id = userIsCompany.id;
    }
    await saveInteractionApi(apiPayload);
  };

  return {
    saveInteraction,
  };
};

export default useAladdinInteraction;
