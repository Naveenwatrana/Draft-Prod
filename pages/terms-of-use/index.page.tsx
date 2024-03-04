import HomeHeader from 'pages/web/HomePage/Header';
import CommonFooter from 'pages/web/HomePage/Footer/CommonFooter';
import { IData } from 'pages/privacy-policy/types';
import ParagraphTextWithLink from 'components/Atoms/ParagraphTextWithLink';
import ListComponentWithLink from 'components/Atoms/ListItemWithLink';
import {
  H1, TermsOfUseWrapper, H2, ParagraphTitle, UnorderedList, SubList, H3, H4, Container,
} from './style';
import { TermsOfUseContent } from './data';

const termsOfUse = () => {
  return (
    <div>
      <HomeHeader />
      <TermsOfUseWrapper>
        <Container>
          <H1>THE DRAFT DIGITAL PLATFORM TERMS OF USE</H1>
          {TermsOfUseContent.map((section) => (
            <div key={section.id}>
              {section.data.map((data: IData) => (
                <div key={`${section.id}-data`}>
                  {data.type === 'heading1' && <H2>{data.value}</H2>}
                  {data.type === 'text' && <ParagraphTextWithLink value={data.value} href={data.href} value2={data.value2} />}
                  {data.type === 'paragraphTitle' && <ParagraphTitle>{data.value}</ParagraphTitle>}
                  {data.type === 'list' && <UnorderedList><ListComponentWithLink list={data.list} /></UnorderedList>}
                  {data.type === 'subList' && <SubList><ListComponentWithLink list={data.list} /></SubList>}
                  {data.type === 'heading2' && <H3>{data.value}</H3>}
                  {data.type === 'heading3' && <H4>{data.value}</H4>}
                </div>
              ))}
            </div>
          ))}
          <CommonFooter />
        </Container>
      </TermsOfUseWrapper>
    </div>
  );
};

export default termsOfUse;
