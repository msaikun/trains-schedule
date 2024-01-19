import Head from 'next/head';
import React, { ReactElement } from 'react';

const HelloPage = () => {
  return (
    <>
      <Head>
        <title>Hello</title>
        <meta content="Trains Schedule" name="description" />
      </Head>
      <main>
        hello
      </main>
    </>
  );
};

HelloPage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);


export const getStaticProps = async ({ }: {}) => ({
  props: {},
});

export default HelloPage;
