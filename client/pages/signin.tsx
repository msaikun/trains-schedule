import Head                    from 'next/head';
import React, { ReactElement } from 'react';

import { Auth } from '../src/modules/auth/Auth';

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta content="Trains Schedule" name="description" />
      </Head>
      <main>
        <Auth isRegistered />
      </main>
    </>
  );
};

SignInPage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);


export const getStaticProps = async ({}: {}) => ({
  props: {},
});

export default SignInPage;
