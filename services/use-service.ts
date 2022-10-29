import { useMemo } from 'react';

import getClientInstance from '../api/client-service';

function useService(accessToken?: string): App.TAxiosService {
  const apiUrl = typeof window !== 'undefined' ? window.env?.API_URL : undefined;

  const axiosInstance = useMemo(() => {
    return getClientInstance(accessToken, apiUrl);
  }, [accessToken, apiUrl]);

  return axiosInstance;
}

export default useService;
