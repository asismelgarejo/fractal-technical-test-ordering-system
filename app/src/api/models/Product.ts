export default interface ProductDTO {
  ID: string;
  Name: string;
  UnitPrice: number;
}
export interface ProductOrderDTO {
  Product: ProductDTO;
  Qty: number;
  TotalPrice: number;
}
