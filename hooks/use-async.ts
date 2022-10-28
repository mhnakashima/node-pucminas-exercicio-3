import { useCallback, useState } from 'react';

function useAsync<T = unknown, R = void>(callback: (data: T) => Promise<R>) {
  const [loading, setLoading] = useState(false);

  const func = useCallback(async (data: T): Promise<R> => {
    try {
      setLoading(true);
      return await callback(data);
    } finally {
      setLoading(false);
    }
  }, [callback]);

  return { loading, func };
}

export default useAsync;
