import { useCallback, useMemo } from 'react';

export type TFormatOptions = {
  precision?: number;
};

const defaultOptions: TFormatOptions = {
  precision: 2,
};

const useNumberFormat = (locale: string, options: TFormatOptions = defaultOptions) => {
  const { precision } = options;

  const formatter = useMemo(() => {
    const intlNumberFormatOptions: Intl.NumberFormatOptions = {
      style: 'decimal',
      minimumFractionDigits: precision,
    };
    return new Intl.NumberFormat(locale, intlNumberFormatOptions);
  }, [locale, precision]);

  const formatDecimal = useCallback((value: number | bigint | string) => {
    const number = typeof value === 'string' ? Number(value) : value;
    return formatter.format(number);
  }, [formatter]);

  return formatDecimal;
};

export default useNumberFormat;
