import { IOption } from 'components/MultipleInputTextArea/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import debounce from 'lodash.debounce';
import { useGetCategoriesMutation } from 'pages/pro/profileService';
import { formatSelectOptions } from 'common/utils/helpers';

export const useFunctionalRoles = () => {
  const [categoriesList] = useGetCategoriesMutation();

  const loadAsyncOption = (
    val: string,
    callback: (options: IOption[]) => void,
  ) => {
    if (!val) return;
    categoriesList({ keyword: val })
      .unwrap()
      .then((data) => {
        callback(formatSelectOptions(data?.data));
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
