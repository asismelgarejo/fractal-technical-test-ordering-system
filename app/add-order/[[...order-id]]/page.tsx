import { Box } from "@mui/material";
import React from "react";
import OrderPageDetail from "./OrderPageDetail";
import { parseISO } from "date-fns";
import { orderRepository } from "@/app/src/api/repositories";
import { productRepository } from "@/app/src/api/repositories/Product.repository";
import OrderDto from "@/app/src/api/models/Order";

type OrderPageProps = {
  params: { "order-id"?: string };
};

const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
  const orderId = params["order-id"];

  let orderDefaultValues: OrderDto = {
    Date: new Date(),
    FinalPrice: 0,
    ID: "",
    Order: "",
    Products: [],
    Status: "Pending",
  };
  const { data: productsData } = await productRepository.getProducts();
  if (orderId) {
    const { data: orderData } = await getOrderData(orderId[0]);

    if (orderData === null) {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <h2>An unexpected error happened</h2>
        </div>
      );
    }
    orderDefaultValues = orderData;
    orderDefaultValues.FinalPrice = orderDefaultValues.Products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
  }

  return (
    <Box sx={{ margin: "32px 0 16px" }}>
      <br />
      <br />
      <br />
      <br />
      <OrderPageDetail
        title={orderDefaultValues.ID !== "" ? "Edit Order" : "Add Order"}
        order={orderDefaultValues}
        products={productsData}
      />
    </Box>
  );
};

const getOrderData = async (id: string): Promise<{ data: OrderDto | null }> => {
  try {
    const { data: order, status, message } = await orderRepository.getOrder(id);

    if (status >= 300) {
      throw new Error(message);
    }

    // compute total order
    order.Date = parseISO(order.Date + "");
    order.FinalPrice = order.Products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
    return { data: order };
  } catch (err) {
    console.log(err);
    return { data: null };
  }
};
export const dynamic = "force-dynamic";
export default OrderPage;
