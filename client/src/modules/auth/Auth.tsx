import { Formik } from 'formik';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { authValidationSchema } from '../../utils/validationSchemas';
import LoginImage from '../../assets/log-in.png';
import { AuthForm } from './AuthForm';

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
  isRegistered?: boolean;
}

export const Auth = ({ isRegistered }: IAuthProps) => {
  const router = useRouter();

  const onLinkClick = useCallback(() => {
    router.push(isRegistered ? '/signup' : '/signin');
  }, []);

  const handleSubmit = useCallback(async ({ email, password, userName, isAdmin }: IAuthFormValues) => {
    if (isRegistered) {
      // await signIn({ email, password });
    } else {
      // await signUp({ email, password, userName, isAdmin });
    }
    console.log('auth submit!', isRegistered)
  }, [isRegistered]);

  return (
    <Auth.Wrapper>
      <img src={LoginImage.src} alt="Auth image" />

      <Auth.FormWrapper>
        <Formik
          validateOnChange
          initialValues    = {initialValues}
          validationSchema = {authValidationSchema([], !!isRegistered)}
          onSubmit         = {handleSubmit}
        >
          <AuthForm isRegistered={!!isRegistered} onLinkClick={onLinkClick} />
        </Formik>
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
