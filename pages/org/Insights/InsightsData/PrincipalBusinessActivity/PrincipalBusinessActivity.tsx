import { DarkGrayContainer } from 'components/Atoms/GrayContainer';
import TextComp from 'components/textComp';
import Divider from 'components/Divider/Divider';
import lang from 'common/lang';
import { DataContainer } from '../style';
import { ICompanyInsights } from '../../types';
import {
  PrincipalTitle, Row, Tile, TileContainer,
} from './style';

const {
  principalBusinessActivity,
} = lang.orgInsightsTab;

export type PrincipalBusinessActivityProps = {
  companyInfo: ICompanyInsights;
};

const PrincipalBusinessActivity = ({ companyInfo }: PrincipalBusinessActivityProps) => (
  <DarkGrayContainer>
    <TextComp component="h2Small">{principalBusinessActivity}</TextComp>
    <Divider />

    <DataContainer>
      <Row>
        <PrincipalTitle component="p">
          Sector
        </PrincipalTitle>
        <TileContainer>
          <Tile backgroundColor="#345858" width="80%">{companyInfo.gics_sectors}</Tile>
        </TileContainer>
      </Row>
      <Row>
        <PrincipalTitle component="p">
          Industry Group
        </PrincipalTitle>
        <TileContainer>
          <Tile backgroundColor="#2e4a4a" width="70%">{companyInfo.gics_industry_groups}</Tile>
        </TileContainer>
      </Row>
      <Row>
        <PrincipalTitle component="p">
          Industry
        </PrincipalTitle>
        <TileContainer>
          <Tile backgroundColor="#293c3c" width="60%">{companyInfo.gics_industries}</Tile>
        </TileContainer>
      </Row>
      <Row>
        <PrincipalTitle component="p">
          Sub Industry
          {' '}
        </PrincipalTitle>
        <TileContainer>
          <Tile backgroundColor="#232e2e" width="50%">{companyInfo.gics_sub_industries}</Tile>
        </TileContainer>
      </Row>
    </DataContainer>
  </DarkGrayContainer>
);

export default PrincipalBusinessActivity;
