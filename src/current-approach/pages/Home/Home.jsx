import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {LegacyCard, Layout, Page, Text, VerticalStack} from '@shopify/polaris';

import translations from '__translations';
import {Loading} from '../../loading';
import { useSpeed } from '../../speed';

export default function Home() {
  const {speed} = useSpeed();
  const {isLoading} = useQuery({
    queryKey: ['home'], 
    queryFn: () => fetch(`/api/home?speed=${speed}`),
  });
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