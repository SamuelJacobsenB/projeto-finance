import axios from "axios";
import { config } from "@/config";
import { Response } from "@/types";

export const api = axios.create({
  baseURL: config.BACK_URL,
});

export class Controller {
  async get<T>(path: string, access_token?: string): Promise<Response<T>> {
    const response = await api.get(path, {
      headers: { authorization: access_token },
    });

    if (response.status >= 400) {
      return { error: response.statusText };
    }

    return { data: response.data as T };
  }

  async post<T>(
    path: string,
    data: object,
    access_token?: string
  ): Promise<Response<T>> {
    const response = await api.post(path, data, {
      headers: { authorization: access_token },
    });

    if (response.status >= 400) {
      return { error: response.statusText };
    }

    return { data: response.data as T };
  }

  async patch<T>(
    path: string,
    data: object,
    access_token?: string
  ): Promise<Response<T>> {
    const response = await api.patch(path, data, {
      headers: { authorization: access_token },
    });

    if (response.status >= 400) {
      return { error: response.statusText };
    }

    return { data: response.data as T };
  }

  async delete<T>(path: string, access_token?: string): Promise<Response<T>> {
    const response = await api.delete(path, {
      headers: { authorization: access_token },
    });

    if (response.status >= 400) {
      return { error: response.statusText };
    }

    return { data: response.data as T };
  }
}
