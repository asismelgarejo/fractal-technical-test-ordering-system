"use client";
import IOrder from "@/app/src/interfaces/Order";
import OrderTable from "./src/componets/OrderTable";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import RemoveProductModal from "./src/componets/DialogConfimation";
import { useState } from "react";
import { orderRepository } from "./src/api/repositories";
import { ShowLoader } from "./src/tools/loader";

type HomePageProps = {
  orders: IOrder[];
};
const HomePage: React.FC<HomePageProps> = ({ orders }) => {
  const router = useRouter();
  const [openRemoveOrderDialog, setOpenRemoveProductDialog] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const removeProduct = async (orderData: IOrder) => {
    try {
      ShowLoader(true);
      const response = await orderRepository.deleteOrder(orderData.ID);
      if (response.status >= 300) throw new Error(response.message);
      router.refresh();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order")
    } finally {
      ShowLoader(false);
    }
  };

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
      <OrderTable
        rows={orders}
        deleteOrder={(product) => {
          setSelectedOrder(product);
          setOpenRemoveProductDialog(true);
        }}
      />
      <RemoveProductModal
        message="Are you sure you want to remove this order?"
        onClose={() => setOpenRemoveProductDialog(false)}
        onConfirm={() => {
          if (!selectedOrder) return;
          removeProduct(selectedOrder);
          setOpenRemoveProductDialog(false);
        }}
        open={openRemoveOrderDialog}
      />
    </Box>
  );
};

export default HomePage;
