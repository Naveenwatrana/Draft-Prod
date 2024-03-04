import { GetServerSidePropsContext } from 'next';
import { apiRootUrl, companyUrl } from 'common/utils/network/endpoints';
import { getOrigin } from 'utils/getOrigin';
import PageHead from 'components/Atoms/PageHead';
import { getIsSsrMobile } from 'utils/mobileDetect';
import { CompanyDetailsPageProps } from '../../../company/types';
import CompanyContentPage from '../new/content/ContentPage';
import { getCompanyContent, getLocalUserData } from '../utils';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const userName = context.params?.tab;
    const companyApiUrl = `${apiRootUrl}${companyUrl}/${userName}`;

    const { data: company, localCompany } = await getLocalUserData(context, companyApiUrl);
    const data = await getCompanyContent(context);

    const companyContent = {
      ...data, ...company, saved: company.saved, followed: company.followed,
    };
    return {
      props: {
        isSsrMobile: getIsSsrMobile(context),
        companyContent,
        isOwnProfile: localCompany?.username === userName,
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
const CompanyDetailsPage = ({
  companyContent, isOwnProfile, origin,
}: CompanyDetailsPageProps) => {
  return (
    <>
      <PageHead
        title={`${companyContent.name} Content | The Draft`}
        description={`Learn about ${companyContent.name} thoughts and company updates at The Draft.`}
        canonical={`https://${origin}/org/${companyContent.username}/content`}
      />
      <CompanyContentPage ownProfile={isOwnProfile} companyInfo={companyContent} />
    </>
  );
};

export default CompanyDetailsPage;
