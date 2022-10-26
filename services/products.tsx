import { TProduct } from "../api/product.type";
import axios from 'axios';

const ENDPOINT_API: string = 'https://thawing-shelf-34829.herokuapp.com/api/v1/';
async function getProducts(): Promise<TProduct[]> {
  const response = axios.get<TProduct[]>(`${ENDPOINT_API}products`).then(response => {
    return response.data;
  });

  return response;
}

const productsService = {
  getProducts,
};

export default productsService;