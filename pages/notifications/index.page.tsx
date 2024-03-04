import React from 'react';
import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useWindowDimensions } from 'common/hooks';
import DesktopNotifications from './DesktopNotifications';
import MobileNotifications from './MobileNotifications';

const Notifications = () => {
  useHandleMissingSession();
  const { isDesktopView } = useWindowDimensions();
  return isDesktopView ? <DesktopNotifications /> : <MobileNotifications />;
};

export default Notifications;
