import { MyOptionType } from 'components/Select/types';

export type CloseConfirmationProps = {
  onClose: () => void;
  jobId: string;
  onSubmit: (values: ICloseJobModalValues) => void;
};

export type ICloseJobModalValues = {
  hiredForThisRole: boolean | null;
  foundCandidateOnDraft: boolean | null;
  candidateName?: MyOptionType | null;
};

export type ICloseModalData = {
  hired: boolean | null;
  found_candidate_on_the_draft?: boolean | null;
  candidate_name?: string;
  candidate_user_id?: number;
};
