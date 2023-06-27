import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {LegacyCard, Layout, Page, Text, VerticalStack} from '@shopify/polaris';

import translations from './translations';
import {Loading} from '../../loading';
import {useLocale} from '../../locale';

export default function Home() {
  const {locale} = useLocale();
  const {isLoading} = useQuery({queryKey: ['home'], queryFn: () => fetch('/api/home')});
  if (isLoading) return <Loading />;

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