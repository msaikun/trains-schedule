import { useState } from 'react';
import axios        from 'axios';

import { apiCaller }          from '../utils/apiCaller';
import { ISignInUserInfo }    from '../utils/types';
import { commonErrorHandler } from '../utils/commonFunctions';

const useSignInRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (payload: ISignInUserInfo) => {
    setIsLoading(true);

    try {
      const { data } = await apiCaller('auth/signin', { data: payload, method: 'post' });

      console.log('signin data', data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        commonErrorHandler(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  return [signIn, isLoading] as const;
};

export { useSignInRequest };
