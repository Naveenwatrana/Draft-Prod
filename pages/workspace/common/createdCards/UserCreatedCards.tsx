import lang from 'common/lang';
import KebabMenu from 'components/KebabMenu';
import DefaultCard from 'components/DefaultCard';
import { getCardImage, getCoverCard } from 'common/utils/getCoverCardImage';
import { articleUrl } from 'common/utils/network/appRouts';
import { ListItem } from 'components/KebabMenu/styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ArticleCard from 'pages/feed/NewCards/ArticleCards';
import {
  ArticleMetaInfo, Card, ArticleStats, ArticleStatsItem, ArticleActions, ArticleStatsItemLabel, ArticleStatus, ViewArticleLink, PublishArticleButton,
} from './styles';
import { UserCreatedCardsProps } from './types';

const {
  article: {
    status, moreMenu: {
      viewDetails, unpublish, publish, status: { published, unpublished },
    },
  },
} = lang;

const UserCreatedCards = ({ card, handlePublish, success }: UserCreatedCardsProps) => {
  const [closeMenu, setCloseMenu] = useState(false);

  useEffect(() => {
    setCloseMenu(false);
  }, [success]);
  return (
    <Card
      key={card.id}
    >
      <Link href={articleUrl(card.id, card.title)}>
        {(card?.cards?.length || 0) > 0 && (
          <DefaultCard
            type="article"
            primaryText={card.author}
            totalCardsinStack={card.cards?.length}
            secondaryText={getCoverCard(card.cards || [])}
            tertiaryText={card.date}
            cover={getCardImage(card.cards)}
          />
        )}
        {(!card?.cards || card?.cards.length === 0) && (
          <ArticleCard
            data={card}
            key={`${card.id}article`}
            hideHeader={false}
          />
        )}
      </Link>

      <ArticleMetaInfo>
        <ArticleStats>
          <ArticleStatsItem>
            <ArticleStatsItemLabel>
              {status}
              :
            </ArticleStatsItemLabel>
            <ArticleStatus active={!!card.published_date}>{card.published_date ? published : unpublished}</ArticleStatus>
          </ArticleStatsItem>
        </ArticleStats>
        <ArticleActions>
          <KebabMenu
            list={
              (
                <>
                  <ListItem>
                    <ViewArticleLink href={articleUrl(card.id, card.title)}>{viewDetails}</ViewArticleLink>
                  </ListItem>
                  <ListItem>
                    <PublishArticleButton
                      variant="link"
                      label={card.published_date ? unpublish : publish}
                      onClick={() => {
                        setCloseMenu(!closeMenu);
                        handlePublish(card.published_date, card.id);
                      }}
                    />

                  </ListItem>
                </>
              )
            }
            closeMenu={closeMenu}
          />

        </ArticleActions>
      </ArticleMetaInfo>

    </Card>

  );
};

export default UserCreatedCards;
