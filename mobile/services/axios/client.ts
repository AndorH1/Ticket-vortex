import { publicApi, privateApi } from './api';
import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

type ClientType = 'public' | 'private';

const getClient = (type: ClientType): AxiosInstance => {
  return type === 'public' ? publicApi : privateApi;
};

export const get = async <T>(
  url: string,
  type: ClientType = 'public',
  config?: AxiosRequestConfig
): Promise<{ data: T; status: number }> => {
  const client = getClient(type);
  const { data: responseData, status }: AxiosResponse<T> = await client.get<T>(url, config);
  return { data: responseData, status };
};

export const post = async <T>(
  url: string,
  data: unknown,
  type: ClientType = 'public',
  config?: AxiosRequestConfig
): Promise<{ data: T; status: number }> => {
  const client = getClient(type);
  const { data: responseData, status }: AxiosResponse<T> = await client.post<T>(url, data, config);
  return { data: responseData, status };
};

export const put = async <T>(
  url: string,
  data: unknown,
  type: ClientType = 'public',
  config?: AxiosRequestConfig
): Promise<{ data: T; status: number }> => {
  const client = getClient(type);
  const { data: responseData, status }: AxiosResponse<T> = await client.put<T>(url, data, config);
  return { data: responseData, status };
};

export const del = async <T>(
  url: string,
  type: ClientType = 'public',
  config?: AxiosRequestConfig
): Promise<{ data: T; status: number }> => {
  const client = getClient(type);
  const { data: responseData, status }: AxiosResponse<T> = await client.delete<T>(url, config);
  return { data: responseData, status };
};
