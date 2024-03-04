import { getHeaders, getLocalUser } from 'utils/getApiHeaders';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import PageHead from 'components/Atoms/PageHead';
import { getOrigin } from 'utils/getOrigin';
import { apiRootUrl, companyUrl } from 'common/utils/network/endpoints';
import Company from 'pages/company/Company';
import { CompanyPageProps } from '../../company/types';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const companyId = context.params?.tab;
    const localUser = getLocalUser(context.req.headers.cookie || '');
    let localCompany = null;
    const cookies = cookie.parse(context.req.headers.cookie || '');
    if (cookies?.company) {
      localCompany = JSON.parse(cookies.company);
    }
    const url = `${apiRootUrl}${companyUrl}/${companyId}`;
    const { data } = await axios.get(
      localCompany ? `${url}?company=${localCompany.username}` : url,
      getHeaders(localUser?.token as string),
    );
    return {
      props: {
        companyInfo: data,
        isOwnProfile: companyId === localCompany?.username,
        origin: context.req.headers.host,
        globals: { origin: getOrigin(context) },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
const CompanyPage = ({ companyInfo, isOwnProfile, origin }: CompanyPageProps) => {
  return (
    <>
      <PageHead
        title={`${companyInfo.data.name} | The Draft`}
        description={`Learn about ${companyInfo.data.name} at The Draft.`}
        canonical={`https://${origin}/org/${companyInfo.data.username}`}
      />
      <Company companyInfo={companyInfo} isOwnProfile={isOwnProfile} />
    </>
  );
};

export default CompanyPage;
