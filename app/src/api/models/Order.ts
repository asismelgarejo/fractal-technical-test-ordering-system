import { ProductOrderDTO } from "./Product";

export default interface OrderDto {
  ID: string;
  Order: string;
  Date: Date;
  Products: ProductOrderDTO[];
  FinalPrice: number;
}
