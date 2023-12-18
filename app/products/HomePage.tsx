"use client";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductTable from "./ProductTable";
import { ShowLoader } from "../src/tools/loader";
import { productRepository } from "../src/api/repositories/Product.repository";
import DialogConfimation from "../src/componets/DialogConfimation";
import ProductDTO from "../src/api/models/Product";

type HomePageProps = {
  products: ProductDTO[];
};
const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const router = useRouter();
  const [openRemoveProductDialog, setOpenRemoveProductDialog] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null);

  const removeProduct = async (productData: ProductDTO) => {
    try {
      ShowLoader(true);
      const response = await productRepository.deleteProduct(productData.ID);
      if (response.status >= 300) throw new Error(response.message);
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    } finally {
      ShowLoader(false);
    }
  };

  return (
    <Box sx={{ margin: "32px 0 16px" }}>
      <h1>My products</h1>
      <br />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="medium"
        onClick={() => router.push(`/products/add-product/`)}
      >
        Add Product
      </Button>
      <br />
      <br />
      <ProductTable
        rows={products}
        deleteProduct={(product) => {
          setSelectedProduct(product);
          setOpenRemoveProductDialog(true);
        }}
      />
      <DialogConfimation
        message="Are you sure you want to remove this product?"
        onClose={() => setOpenRemoveProductDialog(false)}
        onConfirm={() => {
          if (!selectedProduct) return;
          removeProduct(selectedProduct);
          setOpenRemoveProductDialog(false);
        }}
        open={openRemoveProductDialog}
      />
    </Box>
  );
};

export default HomePage;
