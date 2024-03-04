import { IOption } from 'components/MultipleInputTextArea/types';

export type CreatePostsMobileProps = {
    tags: IOption[];
    setTags: React.Dispatch<IOption[]>;
    onSubmit: () => void;
};
