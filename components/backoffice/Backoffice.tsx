import { collection, getDocs, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { TProduct } from "../../api/product.type";
import { database } from './../../firebaseConfig';

import Header from "../header/Header";
import styles from './Backoffice.module.scss';

export type TOrderProps = {
    products: TProduct[],
}

const dbInstance = collection(database, 'orders');

export const Backoffice: React.FC = () => {

    const [orderList, setOrderList] = useState<TProduct[]>([]);
    const handleClickProductDone = useCallback(async (event: React.MouseEvent) => {
        const itemId = (event.target as HTMLElement).getAttribute('data-id');

        const collectionById = doc(database, 'orders', itemId);
        await deleteDoc(collectionById);
    }, []);

    useEffect(() =>
        onSnapshot(dbInstance,
            snapshot => {
                setOrderList(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
            })
        , []);

    return (
        <div className=''>
            <Header>
                <div className={styles.container}>
                    <h1>Backoffice</h1>
                </div>

                <div className="row">
                    <div className='col-sm-12'>
                        <div className="row">
                            {
                                orderList && orderList.map((item, i) => {
                                    return (
                                        <div key={item.id} className="col-12">
                                            <div className='card'>
                                                <div className="card-body d-flex align-items-center">
                                                    <h5 className="card-title mb-0">Pedido: {item.id}</h5>
                                                    <button data-id={item.id} onClick={handleClickProductDone} className="btn btn-warning ml-auto">Entregar Pedido</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                orderList.length === 0 && <div className="col-12" role="alert">
                                    <div className="alert alert-warning" role="alert">Sem pedidos</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Header>
        </div>
    );
}
