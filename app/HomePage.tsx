"use client";
import IOrder from "@/app/src/interfaces/Order";
import OrderTable from "./src/componets/OrderTable";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import RemoveProductModal from "./src/componets/DialogConfimation";
import { useState } from "react";
import { FRACTAL_SERVICE } from "./src/constants/API_URL";

type HomePageProps = {
  orders: IOrder[];
};
const HomePage: React.FC<HomePageProps> = ({ orders }) => {
  const router = useRouter();
  const [openRemoveOrderDialog, setOpenRemoveProductDialog] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const removeProduct = async (orderData: IOrder) => {
    try {
      const res = await fetch(`${FRACTAL_SERVICE}/orders/${orderData.ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // disable the cache completely
      });

      if (!res.ok) {
        throw new Error(`Failed to delete order: ${res.statusText}`);
      }

      alert("Reload the page");
      return { data: null, status: 200, message: "success" };
    } catch (error) {
      console.error("Error deleting order:", error);
      return { data: null, status: 500, message: "Internal Server Error" };
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
