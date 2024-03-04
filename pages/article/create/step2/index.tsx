import lang from 'common/lang';
import Button from 'components/buttonComp';
import { useIsMobile } from 'common/hooks/useIsMobile';
import {
  Buttons, DiscardButton,
} from './style';
import { ArticleStepTwoProps } from './types';

const {
  article: {
    cancel, publishArticle, back, discard,
  },
} = lang;

const ArticleStepTwo = ({
  goBack, publish, disabled, discardClick, discardMobileClick,
}: ArticleStepTwoProps) => {
  const isMobile = useIsMobile();
  return (

    <Buttons>
      {isMobile ? (
        <DiscardButton
          label={discard}
          onClick={discardMobileClick}
          variant="link"
          primary
          data-cy={discard}
          error
        />
      ) : (
        <Button
          label={back}
          onClick={goBack}
          variant="link"
          primary
          data-cy={cancel}
        />
      )}
      <div>
        {!isMobile && (
          <DiscardButton
            label={discard}
            onClick={discardClick}
            variant="link"
            primary
            data-cy={discard}
            error
          />
        )}
        <Button
          label={publishArticle}
          onClick={publish}
          primary
          disabled={disabled}
          data-cy={publishArticle}
        />
      </div>
    </Buttons>
  );
};

export default ArticleStepTwo;
