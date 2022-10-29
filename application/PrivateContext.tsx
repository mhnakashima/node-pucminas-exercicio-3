import React from 'react';

import { useRouter } from 'next/router';

import useDidMount from './../hooks/use-did-mount';

type TPrivateContextProps = {
  children: React.ReactElement;
};

const PrivateContext = ({ children }: TPrivateContextProps) => {
  const router = useRouter();
  
  useDidMount(() => {
    router.push('/auth/sign-in');
  })

  return (<>{children}</>);
};

export default PrivateContext;
