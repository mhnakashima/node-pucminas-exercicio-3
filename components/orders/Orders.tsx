import React, { useCallback, useState, useMemo } from 'react';
import { TProduct } from "../../api/product.type";
import Header from "../../components/header/Header";
import styles from './Orders.module.scss';

import { app, database } from './../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { TOrder, TOrderPlace } from '../../api/order.type';
import { uuidv4 } from '@firebase/util';

export type TOrderProps = {
    products: TProduct[],
}

export const Orders: React.FC = ({ products }: TOrderProps) => {

    const [orderList, setOrderList] = useState<TProduct[]>([]);
    const productsList: TProduct[] = products;

    const dbInstance = useMemo(() => collection(database, 'orders'), []);
    const handleClickProductToOrder = useCallback((event: React.MouseEvent) => {
        const itemId = (event.target as HTMLElement).getAttribute('data-id');
        const orderToInsert = productsList.find(item => parseInt(item.id) === parseInt(itemId));
        setOrderList([...orderList, orderToInsert]);
    }, [orderList, productsList]);

    const handleMakeOrder = useCallback(async (event: React.MouseEvent) => {

        const orderItem: TOrder = {
            id: uuidv4(),
            products: orderList,
            idOrderPlace: TOrderPlace.MESA
        }

        try {
            await addDoc(dbInstance, {
                orders: orderItem
            });
        } catch (err) {
            console.error("writeToDB failed. reason :", err)
        }

        setOrderList([]);
    }, [dbInstance, orderList]);

    const removeItemFromOrder = useCallback((event: React.MouseEvent) => {
        const itemId = (event.target as HTMLElement).getAttribute('data-id');
        const values = orderList.filter(item => item.id.toString() !== itemId);
        setOrderList(values);
    }, [orderList]);

    return (
        <div className=''>
            <Header>
                <div className={styles.container}>
                    <h1>Pedidos</h1>
                </div>

                <div className="row">
                    <div className={orderList.length > 0 ? 'col-sm-9' : 'col-sm-12'}>
                        <div className="row">
                            {
                                productsList && productsList.map((item, i) => {
                                    return (
                                        <div key={item.id} className="col-12 col-sm-6">
                                            <div className='card'>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">{item.restaurant}</p>
                                                    <button data-id={item.id} onClick={handleClickProductToOrder} className="btn btn-primary">Adicionar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={orderList.length > 0 ? 'col-sm-3 productsViewOrder' : 'd-none'}>
                        <div className="row">
                            <h2 className='subtitle my-2'>Seu pedido:</h2>
                        </div>
                        <div className="row">
                            {
                                orderList && orderList.map((item, i) => {
                                    return (
                                        <div key={uuidv4()} className="col-12">
                                            <div className='card'>
                                                <div className="card-body d-flex align-items-center">
                                                    <span>{item.name}</span>
                                                    <button onClick={removeItemFromOrder} data-id={item.id} type="button" className="btn btn-danger ml-auto">
                                                        <i className="icon bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button onClick={handleMakeOrder} type="button" className="btn btn-success">Fazer pedido</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Header>
        </div>
    );
}