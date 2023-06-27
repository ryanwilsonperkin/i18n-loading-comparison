import React from 'react';
import {useRouteLoaderData, useLocation} from 'react-router-dom';
import {Navigation as PolarisNavigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  ProductsMinor,
} from '@shopify/polaris-icons';

export default function Navigation() {
  const translations = useRouteLoaderData('root');
  const location = useLocation();

  return (
    <PolarisNavigation location={location.pathname}>
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