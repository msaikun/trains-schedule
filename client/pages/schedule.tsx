import Head from 'next/head';
import React, { ReactElement } from 'react';

import { Schedule } from '../src/modules/schedule/Schedule';

const SchedulePage = () => {
  return (
    <>
      <Head>
        <title>Schedule</title>
        <meta content="Trains Schedule" name="description" />
      </Head>
      <main>
        <Schedule />
      </main>
    </>
  );
};

SchedulePage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);


export const getStaticProps = async ({ }: {}) => ({
  props: {},
});

export default SchedulePage;
