import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Page} from '@shopify/polaris';

import translations from './translations';
import {Loading} from '../../loading';
import { useLocale } from '../../locale';

export default function Products() {
  const {locale} = useLocale();
  const {data, isLoading} = useQuery({queryKey: ['products'], queryFn: () => fetch('/api/products').then(resp => resp.json())});
  if (isLoading) return <Loading />;

  return (
    <Page title={translations[locale].title}>
      <ul>
        {data.products.map(({name, inventory}) => (<li key={name}><strong>{name}:</strong> {inventory}</li>))}
      </ul>
    </Page>
  );
}