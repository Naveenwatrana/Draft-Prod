import { IOption } from 'components/MultipleInputTextArea/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { useGetCompaniesMutation } from 'pages/company/companyService';
import debounce from 'lodash.debounce';
import { formatSelectOptions } from 'common/utils/helpers';

export const useCompanies = (filter = '') => {
  const [companiesList] = useGetCompaniesMutation();

  const loadAsyncOption = (
    val: string,
    callback: (options: IOption[]) => void,
  ) => {
    if (!val) return;
    companiesList({ keyword: val, filter })
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
