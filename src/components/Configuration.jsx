import React from 'react';
import {ChoiceList, Popover, Button, Box} from '@shopify/polaris';
import {ToolsMajor} from '@shopify/polaris-icons';
import { LOCALES, useLocale } from '../locale';

export default function Configuration({open, onOpen, onClose}) {
  const {locale, setLocale} = useLocale();

  return (
    <Popover
      activator={<Button onClick={onOpen} icon={ToolsMajor} outline />}
      active={open}
      onClose={onClose}
      fixed
      fullHeight
      preferredAlignment="right"
    >
      <Box padding="4">
        <ChoiceList
          title="Locale"
          choices={LOCALES.map(locale => ({label: locale, value: locale}))}
          selected={locale}
          onChange={(selected) => setLocale(selected[0])}
          allowMultiple={false}
        />
      </Box>
    </Popover>
  )
}