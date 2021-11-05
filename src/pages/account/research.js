import _ from 'lodash';
import React from 'react';
import {Research} from 'views/Account';
import {withSession} from 'middlewares';

const ResearchPage = () => {
  return <Research />;
};

export const getServerSideProps = withSession(async function ({req, res}) {

  console.log('[account research] : Before get');

  const user = await req.session.get('user');

  console.log(user);
  console.log('[account research] : session info displayed ');

  if (!user) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
});

export default ResearchPage;
