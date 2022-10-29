import { signOut } from 'next-auth/react';
import { TLoginErrorTypes } from '../../components/Auth/SignIn/SignIn';

type TSignOutProps = {
  errorType?: TLoginErrorTypes
}

export default function SignOut({ errorType }: TSignOutProps) {
  void (async () => {
    const callbackUrl = errorType ? `/auth/sign-in?error=${errorType}` : '/auth/sign-in';
    await signOut({
      callbackUrl,
    });
  })();

  return null;
}
