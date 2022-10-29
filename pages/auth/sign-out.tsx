import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { USER } from '../../api/client-service';
import { User } from '../../api/user.type';
import { TLoginErrorTypes } from '../../components/Auth/SignIn/SignIn';

type TSignOutProps = {
  errorType?: TLoginErrorTypes
}

export default function SignOut({ errorType }: TSignOutProps) {
  const router = useRouter();
  void (async () => {
    typeof window !== 'undefined' ? window.localStorage.removeItem(USER) : undefined;    
    router.push('../auth/sign-in');
  })();

  return null;
}
