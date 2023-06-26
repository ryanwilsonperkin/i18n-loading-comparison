import React from 'react';
import {Page} from '@shopify/polaris';
import translations from './translations';
import {Loading, useSimulatedDataLoading} from '../../loading';
import {useLocale} from '../../locale';

export default function Products() {
  const {locale} = useLocale();
  const {loading} = useSimulatedDataLoading();
  if (loading) return <Loading />;

  return (
    <Page title={translations[locale].title}>
    </Page>
  );
}