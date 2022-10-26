import { TProduct } from './product.type';

export enum TOrderPlace {
  MESA = 'Mesa',
  DELIVERY = 'Delivery',
} 

export type TOrder = {
  id?: string;
  products: TProduct[];
  idOrderPlace: string;
};
