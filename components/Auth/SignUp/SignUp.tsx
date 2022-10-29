import React, { useCallback } from 'react';
import { API_URL_NODE } from '../../../api/client-service';
import useService from '../../../hooks/use-service';
import styles from './SignUp.module.scss';

export type TErrorTypes = 'forbidden'

export type TLogin = {
  errorType?: TErrorTypes;
};

export type TLoginErrorTypes = 'forbidden';

export function SignUp({ errorType }: TLogin) {

  const ffservice = useService();
  console.log('ffservice', ffservice);

  console.log(API_URL_NODE);

  const onSubmitLogin = useCallback(async(event) => {
    event.preventDefault();
    console.log(':::called');

    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const result = await ffservice.post(`${API_URL_NODE}seguranca/register`, {
      nome: email.value,
      login: email.value,
      email: email.value,
      senha: password.value,
    });
  }, [ffservice]);

  return (
    <div className='container'>
      <div className='row'>
        <div className="col">

          <div className={styles.loginContainer}>
            <h1>Cadastre-se.</h1>
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
                <button onClick={onSubmitLogin} type="submit" className="btn btn-primary">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
}

SignUp.defaultProps = {
  errorType: undefined,
};

export default SignUp;
