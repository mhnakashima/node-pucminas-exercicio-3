import React from 'react';
import { Orders } from '../../components/orders/Orders';
import productsService from '../../services/products';

const OrdersPage = (props: any) => {
    return <Orders {...props} />;
};

export const getServerSideProps = async context => {
    const products = await productsService.getProducts() || [{ id: '2', name: 'teste', price: 3 }];
    return { props: { products } };
};

export default OrdersPage;
