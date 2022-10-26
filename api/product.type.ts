export enum TProductStatus {
    DONE = 'done',
    DOING = 'doing',
    TODO = 'todo',
} 

export type TProduct = {
    id?: string;
    name: string;
    restaurant?: string;
    price?: number;
};