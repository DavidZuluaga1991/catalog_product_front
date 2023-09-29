import { TypeProduct } from '../enums/type-products.enum';

export interface Product {
  _id?: string;
  name: string;
  description: string;
  sku: string;
  image: string;
  type: TypeProduct;
  price: number;
  stock: number;
}
