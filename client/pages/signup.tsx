import Head                    from 'next/head';
import React, { ReactElement } from 'react';

import { Auth } from '../src/modules/auth/Auth';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta content="Trains Schedule" name="description" />
      </Head>
      <main>
        <Auth />
      </main>
    </>
  );
};

SignUpPage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);


// export const getStaticProps = async ({ }: {}) => ({
//   props: {},
// });

export default SignUpPage;
