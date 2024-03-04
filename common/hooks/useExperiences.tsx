import { IOption } from 'components/MultipleInputTextArea/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import debounce from 'lodash.debounce';
import { useGetExperienceMutation } from 'pages/pro/profileService';
import { formatExperienceSelectOptions } from 'common/utils/helpers';

export const useExperiences = () => {
  const [categoriesList] = useGetExperienceMutation();

  const loadAsyncOption = (
    val: string,
    callback: (options: IOption[]) => void,
  ) => {
    if (!val) return;
    categoriesList({ keyword: val })
      .unwrap()
      .then((data) => {
        callback(formatExperienceSelectOptions(data?.data));
      })
      .catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
        callback([]);
      });
  };
  return {
    loadAsyncOption: debounce(loadAsyncOption, 500),
  };
};
