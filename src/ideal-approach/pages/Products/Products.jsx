import React from 'react';
import {Page} from '@shopify/polaris';
import { useLoaderData } from 'react-router-dom';

export default function Products() {
  const {translations, data} = useLoaderData()

  return (
    <Page title={translations.title}>
      <ul>
        {data.products.map(({name, inventory}) => (<li key={name}><strong>{name}:</strong> {inventory}</li>))}
      </ul>
    </Page>
  );
}