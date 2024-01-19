import { useState } from 'react';
import axios        from 'axios';

import { apiCaller }          from '../utils/apiCaller';
import { ISignUpUserInfo }    from '../utils/types';
import { commonErrorHandler } from '../utils/commonFunctions';

const useSignUpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (payload: ISignUpUserInfo) => {
    setIsLoading(true);

    try {
      const { data } = await apiCaller('auth/signup', { data: payload, method: 'post' });

      console.log('signUp data', data);
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

  return [signUp, isLoading] as const;
};

export { useSignUpRequest };
