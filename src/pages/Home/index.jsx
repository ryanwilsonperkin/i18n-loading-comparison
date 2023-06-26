import React from 'react';
import translations from './translations';
import {Loading, useSimulatedDataLoading} from '../../loading';
import {useLocale} from '../../locale';
import { LegacyCard, Layout, Page, Text, VerticalStack } from '@shopify/polaris';

export default function Home() {
  const {locale} = useLocale();
  const {loading} = useSimulatedDataLoading();
  if (loading) return <Loading />;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <VerticalStack gap="4">
            <Text variant='subdued'>{translations[locale].greeting}</Text>
            <LegacyCard title={translations[locale].noActivityTitle} sectioned>
              <p>{translations[locale].noActivityContent}</p>
            </LegacyCard>
          </VerticalStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}