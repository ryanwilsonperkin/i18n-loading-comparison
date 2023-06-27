import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {LegacyCard, Layout, Page, Text, VerticalStack} from '@shopify/polaris';

import {Loading} from '../../loading';
import { useLoaderData } from 'react-router';

export default function Home() {
  const translations = useLoaderData();
  const {isLoading} = useQuery({queryKey: ['home'], queryFn: () => fetch('/api/home')});
  if (isLoading) return <Loading />;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <VerticalStack gap="4">
            <Text variant='subdued'>{translations.greeting}</Text>
            <LegacyCard title={translations.noActivityTitle} sectioned>
              <p>{translations.noActivityContent}</p>
            </LegacyCard>
          </VerticalStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}