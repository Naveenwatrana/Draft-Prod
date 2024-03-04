import { IOption } from 'components/MultipleInputTextArea/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import debounce from 'lodash.debounce';
import { useGetLocationMutation } from 'pages/jobs/jobsService';
import { ILocationApi } from 'pages/jobs/create/types';

const useLocationOptions = () => {
  const [locationList] = useGetLocationMutation();
  const loadAsyncOption = (
    val: string,
    callback: (options: IOption[]) => void,
  ) => {
    if (!val) return;
    locationList(val)
      .unwrap()
      .then((data) => {
        const optionsToSet: IOption[] = data?.data?.map(
          (item: ILocationApi) => ({
            label: `${item.city}, ${item.state}`,
            value: `${item.id}`,
          }),
        );
        callback(optionsToSet);
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

export default useLocationOptions;
