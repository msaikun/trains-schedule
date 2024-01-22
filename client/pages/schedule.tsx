import Head                    from 'next/head';
import React, { ReactElement } from 'react';

import { Schedule } from '../src/modules/schedule/Schedule';

const SchedulePage = () => (
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

SchedulePage.getLayout = (page: ReactElement) => (
  <div>
    {page}
  </div>
);

export default SchedulePage;
