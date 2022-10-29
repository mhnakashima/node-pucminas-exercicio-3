import React from 'react';

import { GetServerSideProps } from 'next';
import { SignIn, TLogin, TLoginErrorTypes } from './../../components/Auth/SignIn/SignIn';

type TSignInPage = TLogin & {
  isPublic: boolean;
};

export default function SignInPage(props: TLogin) {
  return <SignIn {...props} />;
}

export const getServerSideProps: GetServerSideProps<TSignInPage> = context => {
  return Promise.resolve({
    props: {
      isPublic: true,
      errorType: context.query?.error as TLoginErrorTypes || null,
    },
  });
};
