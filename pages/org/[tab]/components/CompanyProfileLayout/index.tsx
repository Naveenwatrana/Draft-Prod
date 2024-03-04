import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import TabsLayout from 'components/Molecules/TabsLayout';
import { useParams } from 'next/navigation';
import { orgTabs } from 'pages/pro/utils';
import { useIsMobile } from 'common/hooks/useIsMobile';
import {
  Container, ProfileContent, UserBio,
} from './style';
import { CompanyProfileLayoutProps } from './type';

const CompanyProfileLayout = ({
  children, bio, activeTab = 0,
}: CompanyProfileLayoutProps) => {
  const param = useParams();
  const isMobile = useIsMobile();

  return (
    <div>
      <LayoutWithNavbar showNavbar={!isMobile}>
        <Container>
          <UserBio>
            {bio}
          </UserBio>
          <ProfileContent>
            <TabsLayout
              tabs={orgTabs}
              activeTab={activeTab}
              username={param?.tab as string}
              url="/org"
            >
              {children}
            </TabsLayout>
          </ProfileContent>
        </Container>
      </LayoutWithNavbar>
    </div>
  );
};

export default CompanyProfileLayout;
