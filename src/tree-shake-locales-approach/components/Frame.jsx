import React from 'react';
import {Frame as PolarisFrame, Loading, TopBar} from '@shopify/polaris';
import {useNavigation, Outlet} from 'react-router-dom';

import Navigation from './Navigation';

export default function Frame() {
  const navigation = useNavigation();

  const logo = {
    width: 40,
    topBarSource:
      'https://cdn.shopify.com/shopifycloud/web/assets/v1/1306acdcab5e0df9.svg',
    contextualSaveBarSource:
      'https://cdn.shopify.com/shopifycloud/web/assets/v1/1306acdcab5e0df9.svg',
    url: '/',
  };

  return (
    <PolarisFrame
      logo={logo}
      topBar={<TopBar />}
      navigation={<Navigation />}
    >
      {navigation.state === 'loading' && <Loading />}
      <Outlet />
    </PolarisFrame>
  );
}