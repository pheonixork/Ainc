/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FltAutocomplete from './FltAutocomplete';
import FltSingleSelect from './FltSingleSelect';
import FltMultiSelect from './FltMultiSelect';
import FltTextField from './FltTextField';
import FltRangeSelect from './FltRangeSelect';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const languages = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const followers = [1000, 5000, 10000, 15000, 25000, 50000, 100000, 250000, 500000, 1000000];

const ages = ['13-17', '18-24', '25-34', '35-44', '45+'];

const engages = ['>1%', '>2% (average)', '>3%', '>4%', '>5%', '>6%', '>7%', '>8%', '>9%', '>10%'];

export default function Instagram({...rest}) {
  const [clearFlag, setClearFlag] = useState(false);

  const clearFilterClicked = (e) => {
    setClearFlag(!clearFlag);
  }

  return (
    <Box {...rest}>
      <Box className='search-box' >
        <Typography
          variant="body1"
        >
          Influencer filters • <span style={{fontSize:'0.8rem'}}>Try starting with number of followers and audience filters narrowing your search</span>
        </Typography>

        <Box 
          sx={{display: 'flex', flexShrink: 0, flexWrap: 'wrap'}}>
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'250px !important'}}>
            <FltAutocomplete 
              clearFlag={clearFlag}
              tip='Influencer location' 
              phstr='Where are your influencers?' 
              icon={false} 
              values={top100Films} />
          </Box>
          <Box>
            <FltRangeSelect
              clearFlag={clearFlag}
              tip='Subscribers'
              icon={false}
              fromValues={followers}
              fromStyle={{width:'8rem'}}
              toValues={[...followers, '1000000+']}
              toStyle={{width:'8rem', marginLeft:'10px'}}
              />
          </Box>
          <Box>
            <FltRangeSelect
              clearFlag={clearFlag}
              tip='Average Views'
              icon={false}
              fromValues={followers}
              fromStyle={{width:'8rem'}}
              toValues={[...followers, '1000000+']}
              toStyle={{width:'8rem', marginLeft:'10px'}}
              />
          </Box>
          <Box>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip='Gender' 
              icon={false} 
              values={['Male', 'Female']}
              style={{width:'8rem'}}/>
          </Box>
          <Box sx={{minWidth:'150px', flex:1}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip='Language' 
              icon={false} 
              values={languages}
              style={{width: '100% !important'}}/>
          </Box>
          <Box >
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip='Last post' 
              icon={false} 
              values={['30 days', '3 Months', '6 Months']}
              style={{width:'12rem'}}/>
          </Box>
          <Box>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip='Engagement rate' 
              icon={true} 
              values={engages}
              style={{width:'12rem'}}/>
          </Box>
          <Box>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip='Contract information' 
              icon={false} 
              values={['Email available']}
              style={{width:'13rem'}}/>
          </Box>
          <Box sx={{flex:1, minWidth:'220px !important'}}>
            <FltTextField clearFlag={clearFlag} tip='Bio' icon={true} phstr='Any' />
          </Box>
          <Box sx={{width:'300px'}}>
            <FltTextField clearFlag={clearFlag} tip='Keyword Topics' icon={true} phstr='Any' />
          </Box>
        </Box>
      </Box>
      <Box className='search-box' >
        <Typography
          variant="body1"
        >
          Audience filters • <span style={{fontSize:'0.8rem'}}>For best results, start with location, gender and age before adding more filters</span>
        </Typography>

        <Box 
          sx={{display: 'flex', flexShrink: 0, flexWrap: 'wrap'}}>
          <Box sx={{flex: 1, flexGrow: 1, alignItems: 'stretch', minWidth:'250px !important'}}>
            <FltAutocomplete 
              clearFlag={clearFlag}
              tip='Audience location' 
              phstr='Where are your audience?' 
              icon={true} 
              values={top100Films} />
          </Box>
          <Box>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip='Gender' 
              icon={true} 
              values={['Male', 'Female']}
              style={{width:'8rem'}}/>
          </Box>
          <Box>
            <FltMultiSelect 
              clearFlag={clearFlag}
              tip='Age' 
              icon={true}
              values={ages}
              sx={{width:'8rem'}}
            />
          </Box>
          <Box sx={{minWidth:'150px', flex:1}}>
            <FltSingleSelect 
              clearFlag={clearFlag}
              tip='Language' 
              icon={false} 
              values={languages}
              style={{width: '100% !important'}}/>
          </Box>
        </Box>
      </Box>
      <Box className='search-box' >
        <Typography
          variant="body1"
        >
          Search by Username • <span style={{fontSize:'0.8rem'}}>Successful users often use this to check specific accounts</span>
        </Typography>
        <Box sx={{marginTop:'10px'}}>
          <TextField 
            size="small"
            fullWidth
            placeholder="Youtube profile URL, user or channel ID or channel name"
            inputProps={{style:{fontSize:'14px'}}}
          />
        </Box>
        <Box sx={{display:'flex', width:'100%', justifyContent:'flex-end', marginTop: '15px'}}>
          <Button
            variant={'outlined'}
            onClick={clearFilterClicked}
          >
            Clear all filters
          </Button>
          <Button
            className="active"
            variant={'outlined'}
            sx={{marginLeft:'15px'}}
          >
            Find influencers
          </Button>
        </Box>
      </Box>
    </Box>
  );
};