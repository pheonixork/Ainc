import React from 'react';
import {Detail} from 'views/Campaign';
import {CampaignRepo} from 'repositories';

const DetailPage = ({data}) => {
  return <Detail cmpId={data.id} cmpName={data.name} cmpSns={data.sns} />;
};

export async function getServerSideProps(context) {
  const {id} = context.query;
  const campInfo = await CampaignRepo.getCampaignBrief(id);

  const data = {id: id, name: campInfo ? campInfo.name : '', sns: campInfo ? campInfo.sns : ''};
  return {props: {data}};
}

export default DetailPage;