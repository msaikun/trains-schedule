import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

const BASE_URL = 'http://localhost:5002';

export type TApiCaller = <R = unknown, T = unknown> (
  endpoint: string,
  request?: { data?: T, method?: Method },
) => Promise<({ data: R })>;

export const apiCaller: TApiCaller = (endpoint, request = {}) => {
  const { data, method = 'get' } = request;

  const headers = {} as AxiosRequestHeaders;

  headers['Content-Type'] = 'application/json';
  headers['Access-Control-Allow-Credentials'] = 'true';

  const requestData: AxiosRequestConfig = { headers, method, withCredentials: true };

  if (method === 'get') {
    requestData.params = data;
  } else if (data) {
    requestData.data = data;
  }

  return axios({ url: `${BASE_URL}/${endpoint}`, ...requestData })
    .then((res) => ({ data: res.data }));
};
