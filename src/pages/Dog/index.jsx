import React from 'react';
import translations from './translations';
import useSimulatedDataLoading from '../../useSimulatedDataLoading';
import Loading from '../../components/Loading';

export default function Dog({locale}) {
  const {loading} = useSimulatedDataLoading();
  return (
    <div>
      {loading ? <Loading /> : <h2>🦮 {translations[locale].content} {loading}</h2>}
    </div>
  );
}