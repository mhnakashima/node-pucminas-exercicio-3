import { useMemo } from 'react';

import { useSession } from 'next-auth/react';
import getClientInstance from '../api/client-service';

function useService(): App.TAxiosService {
  const session = useSession();
  const apiUrl = typeof window !== 'undefined' ? window.env?.API_URL : undefined;

  const axiosInstance = useMemo(() => {
    const accessToken = session.data?.accessToken;
    return getClientInstance(accessToken, apiUrl);
  }, [session, apiUrl]);

  return axiosInstance;
}

export default useService;
