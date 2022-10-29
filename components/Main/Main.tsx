import { randomUUID } from 'crypto';
import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { API_URL_NODE, USER } from '../../api/client-service';
import { TSongs } from "../../api/songs.type";
import { User } from '../../api/user.type';
import useDidMount from '../../hooks/use-did-mount';
import useService from '../../hooks/use-service';

import Header from "../header/Header";
import styles from './Main.module.scss';

export type TMainProps = {
    user: User,
}

export const Main: React.FC = () => {
    const user: User = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(USER)) : undefined;
    const ffservice = useService(user ? user.token : undefined);
    const [songsList, setSongList] = useState<TSongs[]>([]);
    const [hasError, setHasError] = useState<boolean>(false);

    const renderList = useCallback(() => {
        ffservice.get(`${API_URL_NODE}musicas`)
            .then(response => {
                if (response.status === 200) {
                    setSongList(response.data);
                }
            });
    }, [ffservice]);

    const onSubmitRegister = useCallback(async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome') as HTMLInputElement;
        const autor = document.getElementById('autor') as HTMLInputElement;

        console.log(nome.value, autor.value, user);

        const result = await ffservice.post(`${API_URL_NODE}musicas`, {
            musica: {
                nome: nome.value,
                autor: autor.value,
            }
        });

        if (result.status === 200) {
            renderList();
        } else {
            setHasError(true);
        }
    }, [ffservice, renderList, user]);

    useEffect(() => {
        if (user) {
            renderList();
        }
    }, [renderList, user]);

    return (
        <div className=''>
            <Header>
                <div className={styles.container}>
                    <h1>Músicas </h1>
                </div>

                <div className="row">
                    <div className='col-sm-12'>
                        <div className="row">
                            {
                                songsList && songsList.map((item, i) => {
                                    return (
                                        <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="card" >
                                                { /* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src="https://via.placeholder.com/200x150" className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.nome}</h5>
                                                    <p className="card-text">{item.autor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                songsList.length === 0 && <div className="col-12" role="alert">
                                    <div className="alert alert-warning" role="alert">Sem músicas cadastradas</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {
                    user && user.roles.includes("ADMIN") &&
                    (
                        <div className={styles.formContainer}>
                            <div className="row">
                                <div className='col-sm-12'>
                                    <form >
                                        <div className={styles.formGroup}>
                                            <label htmlFor="exampleInputMusica">Música:</label>
                                            <input type="text" className="form-control" id="nome" aria-describedby="emailHelp" placeholder="Insira o nome da música" />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="exampleInputAutor">Autor:</label>
                                            <input type="text" className="form-control" id="autor" placeholder="Insira o nome do autor" />
                                        </div>
                                        <div className={styles.formGroupLink}>
                                            <button onClick={onSubmitRegister} type="submit" className="btn btn-primary">Enviar</button>
                                        </div>
                                    </form>
                                    {
                                        hasError &&
                                        <div className="alert alert-danger" role="alert">
                                            Erro ao cadastrar uma música
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </Header>
        </div>
    );
}
