import { useMemo } from 'react';

import { useSession } from 'next-auth/react';

const useAuthUser = () => {
  const session = useSession();
  const authUser = useMemo(() => {
    const { data, status } = session;
    if (status === 'authenticated') {
      return data.user;
    }

    return undefined;
  }, [session]);

  return authUser;
};

export default useAuthUser;
