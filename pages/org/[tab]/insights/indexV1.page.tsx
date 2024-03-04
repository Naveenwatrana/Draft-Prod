import { GetServerSidePropsContext } from 'next';
import { getOrigin } from 'utils/getOrigin';
import PageHead from 'components/Atoms/PageHead';
import { apiRootUrl, companyUrl } from 'common/utils/network/endpoints';
import lang from 'common/lang';
import { orgInsightUrl } from 'common/utils/network/appRouts';
import { useGlobals } from 'common/hooks/useGlobals';
import { getIsSsrMobile } from 'utils/mobileDetect';
import { CompanyDetailsPageProps } from '../../../company/types';
import InsightsJobPage from '../../Insights';
import { getLocalUserData } from '../utils';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userName = context.params?.tab;
    const apiLink = `${apiRootUrl}${companyUrl}/${userName}`;
    const { data: insightsData, localCompany } = await getLocalUserData(context, apiLink);
    return {
      props: {
        isSsrMobile: getIsSsrMobile(context),
        companyInsights: insightsData,
        isOwnProfile: localCompany?.username,
        globals: { origin: getOrigin(context) },
        origin: context.req.headers.host,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
const { title, description } = lang.SEO.insightsPage;

const CompanyDetailsPage = ({
  isOwnProfile, companyInsights,
}: CompanyDetailsPageProps) => {
  const globals = useGlobals();
  const url = `${globals.origin}${orgInsightUrl(companyInsights.username)}`;
  return (
    <>
      <PageHead
        title={`${companyInsights.name} ${title}`}
        description={description.replace('%companyName%', companyInsights.name)}
        canonical={url}
      />
      <InsightsJobPage isOwnProfile={isOwnProfile} companyInfo={companyInsights} />
    </>
  );
};
export default CompanyDetailsPage;
