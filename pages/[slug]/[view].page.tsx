import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { jobAtSlugRoute } from 'common/utils/network/appRouts';
import { useParams } from 'common/utils/router-fill';
import JobPage, {
  getServerSideProps as geJobDetailsServerSideProps,
} from '../jobs/details/[id].page';
import { JobPageProps } from '../jobs/details/types';

const SlugPage = (props: JobPageProps) => {
  const params = useParams() as { slug: string, view: string };
  if (props?.jobData?.id) {
    return <JobPage {...props} view={params.view} slug={params.slug} />;
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
