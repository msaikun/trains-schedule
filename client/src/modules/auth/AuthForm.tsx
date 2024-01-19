import { Fragment, useCallback, useMemo }     from 'react';
import { Field, Form } from 'formik';
import styled from 'styled-components';
import { Button, Grid, Link } from '@mui/material';

import { Input }          from '../../components/Input';
import { splitCamelCase } from '../../utils/commonFunctions';
import { Checkbox } from '../../components/Checkbox';

interface IAuthFormProps {
  isRegistered : boolean;
  onLinkClick  : () => void;
}

export const AuthForm = ({ isRegistered, onLinkClick }: IAuthFormProps) => {
  const formFields = useMemo(() => ([
    { name: 'userName', isHidden: isRegistered },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'isAdmin', isHidden: isRegistered, component: Checkbox }
  ]), [isRegistered]);

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
          <div>{isRegistered ? 'Need An Account?' : 'Already Have An Account?'}</div>
          <AuthForm.Link onClick={onLinkClick}>
            {isRegistered ? 'Sign Up' : 'Sign In'}
          </AuthForm.Link>
        </AuthForm.Question>

        <Button variant="contained" type="submit">{isRegistered ? 'Sign In' : 'Sign Up'}</Button>
      </AuthForm.Actions>
    </Form>
  );
}

AuthForm.Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

AuthForm.Question = styled.div`
  display: flex;
  margin: 10px 0;
  font-size: 12px;
  color: gray;
`;

AuthForm.Link = styled(Link)`
  padding-left: 5px;
`;
