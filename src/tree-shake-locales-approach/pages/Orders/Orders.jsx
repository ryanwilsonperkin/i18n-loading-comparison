import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Page} from '@shopify/polaris';

import translations from './translations';
import {Loading} from '../../loading';
import { useSpeed } from '../../speed';
import { useLocale } from '../../locale';

export default function Orders() {
  const {speed} = useSpeed();
  const {locale} = useLocale();
  const {data, isLoading} = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch(`/api/orders?speed=${speed}`).then(resp => resp.json())
  });
  if (isLoading) return <Loading />;

  return (
    <Page title={translations[locale].title}>
      <ul>
        {data.orders.map(({number, price}) => (<li key={number}><strong>#{number}:</strong> ${price}</li>))}
      </ul>
    </Page>
  );
}