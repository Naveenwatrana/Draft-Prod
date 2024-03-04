import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import { useAppSelector } from 'common/hooks/state';
import { useListPinArticleQuery } from 'pages/article/articleService';
import { selectCurrentCompany } from 'pages/account/authSlice';
import PersonCard from 'pages/feed/NewCards/PersonCard';
import JobCards from 'pages/feed/NewCards/JobCards';
import CompanyCard from 'pages/feed/NewCards/CompanyCard';
import { feedTypes } from 'pages/feed/types';
import { useNavigate } from 'common/utils/router-fill';
import { orgProfileUrl } from 'common/utils/network/appRouts';
import PostCard from 'pages/feed/NewCards/PostCards';
import ArticleCard from 'pages/feed/NewCards/ArticleCards';
import LinkCard from 'pages/feed/NewCards/LinkCard';
import ArticleCards from 'pages/feed/Cards/ArticleCards';
import NoSavedCards from './NoSavedCards';
import { Container, Content, Title } from './styles';
import { SAVABLE_TYPE } from './types';

const { savedCards } = lang;
const SavedCards = () => {
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const navigate = useNavigate();
  const handleCompanySelect = (company?: string) => {
    if (company) {
      navigate(orgProfileUrl(company));
    }
  };
  const { data, isLoading } = useListPinArticleQuery({
    ...(userIsCompany ? { type: userIsCompany.username } : {}),
  });
  const allPins = data?.data;
  if (isLoading) {
    return <Loader data-cy="loader" />;
  }
  if (!allPins?.length) {
    return <NoSavedCards />;
  }
  const getData = (pin: { savable: any; }) => {
    return { ...pin?.savable, saved: true };
  };
  const totalPins = allPins?.length;
  return (
    <Container>
      <Title>{`${savedCards.savedCards} (${totalPins})`}</Title>
      <Content>
        {allPins?.filter((pin: any) => !!pin.savable).map((pin: any /** TODO: add type */) => (
          <>
            {pin?.savable_type === SAVABLE_TYPE.POSTS && (getData(pin)?.cards?.length || 0) > 0 && (
              <ArticleCards
                data={{ ...getData(pin), type: feedTypes.post }}
                key={`SavedCard${pin?.id}`}
                postCard
              />
            )}
            {pin?.savable_type === SAVABLE_TYPE.POSTS && (!getData(pin)?.cards || getData(pin)?.cards.length === 0) && (
              <PostCard
                data={{ ...getData(pin), type: feedTypes.post, creator: pin.creator }}
                key={`SavedCard${pin?.id}`}
                postCard
              />
            )}
            {pin?.savable_type === SAVABLE_TYPE.ARTICLE && (getData(pin)?.cards?.length || 0) > 0 && (
              <ArticleCards
                data={{ ...getData(pin), type: feedTypes.article, creator: pin.creator }}
                key={`SavedCard${pin?.id}`}
              />
            )}
            {pin?.savable_type === SAVABLE_TYPE.ARTICLE && (!getData(pin)?.cards || getData(pin)?.cards.length === 0) && (
              <ArticleCard
                data={{ ...getData(pin), type: feedTypes.article, creator: pin.creator }}
                key={`SavedCard${pin?.id}`}
              />
            )}
            {pin?.savable_type === SAVABLE_TYPE.USER && (
              <PersonCard
                data={{ ...getData(pin), profile_cover: pin?.savable?.presigned_profile_cover }}
                key={`SavedCard${pin?.id}`}
              />
            )}
            {pin?.savable_type === SAVABLE_TYPE.JOB && (
              <JobCards
                data={getData(pin)}
                key={`SavedCard${pin?.id}`}
              />
            )}
            {pin?.savable_type === SAVABLE_TYPE.COMPANY && (
              <CompanyCard
                data={getData(pin)}
                key={`SavedCard${pin?.id}`}
                onClick={() => handleCompanySelect(pin?.savable?.username)}
              />
            )}
            {pin?.savable_type === SAVABLE_TYPE.LINKS && (
              <LinkCard
                data={getData(pin)}
                key={`LinkCard${pin?.id}`}
              />
            )}
          </>
        ))}
      </Content>
    </Container>
  );
};

export default SavedCards;
