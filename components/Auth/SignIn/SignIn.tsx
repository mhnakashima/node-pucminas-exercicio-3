import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useCallback, useEffect } from 'react';
import { API_URL_NODE, USER } from '../../../api/client-service';
import useService from '../../../services/use-service';
import styles from './SignIn.module.scss';
export type TErrorTypes = 'forbidden'

export type TLogin = {
  errorType?: TErrorTypes;
};

export type TLoginErrorTypes = 'forbidden';

export function SignIn({ }: TLogin) {

  const ffservice = useService();
  const router = useRouter();
  const [hasError, setHasError] = useState<boolean>(false);

  const onSubmitLogin = useCallback(async (event) => {
    event.preventDefault();

    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    console.log(email, password);

    const result = await ffservice.post(`${API_URL_NODE}seguranca/login`, {
      login: email.value,
      senha: password.value,
    });
    
    if (result.status === 200 && result.data) {
      window.localStorage.setItem(USER, JSON.stringify(result.data));      
      router.push('../main/main');
    } else {
      setHasError(true);
    }
  }, [ffservice, router]);

  return (
    <div className='container'>
      <div className='row'>
        <div className="col">

          <div className={styles.loginContainer}>
            <h1>Olá, seja bem vindo ao FFMúsicas.</h1>
            <form >
              <div className={styles.formGroup}>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className={styles.formGroupLink}>
                <Link href='./sign-up' >
                  <a className={styles.formLink}>Sign Up</a>
                </Link>
                <button onClick={onSubmitLogin} type="submit" className="btn btn-primary">Enviar</button>
              </div>
            </form>
          </div>
          {
            hasError &&
            <div className="alert alert-danger" role="alert">
              Erro ao login
            </div>
          }
        </div>
      </div>
    </div >
  );
}

SignIn.defaultProps = {
  errorType: undefined,
};

export default SignIn;
