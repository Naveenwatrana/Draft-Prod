import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { jobAtSlugRoute } from 'common/utils/network/appRouts';
import PageHead from 'components/Atoms/PageHead';
import lang from 'common/lang';
import { formatMetaTagsText } from 'common/utils/textParser';
import { useParams } from 'common/utils/router-fill';
import JobPage, {
  getServerSideProps as geJobDetailsServerSideProps,
} from './jobs/details/[id].page';
import { JobPageProps } from './jobs/details/types';
const SlugPage = (props: JobPageProps) => {
  const params = useParams() as { slug: string };
  const { role, company } = props?.jobData || {};
  const { title, description } = lang.SEO.jobsPage;
  const { name = '', hq_location: hqLocation = '' } = company || {};
  const { origin } = props;

  if (props?.jobData?.id) {
    const jobsTitle = formatMetaTagsText(title, [role.name, hqLocation, name]);
    const jobsDescription = formatMetaTagsText(description, [role.name, hqLocation, name, name]);
    return (
      <>
        <PageHead
          title={jobsTitle}
          description={jobsDescription}
          canonical={`https://${origin}/${params.slug}`}
        />
        <JobPage {...props} view="job" slug={params.slug} />
      </>
    );
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { slug } = context.query;
    const jobSlugRoute = (slug as string)
      ?.split(jobAtSlugRoute)?.[1]
      ?.split('-');
    if (jobSlugRoute?.length) {
      return geJobDetailsServerSideProps(context, Number(jobSlugRoute.pop()));
    }
    return { notFound: true };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default SlugPage;
