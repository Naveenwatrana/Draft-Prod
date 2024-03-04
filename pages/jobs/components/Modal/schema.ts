import * as yup from 'yup';

const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string().required('required'),
});
const selectNotRequiredSchema = yup
  .object()
  .shape({
    label: yup.string(),
    value: yup.string(),
  })
  .nullable();

export const schema = yup.object().shape({
  hiredForThisRole: yup.boolean().nullable(),
  foundCandidateOnDraft: yup.boolean().nullable().when('hiredForThisRole', {
    is: (value: number) => !!value,
    then: yup.boolean().required(),
  }),
  candidateName: selectNotRequiredSchema.when('foundCandidateOnDraft', {
    is: (value: number) => !!value,
    then: selectSchema,
  }),
});
