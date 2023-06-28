import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Page} from '@shopify/polaris';
import { useLoaderData } from 'react-router-dom';

import {Loading} from '../../loading';
import { useSpeed } from '../../speed'

export default function Products() {
  const {translations} = useLoaderData()
  const {speed} = useSpeed();
  const {data, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch(`/api/products?speed=${speed}`).then(resp => resp.json()),
  });
  if (isLoading) return <Loading />;

  return (
    <Page title={translations.title}>
      <ul>
        {data.products.map(({name, inventory}) => (<li key={name}><strong>{name}:</strong> {inventory}</li>))}
      </ul>
    </Page>
  );
}