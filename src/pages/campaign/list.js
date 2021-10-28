import _ from 'lodash';
import moment from 'moment'
import React from 'react';
import {List} from 'views/Campaign';
import {withSession} from 'middlewares';
import {CampaignRepo} from 'repositories';

const ListPage = ({campaigns}) => {
  return <List campaigns={campaigns} />;
};

export const getServerSideProps = withSession(async function ({req, res}) {
  const user = req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    }
  }

  const cmpList = await CampaignRepo.getCampaignDetailList(user.id);
  let results = _.map(cmpList, itm => {
    return {
      id: itm._id.toString(), 
      name: itm.name, 
      genre: itm.type,
      sns: itm.sns,
      amount: 0,
      mems: itm.mems,
      cdate: moment(itm.cdate).format('YYYY/M/D'),
      edate: '',
      rich: itm.rich,
      richper: 0,
      sell: itm.sell,
      roas: 0
    };
  });

  return {
    props: {campaigns: results},
  }
});

export default ListPage;
