import React from 'react';

import pick from 'lodash.pick';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import useAsync from './/../hooks/use-async';
import useAuthUser from './../hooks/use-auth-user';
import useDidMount from './../hooks/use-did-mount';
import useService from './../hooks/use-service';

type TPrivateContextProps = {
  children: React.ReactElement;
};


const PrivateContext = ({ children }: TPrivateContextProps) => {
  const session = useSession();
  const router = useRouter();
  const isAuthenticated = session.status === 'authenticated';

  if (session.status === 'unauthenticated') {
    router.push('/auth/sign-in');
    return null;
  }

  if (session.status !== 'authenticated') {
    // TODO: Should render a loading page here
    return null;
  }

  return ({children});
};

export default PrivateContext;
