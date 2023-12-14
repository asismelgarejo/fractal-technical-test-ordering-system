"use client";
import OrderForm from "@/app/src/componets/OrderForm";
import IOrder from "@/app/src/interfaces/Order";
import IProduct from "@/app/src/interfaces/Product";
import { SubmitHandler } from "react-hook-form";

type OrderPageDetailProps = {
  order: IOrder;
  products: IProduct[];
  title: string;
};
const OrderPageDetail: React.FC<OrderPageDetailProps> = ({ order, products, title }) => {
  const onSubmit: SubmitHandler<Omit<IOrder, "ID">> = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <>
      <OrderForm title={title} onSubmit={onSubmit} defaultValues={order} products={products}/>
    </>
  );
};

export default OrderPageDetail;
