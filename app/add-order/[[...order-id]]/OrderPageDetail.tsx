"use client";
import OrderForm from "@/app/src/componets/OrderForm";
import { SubmitHandler } from "react-hook-form";
import { orderRepository } from "@/app/src/api/repositories";
import { ShowLoader } from "@/app/src/tools/loader";
import OrderDto from "@/app/src/api/models/Order";
import ProductDTO from "@/app/src/api/models/Product";

type OrderPageDetailProps = {
  order: OrderDto;
  products: ProductDTO[];
  title: string;
};

const OrderPageDetail: React.FC<OrderPageDetailProps> = ({
  order,
  products,
  title,
}) => {
  const onSubmit: SubmitHandler<OrderDto> = async (data) => {
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
        data as OrderDto
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
