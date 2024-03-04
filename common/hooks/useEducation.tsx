import { IOption } from 'components/MultipleInputTextArea/types';
import { IAddEducationPayload } from 'pages/pro/components/Education/AddEducation/types';
import { formatEducationPayload } from 'pages/pro/components/Education/utils';
import { useAddEducationMutation, useEditEducationMutation } from 'pages/pro/profileService';

const useEducation = () => {
  const [addEducationApi, results] = useAddEducationMutation();
  const [editEducationApi, editEducationResults] = useEditEducationMutation();

  const addEducation = async (data: IAddEducationPayload, tags: IOption[], description: string) => {
    await addEducationApi(formatEducationPayload(data, tags, description)).unwrap();
  };
  const editEducation = async (id: number, data: IAddEducationPayload, tags: IOption[], description: string) => {
    await editEducationApi({ body: formatEducationPayload(data, tags, description), id }).unwrap();
  };
  return { addEducation, loading: results.isLoading || editEducationResults.isLoading, editEducation };
};

export default useEducation;
