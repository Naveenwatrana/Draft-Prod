import { getHeaders, getLocalUser } from 'utils/getApiHeaders';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { apiRootUrl, companyUrl } from 'common/utils/network/endpoints';
import Company from './Company';
import { CompanyPageProps } from './types';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const selectedCompany = JSON.parse(cookies.company);
    const localUser = getLocalUser(context.req.headers.cookie || '');
    if (!selectedCompany?.username) {
      return {
        notFound: true,
      };
    }
    const { data } = await axios.get(`${apiRootUrl}${companyUrl}/${selectedCompany.username}?company=${selectedCompany.username}`, getHeaders(localUser?.token as string));
    return {
      props: {
        companyInfo: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
const CompanyPage = ({ companyInfo }: CompanyPageProps) => {
  return <Company companyInfo={companyInfo} isOwnProfile />;
};

export default CompanyPage;
