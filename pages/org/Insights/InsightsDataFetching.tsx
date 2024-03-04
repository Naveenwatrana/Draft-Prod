import TextComp from 'components/textComp';
import LogoIcon from 'components/Icons/icon';
import ClockSvg from 'components/Icons/clock.svg';
import lang from 'common/lang';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { Container, DataFetchingContainer } from './styles';

const { dataFetching, comingSoon } = lang.orgInsightsTab;

const InsightsDataFetching = () => {
  const isMobile = useIsMobile();
  return (
    <Container isMobile={isMobile}>
      <DataFetchingContainer>
        <div>
          <ClockSvg />
          <TextComp component="h2">{dataFetching}</TextComp>
          <TextComp component="h4">{comingSoon}</TextComp>
        </div>
        <LogoIcon theme="grey" />
      </DataFetchingContainer>
    </Container>
  );
};

export default InsightsDataFetching;
