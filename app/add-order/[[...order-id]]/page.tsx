import IOrder from "@/app/src/interfaces/Order";

import { Box } from "@mui/material";
import React from "react";
import OrderPageDetail from "./OrderPageDetail";
import IProduct from "@/app/src/interfaces/Product";
import { Response } from "@/app/src/interfaces/Response";
import { FRACTAL_SERVICE } from "../../src/constants/API_URL";
import { parseISO } from "date-fns";

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
        title={orderDefaultValues.ID !== "" ? "Edit Order" : "Add Order"}
        order={orderDefaultValues}
        products={productsData.data}
      />
    </Box>
  );
};

export default OrderPage;

// SERVER CALLS
async function getOrderData(orderId: string): Promise<Response<IOrder | null>> {
  try {
    const res = await fetch(`${FRACTAL_SERVICE}/orders/${orderId}`, {
      cache: "no-store", // disable the cache completely
    });

    if (!res.ok) {
      return { data: null, status: res.status, message: "not found" };
    }

    const data: Response<IOrder> = await res.json();
    data.data.Date = parseISO(data.data.Date + "");

    return { data: data.data, status: 200, message: "success" };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { data: null, status: 500, message: "Internal Server Error" };
  }
}
async function getProductsData(): Promise<Response<IProduct[]>> {
  const res = await fetch(`${FRACTAL_SERVICE}/products`, {
    cache: "no-store", // disable the cache completely
  });
  const data: Response<IProduct[]> = await res.json();

  return { data: data.data, status: 200, message: "success" };
}
