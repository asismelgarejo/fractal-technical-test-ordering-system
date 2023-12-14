import HomePage from "./HomePage";
import { Response } from "./src/interfaces/Response";
import IOrder from "./src/interfaces/Order";
import { FRACTAL_SERVICE } from "./src/constants/API_URL";
import { parseISO  } from "date-fns";

export default async function Page() {
  const ordersData = await getOrdersData();

  // compute total order
  ordersData.data.map((order) => {
    order.FinalPrice = order.Products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
  });

  // return <h1>sdfsdfsdf</h1>;
  return <HomePage orders={ordersData.data} />;
}

async function getOrdersData(): Promise<Response<IOrder[]>> {
  const res = await fetch(`${FRACTAL_SERVICE}/orders`);
  const data: Response<IOrder[]> = await res.json();
  data.data.forEach((order)=>{
    order.Date = parseISO(order.Date+"")
  })

  return { data: data.data, status: 200, message: "success" };
}
