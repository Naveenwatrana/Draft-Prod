import Head from 'next/head';
import { PageHeadProps } from './types';

const PageHead = ({
  title, description, canonical,
}: PageHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <link rel="canonical" href={canonical} />
    </Head>
  );
};

export default PageHead;
