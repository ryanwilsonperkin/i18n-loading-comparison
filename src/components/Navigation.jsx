import React from 'react';
import {useLocation} from 'react-router-dom';
import {Navigation as PolarisNavigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  ProductsMinor,
} from '@shopify/polaris-icons';

export default function Navigation() {
  const location = useLocation();

  return (
    <PolarisNavigation location={location.pathname}>
      <PolarisNavigation.Section
        items={[
          {
            url: '/',
            exactMatch: true,
            label: 'Home',
            icon: HomeMinor,
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: OrdersMinor,
          },
          {
            url: '/products',
            exactMatch: true,
            label: 'Products',
            icon: ProductsMinor,
          },
        ]}
      />
    </PolarisNavigation>
  );
}