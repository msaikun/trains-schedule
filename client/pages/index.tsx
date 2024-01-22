import Head                    from 'next/head';
import { useRouter }           from 'next/router';
import React, { ReactElement } from 'react';

const HelloPage = () => {
  const router = useRouter();

  const onClick = () => router.push('signin');

  return (
    <>
      <Head>
        <title>Trains Schedule</title>
        <meta content="Trains Schedule" name="description" />
      </Head>
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ cursor: 'pointer', fontSize: '30px', fontWeight: 700 }} onClick={onClick}>
          Let's start!
        </div>
      </main>
    </>
  );
}

HelloPage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);

export default HelloPage;
