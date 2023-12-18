import { parseISO } from "date-fns";
import HomePage from "./HomePage";
import OrderDto from "./src/api/models/Order";
import { orderRepository } from "./src/api/repositories";

const Page = async () => {
  const { data: orders } = await getData();
  return (
    <>
      <HomePage orders={orders} />
    </>
  );
};
type PageHomeProps = {
  data: OrderDto[];
};

const getData = async (): Promise<PageHomeProps> => {
  const { data } = await orderRepository.getOrders();
  // compute total order
  data.map((order) => {
    order.Date = parseISO(order.Date + "");
    order.FinalPrice = order.Products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
  });
  return {
    data,
  };
};
export const dynamic = "force-dynamic";
export default Page;
