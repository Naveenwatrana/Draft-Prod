import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import PageHead from 'components/Atoms/PageHead';
import lang from 'common/lang';
import cookie from 'cookie';
import {
  apiRootUrl, article, search, getProfile,
} from 'common/utils/network/endpoints';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import { formatMetaTagsText } from 'common/utils/textParser';
import { articleUrl } from 'common/utils/network/appRouts';
import { getHeaders, getLocalCompany } from 'utils/getApiHeaders';
import CreateArticleStep3 from './components/CreateArticleStep3';
import { PreviewArticleProps } from './view/types';

const { title, description } = lang.SEO.articlePage;

const PreviewArticle = ({
  articleData, commentsData, moreLikeThisData, loggedInUser, origin,
}: PreviewArticleProps) => {
  const postTitle = articleData.data.title || '';
  const creatorName = `${articleData.data.creator?.first_name} ${articleData.data.creator?.last_name}`;
  const canonicalUrl = `https://${origin}/${articleUrl(articleData.data.id, postTitle)}`;
  return (
    <>
      <PageHead
        title={formatMetaTagsText(title, [postTitle])}
        description={formatMetaTagsText(description, [postTitle, creatorName])}
        canonical={canonicalUrl}
      />
      <LayoutWithNavbar loggedInUser={!!loggedInUser}>
        <CreateArticleStep3
          articleData={articleData}
          commentsData={commentsData}
          moreLikeThisData={moreLikeThisData}
          loggedInUser={loggedInUser}
          origin={origin}
        />
      </LayoutWithNavbar>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let currentUser = { data: { data: {} } };
  if (!context.params?.id) {
    return {
      notFound: true,
    };
  }
  try {
    const postParam = context.params.id as string;
    const lastHyphen = postParam.lastIndexOf('-');
    const postId = postParam.substring(lastHyphen + 1);
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;
    const { userIsCompany } = context.req.cookies;
    const localCompany = getLocalCompany(context.req.headers.cookie || '');
    const { data } = await axios.get(`${apiRootUrl}${article}/${postId}${localCompany ? `?company=${localCompany.username}` : ''}`, getHeaders(localUser?.token as string));
    const commentsData = await axios.get(`${apiRootUrl}${article}/${postId}/comments`);
    const { tag } = data.data;
    const getMoreLikeThis = `${apiRootUrl}${search}?page=1&keyword=${tag}${userIsCompany ? `&company=${userIsCompany}` : ''}`;
    const moreLikeThisData = await axios.get(getMoreLikeThis, getHeaders(localUser?.token as string));
    if (localUser) {
      currentUser = await axios.get(`${apiRootUrl}${getProfile}?username=${localUser.username}`);
    }
    return {
      props: {
        articleData: data,
        commentsData: commentsData.data,
        moreLikeThisData: moreLikeThisData.data,
        loggedInUser: localUser ? currentUser.data.data : false,
        origin: context.req.headers.host,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default PreviewArticle;
