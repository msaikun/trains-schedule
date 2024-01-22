import axios                   from 'axios';
import { useState, useEffect } from 'react';
import { apiCaller }           from '../utils/apiCaller';
import { commonErrorHandler }  from '../utils/common';

interface IUseQueryProps<T> {
  data    : T | null;
  loading : boolean;
  refetch : (data: any) => void;
}

export const useQuery = <T>(url: string, initialParams?: { data?: unknown }): IUseQueryProps<T> => {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params: unknown) => {
    try {
      setLoading(true);
      const response = await apiCaller(url, params as any);
      setData(response.data as T);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        commonErrorHandler(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(initialParams);
  }, [url]);

  const refetch = (newParams: unknown) => {
    fetchData({ data: newParams });
  };

  return { data, loading, refetch };
};
