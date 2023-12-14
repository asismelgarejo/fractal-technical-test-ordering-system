export default interface IProduct {
  ID: string;
  Name: string;
  UnitPrice: number;
}
export interface IProductOrder {
  Product: IProduct;
  Qty: number;
  TotalPrice: number;
}
