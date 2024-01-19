import axios, { AxiosError }   from 'axios';
import { useState, useEffect } from 'react';
import { apiCaller }           from '../utils/apiCaller';

interface IUseQueryProps<T> {
  data    : T | null;
  loading : boolean;
  error   : AxiosError | null;
}

export const useQuery = <T>(url: string): IUseQueryProps<T> => {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCaller(url);
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

    fetchData();
  }, [url]);

  return { data, loading, error };
};
