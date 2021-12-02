import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Button, Box, Dialog, DialogContent} from '@mui/material';
import toast from 'react-hot-toast';
import {useTheme} from '@mui/material/styles';
import {useMainContext} from 'context/MainContext';
import InfluencerDetailLoading from './Detail/InfluencerDetailLoading';
import InfluencerDetailInstagram from './Detail/InfluencerDetailInstagram';
import InfluencerDetailYoutube from './Detail/InfluencerDetailYoutube';
import InfluencerDetailTiktok from './Detail/InfluencerDetailTiktok';
import Constants from 'constants/constants';
import {modashService} from 'services';

export default function InfluencerDetail({open, handleClose}) {
  const {selectedInfluencer} = useMainContext();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const theme = useTheme();
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
    return modashService.getProfileReport(selectedInfluencer.id, selectedInfluencer.username, selectedInfluencer.type)
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
            temp.push({code: itm.name ?? 'Other', likers: 0, followers: itm.weight})
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
            temp.push({code: itm.code ?? 'Other', malelikers: 0, femalelikers: 0, malefollowers: itm.male, femalefollowers: itm.female})
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
            temp.push({code: itm.code ?? 'Other', likers: 0, followers: itm.weight})
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
            temp.push({code: itm.name ?? 'Other', likers: 0, followers: itm.weight})
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
            temp.push({code: itm.name ?? 'Other', likers: 0, followers: itm.weight})
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
            temp.push({code: itm.name ?? 'Other', likers: 0, followers: itm.weight})
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
            temp.push({code: itm.name ?? 'Other', likers: 0, followers: itm.weight})
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

    
  }, [open, selectedInfluencer]);

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
              <Button 
                sx={{
                  position: 'fixed',
                  top: '1rem',
                  right: '2rem',
                  backgroundColor: theme.palette.primary.main,
                  color: 'white'
                }}
                variant={'outlined'}
              >
                ダウンロード
              </Button>
              {selectedInfluencer.type === Constants.snsInstagram && 
                <InfluencerDetailInstagram 
                  data={data} 
                  selectedInfluencer={selectedInfluencer}
                  enthinity={enthinity}
                  language={language}
                  ages={ages}
                  agesrange={agesrange}
                  countries={countries}
                  cities={cities}
                  brand={brand}
                  interest={interest}
                />
              }
              {selectedInfluencer.type === Constants.snsYoutube && 
                <InfluencerDetailYoutube 
                  data={data} 
                  selectedInfluencer={selectedInfluencer}
                  enthinity={enthinity}
                  language={language}
                  ages={ages}
                  agesrange={agesrange}
                  countries={countries}
                  cities={cities}
                  brand={brand}
                  interest={interest}
                />
              }
              {selectedInfluencer.type === Constants.snsTiktok && 
                <InfluencerDetailTiktok 
                  data={data} 
                  selectedInfluencer={selectedInfluencer}
                  enthinity={enthinity}
                  language={language}
                  ages={ages}
                  agesrange={agesrange}
                  countries={countries}
                  cities={cities}
                  brand={brand}
                  interest={interest}
                />
              }
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