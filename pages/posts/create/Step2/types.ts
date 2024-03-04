import { IOption } from 'components/MultipleInputTextArea/types';
import { ArticleSteps } from 'pages/article/create/types';

export type PostsStepTagsProps = {
    setStep: (step: ArticleSteps) => void;
    tags: IOption[];
    setTags: React.Dispatch<IOption[]>;
    onSubmit: () => void;
};
