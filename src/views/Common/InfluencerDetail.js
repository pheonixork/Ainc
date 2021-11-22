import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Box, Dialog, DialogContent} from '@mui/material';
import Header from './Detail/Header';
import PopularPosts from './Detail/PopularPosts';
import AudienceData from './Detail/AudienceData';
import AudienceLikes from './Detail/AudienceLikes';
import Notable from './Detail/Notable';
import HashTag from './Detail/HashTag';
import SponsorPosts from './Detail/SponsorPosts';
import {modashService} from 'services';
import toast from 'react-hot-toast';
import {useMainContext} from 'context/MainContext';
import InfluencerDetailLoading from './Detail/InfluencerDetailLoading';

export default function InfluencerDetail({open, handleClose}) {
  const {influSelectedId, profileType} = useMainContext();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [enthinity, setEnthinity] = useState([]);
  const [language, setLanguage] = useState([]);
  const [ages, setAges] = useState([]);
  const [agesrange, setAgesRange] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [brand, setBrand] = useState([]);
  const [interest, setInterest] = useState([]);

  useEffect(() => {
    if (!open)
      return;

    setLoading(true);
    return modashService.getProfileReport(influSelectedId, profileType)
      .then((response) => {
        if (response.status !== 'ok' || response.data.error !== false) {
          setLoading(false);
          setData(null);
          return;
        }

        const data = response.data;
        setData(data.profile);
        setLoading(false);


        let temp = [];
        let matchData = null;
        _.map(data.profile.audience.ethnicities, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.ethnicities, audItm => {
              if (audItm.code === itm.code)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.name, likers: itm.weight, followers: 0})
          } else {
            temp.push({code: itm.name, likers: itm.weight, followers: matchData.weight})
          }
        }); 

        setEnthinity(temp);


        temp = [];
        _.map(data.profile.audience.languages, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.languages, audItm => {
              if (audItm.code === itm.code)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: 0})
          } else {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: matchData.weight})
          }
        }); 

        setLanguage(temp);

        temp = [];
        _.map(data.profile.audience.gendersPerAge, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.gendersPerAge, audItm => {
              if (audItm.code === itm.code)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.code ?? 'Other', malelikers: itm.male, femalelikers: itm.female, malefollowers: 0, femalefollowers: 0})
          } else {
            temp.push({code: itm.code ?? 'Other', malelikers: itm.male, femalelikers: itm.female, malefollowers: matchData.male, femalefollowers: matchData.female})
          }
        }); 
        setAges(temp);

        temp = [];
        _.map(data.profile.audience.ages, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.ages, audItm => {
              if (audItm.code === itm.code)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.code ?? 'Other', likers: itm.weight, followers: 0})
          } else {
            temp.push({code: itm.code ?? 'Other', likers: itm.weight, followers: matchData.weight})
          }
        }); 
        setAgesRange(temp);

        temp = [];
        _.map(data.profile.audience.geoCountries, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.geoCountries, audItm => {
              if (audItm.code === itm.code)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: 0})
          } else {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: matchData.weight})
          }
        }); 
        setCountries(temp);

        temp = [];
        _.map(data.profile.audience.geoCities, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.geoCities, audItm => {
              if (audItm.name === itm.name)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: 0})
          } else {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: matchData.weight})
          }
        }); 
        setCities(temp);

        temp = [];
        _.map(data.profile.audience.interests, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.interests, audItm => {
              if (audItm.name === itm.name)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: 0})
          } else {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: matchData.weight})
          }
        }); 
        setInterest(temp);

        temp = [];
        _.map(data.profile.audience.brandAffinity, itm => {
          if (data.profile.audienceLikers) {
            matchData = _.find(data.profile.audienceLikers.brandAffinity, audItm => {
              if (audItm.name === itm.name)
                return true;
            });
          } else {
            matchData = undefined;
          }

          if (matchData === undefined) {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: 0})
          } else {
            temp.push({code: itm.name ?? 'Other', likers: itm.weight, followers: matchData.weight})
          }
        }); 
        setBrand(temp);

        
      }).catch(msg => {
        setLoading(false);
        setData(null);
        toast.error(msg);
      });

    
  }, [open, influSelectedId]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={'body'}
      sx={{ '& .MuiDialog-paper': { 
        maxWidth: {xs: '100%', md:'720px'},
        background: 'linear-gradient(157.53deg,#edf7fe 11.25%,#fff 50.77%,#edf7fe 92.83%)'
      }}}
    >
      <DialogContent>
        {isLoading ? 
          <InfluencerDetailLoading /> : 
          data !== null && 
            <Box>
              <Header data={data.profile} stats={data.stats} type={profileType} />
              <PopularPosts 
                data={data.popularPosts ?? []} 
                statHistory={data.statHistory ?? []} 
                recentPosts={data.recentPosts ?? []} 
                hashtags={data.hashtags ?? []}
                brandAffinity={data.brandAffinity ?? []}
                interests={data.interests ?? []}
              />
              <AudienceData 
                data={data.audience}
              />
              {data.audienceLikers && 
                <AudienceLikes data={data.audienceLikers} />
              }
              <Notable 
                followers={data.audience ? data.audience.notableUsers : []}
                likers={data.audienceLikers ? data.audienceLikers.notableUsers : []}
              />
              <HashTag 
                followers={data.profile.followers}
                avgs={data.stats ? data.stats.avgLikes.value : 0}
                data={data.hashtags} 
                mentions={data.mentions} 
                genderlikers={data.audienceLikers ? data.audienceLikers.genders : []}
                genderfollowers={data.audience ? data.audience.genders : []}
                enthinity={enthinity}
                language={language}
                agesrange={agesrange}
                ages={ages}
                countries={countries}
                cities={cities}
                brand={brand}
                interest={interest}
              />
              <SponsorPosts data={data.sponsoredPosts} />
            </Box>
        }
      </DialogContent>
    </Dialog>
  );
};

InfluencerDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};