import { IProductOrder } from "./Product";

export default interface IOrder {
  ID: string;
  Order: number;
  Date: Date;
  Products: IProductOrder[];
  FinalPrice: number;
}
