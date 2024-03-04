import { Tabs } from 'pages/workspace/type';
import { useState } from 'react';
import lang from 'common/lang';
import SubSidebar from '../SubSidebar';
import CreatedCards from '../createdCards';
import CreatedPosts from '../createdPosts';
import { ContentProps } from './type';
import { Container } from './style';
import CreatedLinks from '../createdLinks';
const {
  workspace: {
    menu: { createdCards, createdPosts, createdLinks },
  },
} = lang;
const ContentCards = ({ postCards, linkCards }: ContentProps) => {
  const [step, setStep] = useState<Tabs>(Tabs.CONTENT);
  let selected;
  if (step === Tabs.CONTENT) {
    selected = createdCards;
  } else if (step === Tabs.POSTS) {
    selected = createdPosts;
  } else {
    selected = createdLinks;
  }
  return (
    <Container>
      <SubSidebar
        checkbox
        title="Type"
        items={[createdCards, createdPosts, createdLinks]}
        onSelect={(item) => {
          switch (item) {
            case createdCards:
              setStep(Tabs.CONTENT);
              break;
            case createdPosts:
              setStep(Tabs.POSTS);
              break;
            default:
              setStep(Tabs.LINKS);
          }
        }}
        selected={selected}
      />
      {step === Tabs.CONTENT && (
        <CreatedCards />
      )}
      {step === Tabs.POSTS && (
        <CreatedPosts cards={postCards} />
      )}
      {step === Tabs.LINKS && (
        <CreatedLinks cards={linkCards || []} />
      )}
    </Container>
  );
};

export default ContentCards;
