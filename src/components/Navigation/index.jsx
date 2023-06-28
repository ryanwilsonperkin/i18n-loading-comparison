import React from 'react';
import {useLocation} from 'react-router-dom';
import {Navigation as PolarisNavigation} from '@shopify/polaris';
import {
  ArrowLeftMinor,
  HomeMinor,
  OrdersMinor,
  ProductsMinor,
} from '@shopify/polaris-icons';

import translations from '__translations';

export default function Navigation() {
  const location = useLocation();

  return (
    <PolarisNavigation location={location.pathname}>
      <PolarisNavigation.Section
        items={[
          {
            label: 'Back to choices',
            onClick: () => window.location = '/',
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <PolarisNavigation.Section
        items={[
          {
            url: '/',
            exactMatch: true,
            label: translations.navigation.home,
            icon: HomeMinor,
          },
          {
            url: '/orders',
            label: translations.navigation.orders,
            icon: OrdersMinor,
          },
          {
            url: '/products',
            exactMatch: true,
            label: translations.navigation.products,
            icon: ProductsMinor,
          },
        ]}
      />
    </PolarisNavigation>
  );
}