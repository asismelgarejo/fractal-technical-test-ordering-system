import { AxiosInstance } from "axios";
import { api } from "../api";
import { HttpResponse } from "../models";
import OrderDto from "../models/Order";

class OrderRepository {
  constructor(private api: AxiosInstance) {}
  async getOrders(): Promise<HttpResponse<OrderDto[]>> {
    try {
      const response = await this.api.get<HttpResponse<OrderDto[]>>("/orders");
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async getOrder(ID: string): Promise<HttpResponse<OrderDto>> {
    try {
      const response = await this.api.get<HttpResponse<OrderDto>>(
        `/orders/${ID}`
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async createOrder(data: OrderDto): Promise<HttpResponse<void>> {
    try {
      const response = await this.api.post<HttpResponse<void>>("/orders", data);
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async updateOrder(ID: string, data: OrderDto): Promise<HttpResponse<void>> {
    try {
      const response = await this.api.put<HttpResponse<void>>(
        `/orders/${ID}`,
        data
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
  async deleteOrder(ID: string): Promise<HttpResponse<void>> {
    try {
      const response = await this.api.delete<HttpResponse<void>>(
        `/orders/${ID}`
      );
      return response.data;
    } catch (e: any) {
      throw new Error(e?.message ?? "");
    }
  }
}

export const orderRepository = new OrderRepository(api);
