import lang from 'common/lang';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from 'components/Molecules/Content/Navbar';
import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import CreateShareLinkStep1 from './component/step1';
import CreateShareLinkStep2 from './component/step2';
import { openGraphData } from './types';
import { Page } from './style';
const Links = () => {
  useHandleMissingSession();
  const {
    creatingLinkPost,
  } = lang.linkPosts;
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    image: '', title: '', websiteLink: '', link: '',
  });
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const onNextClick = (ogData: openGraphData) => {
    setStep(step + 1);
    setData(ogData);
  };
  const goBack = () => {
    setStep(step - 1);
  };
  return (
    <Page>
      <Navbar noStepper={false} title={creatingLinkPost} handleBack={handleBack} />
      {step === 1 && <CreateShareLinkStep1 onNextClick={onNextClick} />}
      {step === 2 && <CreateShareLinkStep2 websiteLabel={data.websiteLink} websiteLink={data.link} title={data.title} image={data.image} goBack={goBack} />}
    </Page>
  );
};

export default Links;
