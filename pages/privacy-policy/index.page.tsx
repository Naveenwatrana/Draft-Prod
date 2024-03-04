import lang from 'common/lang';
import CommonFooter from 'pages/web/HomePage/Footer/CommonFooter';
import HomeHeader from 'pages/web/HomePage/Header';
import ParagraphTextWithLink from 'components/Atoms/ParagraphTextWithLink';
import ListComponentWithLink from 'components/Atoms/ListItemWithLink';
import {
  H1, H2, H3, H4, ParagraphTitle, SubList, UnorderedList, Container, PrivacyPolicyWrapper,
} from './style';
import { privacySections } from './data';
import { IData } from './types';
const { title } = lang.privacyPolicy;
const PrivacyPolicy = () => {
  return (
    <div>
      <HomeHeader />
      <PrivacyPolicyWrapper>
        <Container>
          <H1>{title}</H1>
          {privacySections.map((section) => (
            <div key={section.id}>
              {section.data.map((data: IData) => {
                return (
                  <div key={`${section.id}-data`}>
                    {data.type === 'heading1' && <H2>{data.value}</H2>}
                    {data.type === 'text' && (
                      <ParagraphTextWithLink value={data.value} href={data.href} button={data.button} />
                    )}

                    {data.type === 'paragraphTitle' && <ParagraphTitle>{data.value}</ParagraphTitle>}
                    {data.type === 'list' && (
                      <UnorderedList>
                        <ListComponentWithLink list={data.list} />
                      </UnorderedList>
                    )}
                    {data.type === 'subList' && (
                      <SubList>
                        <ListComponentWithLink list={data?.list} />
                      </SubList>
                    )}
                    {data.type === 'heading2' && <H3>{data.value}</H3>}
                    {data.type === 'heading3' && <H4>{data.value}</H4>}
                  </div>
                );
              })}
            </div>
          ))}
          <CommonFooter />
        </Container>
      </PrivacyPolicyWrapper>
    </div>
  );
};

export default PrivacyPolicy;
