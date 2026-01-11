export interface product {
    id?:        number;
    name:      string;
    imagen?:    string;
    brandId:   number;  
    contentUnits: number;
    price:     number;
    stockProductId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}