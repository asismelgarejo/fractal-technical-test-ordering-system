import IOrder from "@/app/src/interfaces/Order";

import MOCK_ORDERS from "@/mocks/MOCK_ORDERS";
import MOCK_PRODUYCTS from "../../../mocks/MOCK_PRODUCTS";

import { Box } from "@mui/material";
import React from "react";
import OrderPageDetail from "./OrderPageDetail";
import IProduct from "@/app/src/interfaces/Product";
import { Response } from "@/app/src/interfaces/Response";
type OrderPageProps = {
  params: { "order-id"?: string };
};

const OrderPage: React.FC<OrderPageProps> = async ({ params }) => {
  const orderId = params["order-id"];
  console.log("params", params);
  

  let orderDefaultValues: IOrder = {
    Date: new Date(),
    FinalPrice: 0,
    ID: "0",
    Order: "",
    Products: [],
  };
  const productsData = await getProductsData();
  if (orderId) {
    const orderData = await getOrderData(orderId[0]);

    if (orderData.data === null) throw new Error("Order not found");
    orderDefaultValues = orderData.data as IOrder;
    orderDefaultValues.FinalPrice = orderDefaultValues.Products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
  }

  return (
    <Box sx={{ margin: "32px 0 16px" }}>
      <br />
      <OrderPageDetail
        title={orderDefaultValues.ID !== "0" ? "Edit Order" : "Add Order"}
        order={orderDefaultValues}
        products={productsData.data}
      />
    </Box>
  );
};

export default OrderPage;

// SERVER CALLS
async function getOrderData(orderId: string): Promise<Response<IOrder | null>> {
  const ORDER = MOCK_ORDERS.find((o) => o.ID === orderId);
  console.log(">orderId", orderId);
  console.log(">ORDER", ORDER);
  
  if (!ORDER) {
    return { data: null, status: 404, message: "not found" };
  }
  return { data: ORDER, status: 200, message: "success" };
}
async function getProductsData(): Promise<Response<IProduct[]>> {
  return { data: MOCK_PRODUYCTS, status: 200, message: "success" };
}
