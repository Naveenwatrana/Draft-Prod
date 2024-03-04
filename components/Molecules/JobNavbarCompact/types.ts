import { IJob } from "pages/jobs/details/types";

export type NavbarCompactProps = {
  step: number;
  onBack: () => void;
  title: string;
  stepsToRender: string[];
  isAuthor?: boolean;
  updateView?: (values: string) => void;
  view?: string;
  slug?: string;
  jobData?: IJob;
  onJobClose?: () => void;
  onJobOpen?: () => void;
  status?: string;
  deleteJob?: () => void;
};
