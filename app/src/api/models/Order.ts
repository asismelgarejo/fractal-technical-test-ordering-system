import { ProductOrderDTO } from "./Product";

export type OrderStatus = "Completed" | "InProgress" | "Pending";
export default interface OrderDto {
  ID: string;
  Order: string;
  Date: Date;
  Products: ProductOrderDTO[];
  FinalPrice: number;
  Status: OrderStatus;
}
