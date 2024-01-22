import { CircularProgress } from '@mui/material';
import styled               from 'styled-components';

export const Loader = () => (
  <Loader.Wrapper>
    <CircularProgress />
  </Loader.Wrapper>
);

Loader.Wrapper = styled.div`
  position  : fixed;
  top       : 50%;
  left      : 50%;
  transform : translate(-50%, -50%);
  z-index   : 1000;
`;