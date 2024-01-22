import Head                    from 'next/head';
import React, { ReactElement } from 'react';
import { Auth }                from '../src/modules/auth/Auth';

const HelloPage = () => (
  <>
    <Head>
      <title>Trains Schedule</title>
      <meta content="Trains Schedule" name="description" />
    </Head>
    <main>
      <Auth />
    </main>
  </>
);

HelloPage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);

export default HelloPage;
