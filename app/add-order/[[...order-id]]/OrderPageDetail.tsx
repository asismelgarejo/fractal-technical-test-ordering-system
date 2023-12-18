"use client";
import OrderForm from "@/app/src/componets/OrderForm";
import IOrder from "@/app/src/interfaces/Order";
import IProduct from "@/app/src/interfaces/Product";
import { SubmitHandler } from "react-hook-form";
import { orderRepository } from "@/app/src/api/repositories";
import { ShowLoader } from "@/app/src/tools/loader";

type OrderPageDetailProps = {
  order: IOrder;
  products: IProduct[];
  title: string;
};

const OrderPageDetail: React.FC<OrderPageDetailProps> = ({
  order,
  products,
  title,
}) => {
  const onSubmit: SubmitHandler<IOrder> = async (data) => {
    try {
      ShowLoader(true);
      if (data.ID === "") {
        const response = await orderRepository.createOrder(data);
        if (response.status >= 300) throw new Error(response.message);
        window.location.replace("/")
        return;
      }
      const response = await orderRepository.updateOrder(
        data.ID,
        data as IOrder
      );

      if (response.status >= 300) throw new Error(response.message);
      window.location.replace("/")
    } catch (error: any) {
      console.log(error);
      alert(error?.message ?? "");
    } finally {
      ShowLoader(false);
    }
  };

  return (
    <>
      <OrderForm
        title={title}
        onSubmit={onSubmit}
        defaultValues={order}
        products={products}
      />
    </>
  );
};

export default OrderPageDetail;
