import { useState }           from 'react';
import axios, { Method }      from 'axios';
import { apiCaller }          from '../utils/apiCaller';
import { commonErrorHandler } from '../utils/commonFunctions';

interface IUseMutationProps<T> {
  data    : T | null;
  loading : boolean;
  mutate  : (data: T) => Promise<void>;
}

export const useMutation = <T>(url: string, method: Method = 'post'): IUseMutationProps<T> => {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const mutate = async (data: T) => {
    setLoading(true);

    try {
      const response = await apiCaller(url, { method, data });
      setData(response.data as T);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        commonErrorHandler(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, mutate };
};
