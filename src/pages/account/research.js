import _ from 'lodash';
import React from 'react';
import {Research} from 'views/Account';
import {withSession} from 'middlewares';
import {CampaignRepo} from 'repositories';

const ResearchPage = ({campaigns}) => {
  return <Research campaigns={campaigns} />;
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

  const cmpList = await CampaignRepo.getCampaignList(user.id);
  let results = _.map(cmpList, itm => {
    return {id: itm._id.toString(), name: itm.name, sns: itm.sns, type: itm.type, mems: itm.mems};
  });

  return {
    props: {
      campaigns: results
    },
  }
});

export default ResearchPage;
