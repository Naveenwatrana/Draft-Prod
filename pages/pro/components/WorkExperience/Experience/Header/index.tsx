/* eslint-disable @next/next/no-img-element */
import CalenderIcon from 'components/Icons/CalenderIcon';
import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormatMY } from 'common/constants';
import LocationIcon from 'components/Icons/LocationIcon';
import lang from 'common/lang';
import DefaultCompanyLogo from 'components/Icons/DefaultCompanyLogo';
import { useNavigate } from 'common/utils/router-fill';
import { orgProfileUrl } from 'common/utils/network/appRouts';
import { HeaderProps } from '../../type';
import {
  CategoryName,
  CompanyName,
  Container,
  Content,
  IconWrapper,
  LogoContainer,
  RoleTitle,
} from './style';

const {
  profile: {
    block: {
      workExperience: {
        form: {
          date: { now },
        },
      },
    },
  },
} = lang;

const Header = ({
  logo,
  role,
  startDate,
  endDate,
  location,
  category,
  companyName,
  username,
}: HeaderProps) => {
  const navigate = useNavigate();
  const redirectToOrganisationProfile = () => username && navigate(orgProfileUrl(username));
  return (
    <Container>
      <LogoContainer clickable={!!username} onClick={redirectToOrganisationProfile}>
        {/* FIXME: add Image after logo issue resoled */}
        {logo
          ? <img src={logo} width={60} height={60} alt="Logo" data-cy={`company-logo-${companyName}`} />
          : <DefaultCompanyLogo />}
      </LogoContainer>
      <Content>
        <RoleTitle>{role}</RoleTitle>
        <CompanyName clickable={!!username} data-cy={`company-name-${companyName}`} onClick={redirectToOrganisationProfile}>{companyName}</CompanyName>
        <CategoryName>{category}</CategoryName>
        <IconWrapper>
          <CalenderIcon />
          {`${formatDate(startDate, dateFormatMY)} - ${
            endDate ? formatDate(endDate, dateFormatMY) : now
          }`}
        </IconWrapper>
        <IconWrapper>
          <LocationIcon />
          {location}
        </IconWrapper>
      </Content>
    </Container>
  );
};

export default Header;
