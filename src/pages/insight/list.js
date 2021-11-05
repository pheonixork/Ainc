import _ from 'lodash';
import React from 'react';
import {SearchList} from 'views/Insight';
import {InfluencerRepo} from 'repositories';
import {withSession} from 'middlewares';

const ListPage = ({accounts}) => {
  return <SearchList accounts={accounts} />;
};

export const getServerSideProps = withSession(async function ({req, res}) {

  console.log('[Insight research] : Before get');

  const user = await req.session.get('user');

  console.log(user);
  console.log('[Insight research] : session info displayed ');

  if (!user) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    }
  }

  const lists = await InfluencerRepo.getInfluencers(user.id);

  return {
    props: {
      accounts: lists,
    },
  }
});

export default ListPage;
