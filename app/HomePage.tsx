"use client";
import IOrder from "@/app/src/interfaces/Order";
import { SubmitHandler } from "react-hook-form";
import OrderTable from "./src/componets/OrderTable";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

type HomePageProps = {
  orders: IOrder[];
};
const HomePage: React.FC<HomePageProps> = ({ orders }) => {
  const onSubmit: SubmitHandler<Omit<IOrder, "ID">> = (data) => {
    console.log(data);
    // Handle form submission logic here
  };
  const router = useRouter();

  return (
    <Box sx={{ margin: "32px 0 16px" }}>
      <h1>My orders</h1>
      <br />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="medium"
        onClick={() => router.push(`/add-order/`)}
      >
        Add Order
      </Button>
      <br />
      <br />
      <OrderTable rows={orders} />
    </Box>
  );
};

export default HomePage;
