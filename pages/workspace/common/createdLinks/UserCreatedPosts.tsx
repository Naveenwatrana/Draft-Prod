import lang from 'common/lang';
import KebabMenu from 'components/KebabMenu';
import DefaultCard from 'components/DefaultCard';
import { getCardImage, getCoverCard } from 'common/utils/getCoverCardImage';
import { ListItem } from 'components/KebabMenu/styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { postUrl } from 'common/utils/network/appRouts';
import PostCard from 'pages/feed/NewCards/PostCards';
import {
  PostMetaInfo, Card, PostStats, PostStatsItem, PostActions, PostStatsItemLabel, PostStatus, ViewPostLink, PublishPostButton,
} from './styles';
import { UserCreatedPostsProps } from './types';

const {
  article: {
    status, moreMenu: {
      viewDetails, unpublish, publish, status: { published, unpublished },
    },
  },
} = lang;

const UserCreatedPosts = ({ card, handlePublish, success }: UserCreatedPostsProps) => {
  const [closeMenu, setCloseMenu] = useState(false);

  useEffect(() => {
    setCloseMenu(false);
  }, [success]);
  return (
    <Card
      key={card.id}
    >
      <Link href={postUrl(card.id)}>
        {!!card.cards && card.cards.length > 0 ? (
          <DefaultCard
            type="post"
            primaryText={card.author}
            totalCardsinStack={card.cards?.length}
            secondaryText={getCoverCard(card.cards || [])}
            tertiaryText={card.date}
            cover={getCardImage(card.cards)}
          />
        )
          : (
            <PostCard
              data={card}
              key={`${card.id}article`}
              hideHeader={false}
            />
          )}
      </Link>

      <PostMetaInfo>
        <PostStats>
          <PostStatsItem>
            <PostStatsItemLabel>
              {status}
              :
            </PostStatsItemLabel>
            <PostStatus active={!!card.published_date}>{card.published_date ? published : unpublished}</PostStatus>
          </PostStatsItem>
        </PostStats>
        <PostActions>
          <KebabMenu
            list={
              (
                <>
                  <ListItem>
                    <ViewPostLink href={postUrl(card.id)}>{viewDetails}</ViewPostLink>
                  </ListItem>
                  <ListItem>
                    <PublishPostButton
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

        </PostActions>
      </PostMetaInfo>

    </Card>

  );
};

export default UserCreatedPosts;
