import MOCK_ORDERS from "../mocks/MOCK_ORDERS";
import HomePage from "./HomePage";

export default async function Page() {
  const orders = await getData();

  // compute total order
  orders.map((order) => {
    order.FinalPrice = order.Products.reduce(
      (prev, next) => prev + next.Qty * next.Product.UnitPrice,
      0
    );
  });

  return <HomePage orders={orders}/>;
}
async function getData() {
  // const res = await fetch('https://api.example.com/...')
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  return MOCK_ORDERS;
}
