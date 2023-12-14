import mongoose from "mongoose";
import MOCK_ORDERS from "../mocks/MOCK_ORDERS";
import HomePage from "./HomePage";
import { Response } from "./src/interfaces/Response";
import IOrder from "./src/interfaces/Order";

export default async function Page() {
  const ordersData = await getOrdersData();

  // compute total order
  ordersData.data.map((order) => {
    order.FinalPrice = order.Products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
  });

  return <HomePage orders={ordersData.data} />;
}

async function getOrdersData(): Promise<Response<IOrder[]>> {
  return { data: MOCK_ORDERS, status: 200, message: "success" };
}

