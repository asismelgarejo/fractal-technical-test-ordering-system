import IOrder from "@/app/src/interfaces/Order";

import MOCK_ORDERS from "@/mocks/MOCK_ORDERS";
import MOCK_PRODUYCTS from "../../../mocks/MOCK_PRODUCTS";

import { Box } from "@mui/material";
import React from "react";
import OrderPageDetail from "./OrderPageDetail";
import IProduct from "@/app/src/interfaces/Product";
type OrderPageProps = {
  params: { "order-id"?: string };
};

const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
  const { order, products } = await getData(params["order-id"] ?? "");


  // compute total order
  order.FinalPrice = order.Products.reduce(
    (prev, next) => prev + next.Qty * next.Product.UnitPrice,
    0
  );

  return (
    <Box sx={{ margin: "32px 0 16px" }}>
      <br />
      <OrderPageDetail order={order} products={products} />
    </Box>
  );
};

export default OrderPage;

async function getData(orderId: string): Promise<{
  order: IOrder;
  products: IProduct[];
}> {
  // const res = await fetch('https://api.example.com/...')
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  const ORDER = MOCK_ORDERS.find((o) => o.ID === orderId);
  if (!ORDER) throw "Not found";
  return { order: ORDER, products: MOCK_PRODUYCTS };
}
