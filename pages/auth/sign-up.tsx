import React from 'react';

import { GetServerSideProps } from 'next';
import { SignUp, TLogin, TLoginErrorTypes } from './../../components/Auth/SignUp/SignUp';

type TSignUpPage = TLogin & {
  isPublic: boolean;
};

export default function SignUpPage(props: TLogin) {
  return <SignUp {...props} />;
}

export const getServerSideProps: GetServerSideProps<TSignUpPage> = context => {
  return Promise.resolve({
    props: {
      isPublic: true,
      errorType: context.query?.error as TLoginErrorTypes || null,
    },
  });
};
