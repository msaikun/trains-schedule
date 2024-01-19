import { useState }                  from 'react';
import axios, { AxiosError, Method } from 'axios';
import { apiCaller }                 from '../utils/apiCaller';

interface IUseMutationProps<T> {
  data    : T | null;
  loading : boolean;
  error   : AxiosError | null;
  mutate  : (data: T) => Promise<void>;
}

export const useMutation = <T>(url: string, method: Method = 'post'): IUseMutationProps<T> => {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<AxiosError | null>(null);

  const mutate = async (data: T) => {
    setLoading(true);

    try {
      const response = await apiCaller(url, { method, data });
      setData(response.data as T);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        setError(error as AxiosError);
        // commonErrorHandler(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate };
};
