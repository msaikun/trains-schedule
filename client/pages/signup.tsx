import Head                    from 'next/head';
import React, { ReactElement } from 'react';

import { Auth } from '../src/modules/auth/Auth';

const SignUpPage = () => (
  <>
    <Head>
      <title>Trains Schedule | Sign Up</title>
      <meta content="Trains Schedule" name="description" />
    </Head>
    <main>
      <Auth />
    </main>
  </>
);

SignUpPage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);

export default SignUpPage;
