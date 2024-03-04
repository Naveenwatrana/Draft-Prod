import { ArticleSteps } from 'pages/article/create/types';

export type StepProp = {
    active: boolean;
  };
export type IStep = {
    name: string;
    step: ArticleSteps;
};
export type StepperProps = {
    step: ArticleSteps;
    stepsToRender: IStep[];
};
