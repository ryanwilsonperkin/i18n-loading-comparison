import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Page} from '@shopify/polaris';

import translations from '__translations';
import {Loading} from '../../loading';

export default function Products() {
  const {data, isLoading} = useQuery({queryKey: ['products'], queryFn: () => fetch('/api/products').then(resp => resp.json())});
  if (isLoading) return <Loading />;

  return (
    <Page title={translations.title}>
      <ul>
        {data.products.map(({name, inventory}) => (<li key={name}><strong>{name}:</strong> {inventory}</li>))}
      </ul>
    </Page>
  );
}