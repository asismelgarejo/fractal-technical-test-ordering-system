"use client";
import { SubmitHandler } from "react-hook-form";
import ProductDTO from "../../../src/api/models/Product";
import { productRepository } from "@/app/src/api/repositories/Product.repository";
import { ShowLoader } from "@/app/src/tools/loader";
import ProductForm from "./ProductForm";
type ProductPageDetailProps = {
  product: ProductDTO;
  title: string;
};

const ProductPageDetail: React.FC<ProductPageDetailProps> = ({
  product,
  title,
}) => {

  const onSubmit: SubmitHandler<ProductDTO> = async (data) => {
    try {
      ShowLoader(true);
      if (data.ID === "") {
        const response = await productRepository.createProduct(data);
        if (response.status >= 300) throw new Error(response.message);
        window.location.replace("/products");
        return;
      }
      const response = await productRepository.updateProduct(
        data.ID,
        data as ProductDTO
      );

      if (response.status >= 300) throw new Error(response.message);

      window.location.replace("/products");
    } catch (error: any) {
      console.log(error);
      alert(error?.message ?? "");
    } finally {
      ShowLoader(false);
    }
  };

  return (
    <>
      <ProductForm title={title} onSubmit={onSubmit} defaultValues={product} />
    </>
  );
};

export default ProductPageDetail;
