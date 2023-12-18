import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants/API_URL";

class ApiService {
  public api: AxiosInstance;
  constructor(config?: AxiosRequestConfig) {
    this.api = axios.create({ ...config, baseURL: BASE_URL });
  }
}

export const api = new ApiService()!.api;
