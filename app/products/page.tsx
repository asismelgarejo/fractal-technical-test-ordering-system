import { parseISO } from "date-fns";
import HomePage from "./HomePage";
import ProductDTO from "../src/api/models/Product";
import { productRepository } from "../src/api/repositories/Product.repository";

const Page = async () => {
  const { data } = await getData();
  return (
    <>
      <HomePage products={data.products} />
    </>
  );
};
type PageHomeProps = {
  data: {
    products: ProductDTO[];
  };
};

const getData = async (): Promise<PageHomeProps> => {
  const { data } = await productRepository.getProducts();
  return {
    data: {
      products: data,
    },
  };
};
export const dynamic = "force-dynamic";
export default Page;
