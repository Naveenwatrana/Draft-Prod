import LoadingIcon from 'components/Icons/LoadingIcon';
import lang from 'common/lang';
import TextComp from 'components/textComp';

const { onBoarding: { image } } = lang;

const Loading = () => {
  return (
    <>
      <LoadingIcon />
      <TextComp>{image.loading}</TextComp>
    </>
  );
};

export default Loading;
