import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
import useService from '../../../services/use-service';
import styles from './SignIn.module.scss';
export type TErrorTypes = 'forbidden'

export type TLogin = {
  errorType?: TErrorTypes;
};

export type TLoginErrorTypes = 'forbidden';

export function SignIn({ errorType }: TLogin) {

  const ffservice = useService();
  
  const onSubmitLogin = useCallback((event) => {
    event.preventDefault();
    console.log(':::called');
  }, []);

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
        </div>
      </div>
    </div >
  );
}

SignIn.defaultProps = {
  errorType: undefined,
};

export default SignIn;
