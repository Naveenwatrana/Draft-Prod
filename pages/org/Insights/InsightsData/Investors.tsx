import { DarkGrayContainer } from 'components/Atoms/GrayContainer';
import TextComp from 'components/textComp';
import Divider from 'components/Divider/Divider';
import lang from 'common/lang';
import { DataContainer } from './style';
import { InvestorsProps } from './types';

const {
  investors,
} = lang.orgInsightsTab;

const Investors = ({ data }: InvestorsProps) => {
  const isInvestorsData = data && data?.length;
  if (!isInvestorsData) {
    return null;
  }
  return (
    <DarkGrayContainer>
      <TextComp component="h2Small">{investors}</TextComp>
      <Divider />
      <DataContainer>
        {isInvestorsData && data?.map((item) => item.investors.map((investor) => (
          <TextComp key={investor.name} component="p">{investor.name}</TextComp>
        )))}
      </DataContainer>
    </DarkGrayContainer>
  );
};

export default Investors;
