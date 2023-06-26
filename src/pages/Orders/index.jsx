import React from 'react';
import translations from './translations';
import {Loading, useSimulatedDataLoading} from '../../loading';
import {useLocale} from '../../locale';
import { Page } from '@shopify/polaris';

export default function Orders() {
  const {locale} = useLocale();
  const {loading} = useSimulatedDataLoading();
  if (loading) return <Loading />;

  return (
    <Page title={translations[locale].title}>
    </Page>
  );
}