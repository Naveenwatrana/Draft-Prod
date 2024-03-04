import * as yup from 'yup';
import lang from 'common/lang';
const {
  onBoarding: { project },
} = lang;

export const schema = yup
  .object()
  .shape({
    title: yup.string().required(project.titleError),
    startDate: yup.date().required(project.startError),
    ongoing: yup.bool().default(false),
    endDate: yup.string().when('ongoing', { is: false, then: yup.string().required(project.endError) }),
  });
