import { AxiosInstance } from "axios";
import { api } from "../api";
import { HttpResponse } from "../models";
import ProductDto from "../models/Product";

class ProductRepository {
  constructor(private api: AxiosInstance) {}
  async getProducts(): Promise<HttpResponse<ProductDto[]>> {
    try {
      const response = await this.api.get<HttpResponse<ProductDto[]>>("/products");
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async getProduct(ID: string): Promise<HttpResponse<ProductDto>> {
    try {
      const response = await this.api.get<HttpResponse<ProductDto>>(
        `/products/${ID}`
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async createProduct(data: ProductDto): Promise<HttpResponse<void>> {
    try {
      const response = await this.api.post<HttpResponse<void>>("/products", data);
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async updateProduct(ID: string, data: ProductDto): Promise<HttpResponse<void>> {
    try {
      const response = await this.api.put<HttpResponse<void>>(
        `/products/${ID}`,
        data
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async deleteProduct(ID: string): Promise<HttpResponse<void>> {
    try {
      const response = await this.api.delete<HttpResponse<void>>(
        `/products/${ID}`
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
}

export const productRepository = new ProductRepository(api);
