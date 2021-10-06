import React from 'react';
import campaignList from 'mockup/campain_list';
import { Detail } from 'views/Campaign';

const DetailPage = ({ campaignData }) => {
  return <Detail campaignData={campaignData}/>;
};

export async function getStaticPaths() {
  const paths = [];
  Array.from({
      length: campaignList.length
    }, (_, i) => i + 1
  ).map(i => {
    paths.push({
      params : {
        id : i.toString()
      }
    })
  });

  return {
    paths,
    fallback: false
  }
};

export async function getStaticProps({ params }) {
  return {
    props: {
      campaignData : campaignList[params.id - 1]
    }
  }
}

export default DetailPage;