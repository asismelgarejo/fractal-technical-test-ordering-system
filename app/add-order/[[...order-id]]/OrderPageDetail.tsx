"use client";
import OrderForm from "@/app/src/componets/OrderForm";
import IOrder from "@/app/src/interfaces/Order";
import IProduct from "@/app/src/interfaces/Product";
import { Response } from "@/app/src/interfaces/Response";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FRACTAL_SERVICE } from "../../src/constants/API_URL";

type OrderPageDetailProps = {
  order: IOrder;
  products: IProduct[];
  title: string;
};

async function createOrder(payload: IOrder): Promise<Response<null>> {
  try {
    const res = await fetch(
      `${FRACTAL_SERVICE}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to create order: ${res.statusText}`);
    }

    const data: Response<null> = await res.json();

    return { data: null, status: 200, message: "success" };
  } catch (error) {
    console.error("Error creating order:", error);
    return { data: null, status: 500, message: "Internal Server Error" };
  }
}

const OrderPageDetail: React.FC<OrderPageDetailProps> = ({
  order,
  products,
  title,
}) => {
  const router = useRouter();

  const onSubmit: SubmitHandler<Omit<IOrder, "ID">> = async (data) => {
    await createOrder(data as IOrder);
    router.push("/");
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
