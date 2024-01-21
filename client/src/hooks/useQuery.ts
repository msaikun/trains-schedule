import axios, { Method }                   from 'axios';
import { useState, useEffect } from 'react';
import { apiCaller }           from '../utils/apiCaller';
import { commonErrorHandler }  from '../utils/commonFunctions';

interface IUseQueryProps<T> {
  data    : T | null;
  loading : boolean;
  refetch : () => void;
}

export const useQuery = <T>(url: string, params?: { data?: unknown }): IUseQueryProps<T> => {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('qqwerty', params);

  const fetchData = async () => {
    try {
      const response = await apiCaller(url, params);
      setData(response.data as T);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        commonErrorHandler(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('refetch', url)
  }, [url]);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, refetch };
};
