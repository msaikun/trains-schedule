import { Field, Form }        from 'formik';
import { Fragment, useMemo }  from 'react';
import styled                 from 'styled-components';
import { Button, Grid, Link } from '@mui/material';

import { Input }          from '../../components/Input';
import { Checkbox }       from '../../components/Checkbox';
import { splitCamelCase } from '../../utils/common';

interface IAuthFormProps {
  isSignInPage : boolean;
  onLinkClick  : () => void;
}

export const AuthForm = ({ isSignInPage, onLinkClick }: IAuthFormProps) => {
  const formFields = useMemo(() => ([
    { name: 'userName', isHidden: isSignInPage },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'isAdmin', isHidden: isSignInPage, component: Checkbox },
  ]), [isSignInPage]);

  return (
    <Form>
      <Grid container spacing={2} marginTop={2}>
        {formFields.map((field) => (
          <Fragment key={field.name}>
            {!field.isHidden && (
              <Grid item xs={12}>
                <Field
                  label       = {splitCamelCase(field.name)}
                  name        = {field.name}
                  type        = {field.type || 'text'}
                  placeholder = {splitCamelCase(field.name)}
                  component   = {field.component || Input}
                />
              </Grid>
            )}
          </Fragment>
        ))}
      </Grid>

      <AuthForm.Actions>
        <AuthForm.Question>
          <div>{isSignInPage ? 'Need An Account?' : 'Already Have An Account?'}</div>
          <AuthForm.Link onClick={onLinkClick}>
            {isSignInPage ? 'Sign Up' : 'Sign In'}
          </AuthForm.Link>
        </AuthForm.Question>

        <Button variant="contained" type="submit">
          {isSignInPage ? 'Sign In' : 'Sign Up'}
        </Button>
      </AuthForm.Actions>
    </Form>
  );
}

AuthForm.Actions = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : space-between;
`;

AuthForm.Question = styled.div`
  display   : flex;
  margin    : 10px 0;
  font-size : 12px;
  color     : gray;
`;

AuthForm.Link = styled(Link)`
  padding-left: 5px;
`;
