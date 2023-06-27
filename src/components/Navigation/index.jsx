import React from 'react';
import {useLocation} from 'react-router-dom';
import {Navigation as PolarisNavigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  ProductsMinor,
} from '@shopify/polaris-icons';

import translations from './translations';
import { useLocale } from '../../locale';

export default function Navigation() {
  const {locale} = useLocale();
  const location = useLocation();

  return (
    <PolarisNavigation location={location.pathname}>
      <PolarisNavigation.Section
        items={[
          {
            url: '/',
            exactMatch: true,
            label: translations[locale].navigation.home,
            icon: HomeMinor,
          },
          {
            url: '/orders',
            label: translations[locale].navigation.orders,
            icon: OrdersMinor,
          },
          {
            url: '/products',
            exactMatch: true,
            label: translations[locale].navigation.products,
            icon: ProductsMinor,
          },
        ]}
      />
    </PolarisNavigation>
  );
}