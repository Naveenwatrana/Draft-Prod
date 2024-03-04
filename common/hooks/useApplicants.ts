import { IOption } from 'components/MultipleInputTextArea/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import debounce from 'lodash.debounce';
import { useFilteredApplicationListMutation } from 'pages/jobs/jobsService';

const useApplicants = (jobId: string) => {
  const [applicants] = useFilteredApplicationListMutation();
  const loadAsyncOption = (
    val: string,
    callback: (options: IOption[]) => void,
  ) => {
    if (!val) return;
    applicants({ keyword: val, id: jobId })
      .unwrap()
      .then((data) => {
        const optionsToSet: IOption[] = data?.data?.data?.map(
          (item: { user: { name: string; id: number; }; }) => ({
            label: item.user.name,
            value: `${item.user.id}`,
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

export default useApplicants;
