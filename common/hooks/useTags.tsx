import { IOption } from 'components/MultipleInputTextArea/types';
import { useEffect, useState } from 'react';
import { useTagsMutation } from 'pages/article/articleService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import debounce from 'lodash.debounce';
import useDebounce from './useDebounce';

export const useTags = (filter = '') => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<IOption[]>([]);
  const debouncedValue = useDebounce(inputValue);
  const [tagList, tagListResult] = useTagsMutation();
  const fetchTagsOptions = async () => {
    tagList({ keyword: debouncedValue, filter })
      .unwrap()
      .then((data) => {
        const optionsToSet: IOption[] = data?.data?.map(
          (tagVal: { id: number; tag: string }) => {
            return { value: `${tagVal?.id}`, label: tagVal?.tag };
          },
        );
        setOptions(optionsToSet);
      })
      .catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
        setOptions([]);
      });
  };
  useEffect(() => {
    if (debouncedValue) fetchTagsOptions();
    else setOptions([]);
  }, [debouncedValue]);

  const loadAsyncOption = (
    val: string,
    callback: (options: IOption[]) => void,
  ) => {
    if (!val) return;
    tagList({ keyword: val, filter })
      .unwrap()
      .then((data) => {
        const optionsToSet: IOption[] = data?.data?.map(
          (tagVal: { id: number; tag: string }) => {
            return { value: `${tagVal?.id}`, label: tagVal?.tag };
          },
        );
        callback(optionsToSet);
      })
      .catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
        callback([]);
      });
  };
  return {
    setInputValue,
    options,
    tagListResult,
    loadAsyncOption: debounce(loadAsyncOption, 500),
  };
};
