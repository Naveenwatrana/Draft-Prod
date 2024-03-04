import React from 'react';
import { useParams } from 'next/navigation';
import {
  Tabs, TabsLayoutContent, TabsLayoutTab, TabsLayoutTabs,
} from './style';

type TabsLayoutProps = {
  tabs: {
    name: string;
    onClick: string;
  }[];
  activeTab: number;
  url: string;
  children?: React.ReactNode;
  username?: string;
};

const TabsLayout = ({
  children, url, username, ...props
}: TabsLayoutProps) => {
  const { tabs, activeTab } = props;
  const param = useParams();
  return (
    <Tabs>
      <TabsLayoutTabs>
        {tabs.map((tab, index) => {
          return (
            <TabsLayoutTab
              key={tab.name}
              className={`${activeTab === index ? 'active' : ''}`}
              href={`${url}/${username ?? param?.username}/${tab.onClick}`}
            >
              {tab.name}
            </TabsLayoutTab>
          );
        })}

      </TabsLayoutTabs>
      <TabsLayoutContent>
        {children}
      </TabsLayoutContent>
    </Tabs>
  );
};
export default TabsLayout;
