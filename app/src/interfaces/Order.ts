import { IProductOrder } from "./Product";

export default interface IOrder {
  ID: string;
  Order: string;
  Date: Date;
  Products: IProductOrder[];
  FinalPrice: number;
}
