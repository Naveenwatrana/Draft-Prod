import Link from 'next/link';
import { TermsUseUrl, privacyPolicyUrl } from 'common/utils/network/appRouts';
import lang from 'common/lang';
import { FooterSection } from './style';
import { CommonFooterProps } from './types';

const { footer } = lang.homePage;

const CommonFooter = ({ email = 'comms@thedraft.io' }: CommonFooterProps) => {
  return (
    <FooterSection>
      <p>
        {footer.forMoreInfo}
        :
        {' '}
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <ul>
        <li>
          <Link target="_blank" href={TermsUseUrl}>{footer.termsOfUse}</Link>
        </li>
        <li>
          <Link target="_blank" href={privacyPolicyUrl}>{footer.privacyPolicy}</Link>
        </li>
      </ul>
    </FooterSection>

  );
};

export default CommonFooter;
