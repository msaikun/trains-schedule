import axios                   from 'axios';
import { useState, useEffect } from 'react';
import { apiCaller }           from '../utils/apiCaller';
import { commonErrorHandler }  from '../utils/commonFunctions';

interface IUseQueryProps<T> {
  data    : T | null;
  loading : boolean;
}

export const useQuery = <T>(url: string): IUseQueryProps<T> => {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCaller(url);
        setData(response.data as T);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          commonErrorHandler(error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};
