import axios, { AxiosRequestConfig } from 'axios';

interface IfetchRequest {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: object;
  config?: AxiosRequestConfig;
}

const apiFetch = async ({ method = 'get', url, data, config }: IfetchRequest) => {
  try {
    const axiosConfig = { ...config, withCredentials: true };
    const res = await axios[method](url, method === 'get' || method === 'delete' ? axiosConfig : data, axiosConfig);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error('No data founded');
  }
};

export default apiFetch;
