import React from 'react';
import {LegacyCard, Layout, Page, Text, VerticalStack} from '@shopify/polaris';
import { useLoaderData } from 'react-router-dom';

export default function Home() {
  const {translations, data} = useLoaderData();

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