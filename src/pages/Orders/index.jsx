import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Page} from '@shopify/polaris';
import { useLoaderData } from 'react-router';

import {Loading} from '../../loading';

export default function Orders() {
  const translations = useLoaderData();
  const {data, isLoading} = useQuery({queryKey: ['orders'], queryFn: () => fetch('/api/orders').then(resp => resp.json())});
  if (isLoading) return <Loading />;

  return (
    <Page title={translations.title}>
      <ul>
        {data.orders.map(({number, price}) => (<li key={number}><strong>#{number}:</strong> ${price}</li>))}
      </ul>
    </Page>
  );
}