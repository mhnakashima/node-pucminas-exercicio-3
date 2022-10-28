import { useCallback, useState } from 'react';

type TFilterCallback<T> = (item: T, index: number, array: T[]) => boolean;

const useArrayState = <T>(initialValue: T[] = []) => {
  const [items, setArray] = useState<T[]>(initialValue);

  const append = useCallback<(items: T[]) => void>(items => {
    setArray(previousArray => [...previousArray, ...items]);
  }, []);

  const remove = useCallback<(predicateOrIndex: number | TFilterCallback<T>) => void>(predicateOrIndex => {
    if (typeof predicateOrIndex === 'function') {
      setArray(previousArray => previousArray.filter(predicateOrIndex));
    } else {
      setArray(previousArray => previousArray.filter((_, index) => index === predicateOrIndex));
    }
  }, []);

  const reset = useCallback<(items?: T[]) => void>((items = []) => {
    setArray(items);
  }, []);

  return {
    items,
    append,
    remove,
    reset,
  };
};

export default useArrayState;
