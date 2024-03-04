import * as yup from 'yup';
import lang from 'common/lang';

const { onBoarding: { name, image } } = lang;

export const schema = yup.object().shape({
  firstName: yup.string().required(name.firstNameError),
  lastName: yup.string().required(name.lastNameError),
  picture: yup
    .mixed()
    .test(
      'fileSize',
      image.imageError,
      (file) => {
        return file ? file.size <= 200000 : true;
      },
    )
    .test('type', image.imageError, (file) => {
      return file ? (file.type === 'image/jpeg' || file.type === 'image/png') : true;
    }),
});
