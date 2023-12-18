import IOrder from "@/app/src/interfaces/Order";

import { Box } from "@mui/material";
import React from "react";
import OrderPageDetail from "./OrderPageDetail";
import { parseISO } from "date-fns";
import OrderDto from "@/app/src/api/models/Order";
import { orderRepository } from "@/app/src/api/repositories";
import { productRepository } from "@/app/src/api/repositories/Product.repository";

type OrderPageProps = {
  params: { "order-id"?: string };
};

const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
  const orderId = params["order-id"];

  let orderDefaultValues: IOrder = {
    Date: new Date(),
    FinalPrice: 0,
    ID: "",
    Order: "",
    Products: [],
  };
  const { data: productsData } = await productRepository.getProducts();
  if (orderId) {
    const orderData = await getOrderData(orderId[0]);

    if (orderData === null) throw new Error("Order not found");
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

export default OrderPage;

export const getOrderData = async (id: string): Promise<OrderDto> => {
  const { data: order } = await orderRepository.getOrder(id);
  // compute total order
  order.Date = parseISO(order.Date + "");
  order.FinalPrice = order.Products.reduce(
    (prev, next) => prev + next.Qty * next.Product.UnitPrice,
    0
  );
  return order;
};
