import { useMemo } from 'react';

import getClientInstance, { API_URL_NODE } from './../api/client-service';

function useService(accessToken?: string): App.TAxiosService {
  const apiUrl = API_URL_NODE;

  const axiosInstance = useMemo(() => {
    return getClientInstance(accessToken, apiUrl);
  }, [accessToken, apiUrl]);

  return axiosInstance;
}

export default useService;
