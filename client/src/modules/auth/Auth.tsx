import { Formik }               from 'formik';
import { useCallback, useMemo } from 'react';
import styled                   from 'styled-components';
import { useRouter }            from 'next/router';
import { CircularProgress }     from '@mui/material';

import { commonErrorHandler }   from '../../utils/common';
import { authValidationSchema } from '../../utils/validationSchemas';
import { useMutation }          from '../../hooks/useMutation';
import LoginImage               from '../../assets/log-in.png';
import { AuthForm }             from './AuthForm';

interface IAuthFormValues {
  userName : string;
  email    : string;
  password : string;
  isAdmin  : boolean;
}

const initialValues = {
  userName : '',
  email    : '',
  password : '',
  isAdmin  : false,
};

interface IAuthProps {
  isSignInPage?: boolean;
}

export const Auth = ({ isSignInPage }: IAuthProps) => {
  const router = useRouter();

  const { mutate: signIn, loading: isSigningIn } = useMutation('auth/signin', 'You was signed in successfully');
  const { mutate: signUp, loading: isSigningUp } = useMutation('auth/signup', 'You was signed up successfully');

  const isLoading = useMemo(() =>
    isSigningIn || isSigningUp,
    [isSigningUp, isSigningIn],
  );

  const onLinkClick = useCallback(() => {
    router.push(isSignInPage ? '/signup' : '/signin');
  }, [isSignInPage]);

  const handleSubmit = useCallback(async ({ email, password, userName, isAdmin }: IAuthFormValues) => {
    try {
      if (isSignInPage) {
        await signIn({ email, password });
      } else {
        await signUp({ email, password, userName, isAdmin });
      }
      router.push('schedule');
    } catch (error) {
      commonErrorHandler(error);
    }
  }, [isSignInPage, router]);

  return (
    <Auth.Wrapper>
      <img src={LoginImage.src} alt="Auth image" />

      <Auth.FormWrapper>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Formik
            validateOnChange
            initialValues    = {initialValues}
            validationSchema = {authValidationSchema([], !!isSignInPage)}
            onSubmit         = {handleSubmit}
          >
            <AuthForm isSignInPage={!!isSignInPage} onLinkClick={onLinkClick} />
          </Formik>
        )}
      </Auth.FormWrapper>
    </Auth.Wrapper>
  );
}

Auth.Wrapper = styled.div`
  display         : flex;
  align-items     : center;
  justify-content : center;
  height          : 100vh;
  
  img {
    height: 300px;
  }
`;

Auth.FormWrapper = styled.div`
  max-width: 400px;
`;
