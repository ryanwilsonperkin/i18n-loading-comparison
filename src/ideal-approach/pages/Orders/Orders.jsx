import React from 'react';
import {Page} from '@shopify/polaris';
import { useLoaderData } from 'react-router-dom';

export default function Orders() {
  const {translations, data} = useLoaderData();

  return (
    <Page title={translations.title}>
      <ul>
        {data.orders.map(({number, price}) => (<li key={number}><strong>#{number}:</strong> ${price}</li>))}
      </ul>
    </Page>
  );
}