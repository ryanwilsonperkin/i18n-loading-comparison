import React from 'react';
import {useLocation} from 'react-router-dom';
import {Navigation as PolarisNavigation} from '@shopify/polaris';
import {
  ArrowLeftMinor,
  DigitalMediaReceiverMajor,
  GlobeMinor,
  HomeMinor,
  OrdersMinor,
  ProductsMinor,
} from '@shopify/polaris-icons';

import translations from '__translations';
import { LOCALES, useLocale } from '../../locale';
import { SPEEDS, useSpeed } from '../../speed';

export default function Navigation() {
  const location = useLocation();
  const {speed: activeSpeed, setSpeed} = useSpeed();
  const {locale: activeLocale, setLocale} = useLocale();

  return (
    <PolarisNavigation location={location.pathname}>
      <PolarisNavigation.Section
        items={[
          {
            label: 'List of approaches',
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
      <PolarisNavigation.Section
        title="Locale"
        separator
        items={LOCALES.map(locale => ({
          label: locale,
          selected: locale === activeLocale,
          onClick: () => {
            setLocale(locale);
            window.location.reload();
          },
          icon: GlobeMinor,
        }))}
      />
      <PolarisNavigation.Section
        title="Simulated speed"
        separator
        items={SPEEDS.map(speed => ({
          label: speed,
          selected: speed === activeSpeed,
          onClick: () => {
            setSpeed(speed);
            window.location.reload();
          },
          icon: DigitalMediaReceiverMajor,
        }))}
      />
    </PolarisNavigation>
  );
}