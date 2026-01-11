import { product } from './product';
export interface Stock {
    id:         number;
    productId:  number;
    totalUnits: number;
    minStock:   number;
    createdAt:  Date;
    updatedAt:  Date;
    product:    product;
}