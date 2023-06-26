import React, {useState, useCallback, } from 'react';
import {TopBar as PolarisTopBar} from '@shopify/polaris';

import Configuration from './Configuration';

export default function TopBar() {
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    [],
  );

  const secondaryMenuMarkup = (
    <Configuration
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
    />
  );

  return (
    <PolarisTopBar
      secondaryMenu={secondaryMenuMarkup}
    />
  );
}
