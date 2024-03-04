import { DarkGrayContainer } from 'components/Atoms/GrayContainer';
import TextComp from 'components/textComp';
import Divider from 'components/Divider/Divider';
import lang from 'common/lang';
import { DataContainer } from '../style';
import { CompetitorsProps } from '../types';

const {
  competitors,
} = lang.orgInsightsTab;

const Competitors = ({ data }: CompetitorsProps) => {
  const isCompetitorData = data && data?.length;
  if (!isCompetitorData) {
    return null;
  }
  return (
    <DarkGrayContainer>
      <TextComp component="h2Small">{competitors}</TextComp>
      <Divider />
      <DataContainer>
        {isCompetitorData && data?.map((item) => (
          <TextComp key={item.name} component="p">{item.name}</TextComp>
        ))}
      </DataContainer>
    </DarkGrayContainer>
  );
};

export default Competitors;
