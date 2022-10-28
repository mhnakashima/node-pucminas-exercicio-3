import { useCallback } from 'react';

const useNumberParse = (precision: number = 2) => {
  const divider = Number('1'.padEnd(precision + 1, '0'));

  const parse = useCallback((text: string) => {
    const unmaskedText = text.replace(/[^0-9]+/g, '');
    return Number(unmaskedText) / divider;
  }, [divider]);

  return parse;
};

export default useNumberParse;
