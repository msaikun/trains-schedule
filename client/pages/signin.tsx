import Head                    from 'next/head';
import React, { ReactElement } from 'react';

import { Auth } from '../src/modules/auth/Auth';

const SignInPage = () => (
  <>
    <Head>
      <title>Trains Schedule | Sign In</title>
      <meta content="Trains Schedule" name="description" />
    </Head>
    <main>
      <Auth isSignInPage />
    </main>
  </>
);

SignInPage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);

export default SignInPage;
