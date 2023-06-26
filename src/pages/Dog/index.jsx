import React from 'react';
import translations from './translations';

export default function Dog({locale}) {
  return <h2>🐕 {translations[locale].content}</h2>;
}