"use client";
import OrderTable from "./src/componets/OrderTable";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import RemoveProductModal from "./src/componets/DialogConfimation";
import { useState } from "react";
import { orderRepository } from "./src/api/repositories";
import { ShowLoader } from "./src/tools/loader";
import OrderDto from "./src/api/models/Order";

type HomePageProps = {
  orders: OrderDto[];
};
const HomePage: React.FC<HomePageProps> = ({ orders }) => {
  const router = useRouter();
  const [openRemoveOrderDialog, setOpenRemoveProductDialog] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);

  const removeProduct = async (orderData: OrderDto) => {
    try {
      ShowLoader(true);
      const response = await orderRepository.deleteOrder(orderData.ID);
      if (response.status >= 300) throw new Error(response.message);
      router.refresh();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order");
    } finally {
      ShowLoader(false);
    }
  };
  const changeStatus = async (orderData: OrderDto) => {
    try {
      ShowLoader(true);
      const response = await orderRepository.updateOrder(
        orderData.ID,
        orderData
      );
      if (response.status >= 300) throw new Error(response.message);
      router.refresh();
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error updating order");
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
        deleteOrder={(orderPayload) => {
          setSelectedOrder(orderPayload);
          setOpenRemoveProductDialog(true);
        }}
        changeStatus={(orderPayload) => {
          changeStatus(orderPayload);
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
