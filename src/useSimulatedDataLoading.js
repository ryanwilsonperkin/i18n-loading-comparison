import {useEffect, useState} from 'react';

const DELAY = 1000;

export default function useSimulatedDataLoading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setLoading(false);
    }, DELAY);
    return () => window.clearTimeout(timeoutID);
  });
  return {loading};
}