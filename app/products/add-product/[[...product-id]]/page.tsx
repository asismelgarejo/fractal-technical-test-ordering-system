import IProduct from "@/app/src/interfaces/Product";

import { Box } from "@mui/material";
import React from "react";
import ProductPageDetail from "./ProductPageDetail";
import ProductDTO from "@/app/src/api/models/Product";
import { productRepository } from "@/app/src/api/repositories/Product.repository";

type ProductPageProps = {
  params: { "product-id"?: string };
};

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const productId = params["product-id"];

  let productDefaultValues: ProductDTO = {
    UnitPrice: 0,
    Name: "",
    ID: "",
  };
  if (productId) {
    const { data: productData } = await getProductData(productId[0]);
    if (productData === null) throw new Error("Product not found");
    productDefaultValues = productData;
  }

  return (
    <Box sx={{ margin: "32px 0 16px" }}>
      <br />
      <br />
      <br />
      <br />
      <ProductPageDetail
        title={productDefaultValues.ID !== "" ? "Edit Product" : "Add Product"}
        product={productDefaultValues}
      />
    </Box>
  );
};

export default ProductPage;
export const dynamic = "force-dynamic";

const getProductData = async (
  id: string
): Promise<{ data: ProductDTO }> => {
  const { data } = await productRepository.getProduct(id);
  return { data };
};
