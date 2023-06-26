import React from 'react';
import {Popover, Button} from '@shopify/polaris';
import {ToolsMajor} from '@shopify/polaris-icons';

export default function Configuration({open, onOpen, onClose}) {
  return (
    <Popover
      activator={<Button onClick={onOpen} icon={ToolsMajor} outline />}
      active={open}
      onClose={onClose}
      fixed
      fullHeight
      preferredAlignment="right"
    >
      Configuration
    </Popover>
  )
}