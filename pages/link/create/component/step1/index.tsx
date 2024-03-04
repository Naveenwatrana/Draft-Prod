/* eslint-disable @next/next/no-img-element */
import lang from 'common/lang';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ShareLinkGraphic from 'components/Atoms/ShareLinkGraphic';
import Text from 'components/textComp';
import { InputType } from 'components/input/types';
import Loader from 'components/Loader/Loader';
import { useIsMobile } from 'common/hooks/useIsMobile';
import Button from 'components/buttonComp';
import ShareIcon from './shareLinkIcon.png';
import { Container } from '../../style';
import { openGraphData } from '../../types';
import {
  Content, DescriptionText, HeadingText, InputWrapper, TextInput, Buttons,
} from './style';

export type CreateShareLinkStep1Props = {
  onNextClick: (ogData: openGraphData) => void;
};
const {
  shareALink, description, placeholder, errorMessage,
} = lang.linkPosts;
const {
  next, discard,
} = lang.buttonText;
const CreateShareLinkStep1 = ({
  onNextClick,
}: CreateShareLinkStep1Props) => {
  const [apiData, setApiData] = useState({ image: '', title: '' });
  const [error, setError] = useState<{ message: string } | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const router = useRouter();
  const getLinkData = () => {
    setIsLoading(true);
    fetch('/api/link', {
      method: 'POST',
      body: JSON.stringify({
        url: inputValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.done === 'error') {
          setError({ message: errorMessage });
          return;
        }
        setApiData(data);
        onNextClick({ ...data, link: inputValue });
      })
      .catch(() => setError({ message: errorMessage }))
      .finally(() => setIsLoading(false));
  };
  const onDiscard = () => {
    router.back();
  };
  return (
    <Container>
      {isLoading && <Loader />}
      {isMobile ? (
        <Content>
          <ShareLinkGraphic />
          <InputWrapper>
            {!isMobile && <img src={ShareIcon.src} alt="Share Icon" />}
            <HeadingText component="h3">{shareALink}</HeadingText>
            <DescriptionText component="h4">{description}</DescriptionText>
            <TextInput data-cy="shareLinkInput" value={inputValue} onChange={(val) => setInputValue(val.target.value)} type={InputType.TEXT} id="1" placeholder={placeholder} error={error} />
            {apiData.title && <Text component="h3">{apiData.title}</Text>}
            {apiData.image && <img src={apiData.image} alt="link" width={400} />}
          </InputWrapper>
        </Content>
      ) : (
        <>
          <ShareLinkGraphic />
          <InputWrapper>
            {!isMobile && <img src={ShareIcon.src} alt="Share Icon" />}
            <HeadingText component="h3">{shareALink}</HeadingText>
            <DescriptionText component="h4">{description}</DescriptionText>
            <TextInput data-cy="shareLinkInput" value={inputValue} onChange={(val) => setInputValue(val.target.value)} type={InputType.TEXT} id="1" placeholder={placeholder} error={error} />
            {apiData.title && <Text component="h3">{apiData.title}</Text>}
            {apiData.image && <img src={apiData.image} alt="link" width={400} />}
          </InputWrapper>
        </>
      )}
      <Buttons>
        {isMobile ? (
          <Button
            label={discard}
            onClick={onDiscard}
            variant="link"
            primary
            error
            data-cy={discard}
          />
        ) : (
          <Button
            label={discard}
            onClick={onDiscard}
            variant="link"
            error
            primary
            data-cy={discard}
          />
        )}
        <Button
          label={next}
          onClick={getLinkData}
          primary
          data-cy={next}
          disabled={inputValue.length <= 0}
        />
      </Buttons>
    </Container>

  );
};

export default CreateShareLinkStep1;
