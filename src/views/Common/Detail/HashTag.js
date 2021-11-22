import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
  audiencelikes: {
    marginTop: '2rem'
  },

  fontsize12: {
    fontSize: '12px'
  },

  listitem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '.25rem',
    paddingBottom: '.25rem',
    fontSize: '.9rem'
  },

  listheader: {
    color: '#757575',
    borderBottom: '.5px solid #bdbdbd'
  },

  griditem: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    paddingTop: '.25rem',
    paddingBottom: '.25rem',
    fontSize: '.9rem'
  }
});

const HashTag = ({followers, avgs, data, mentions, 
  genderlikers, genderfollowers, enthinity, language, agesrange, ages, 
  countries, cities, brand, interest}) => {

  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});
  const formatterInt = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});

  return (
    <Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>人気ハッシュタグ</span>
        </Box>
        <Box className={clsx(classes.listitem, classes.listheader)}>
          <span>Hashtag</span>
          <span>Percent</span>
        </Box>
        {_.map(data, (itm, idx) => (
          idx < 5 &&
          <Box key={idx} className={classes.listitem}>
            <span className='subtitle1'>#{itm.tag}</span>
            <span className='subtitle1'>{`${formatter.format(itm.weight * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Popular Mention</span>
        </Box>
        <Box className={clsx(classes.listitem, classes.listheader)}>
          <span>Mention</span>
          <span>Percent</span>
        </Box>
        {_.map(mentions, (itm, idx) => (
          idx < 5 &&
          <Box key={idx} className={classes.listitem}>
            <span className='subtitle1'>#{itm.tag}</span>
            <span className='subtitle1'>{`${formatter.format(itm.weight * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Gender Split</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Gender</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(genderlikers, (itm, idx) => (
          idx < 5 &&
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.weight)}/${formatter.format(itm.weight * 100)}%`}</span>
            <span className='subtitle1'>{`${formatterInt.format(followers * genderfollowers[idx].weight)}/${formatter.format(genderfollowers[idx].weight * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Ethnicity</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Groups</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(enthinity, (itm, idx) => (
          idx < 5 &&
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.likers)}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className='subtitle1'>{`${formatterInt.format(followers * itm.followers)}/${formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Language</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Language</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(language, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.likers)}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.followers === 0 ? '-' : formatterInt.format(followers * itm.followers)}/${itm.followers === 0 ? '-' : formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Age Split</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Age</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(agesrange, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.likers)}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.followers === 0 ? '-' : formatterInt.format(followers * itm.followers)}/${itm.followers === 0 ? '-' : formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Male Age Split</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Age</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(ages, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.malelikers)}/${formatter.format(itm.malelikers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.malefollowers === 0 ? '-' : formatterInt.format(followers * itm.malefollowers)}/${itm.malefollowers === 0 ? '-' : formatter.format(itm.malefollowers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Female Age Split</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Age</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(ages, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.femalelikers)}/${formatter.format(itm.femalelikers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.femalefollowers === 0 ? '-' : formatterInt.format(followers * itm.femalefollowers)}/${itm.femalefollowers === 0 ? '-' : formatter.format(itm.femalefollowers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Location By Country</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Country</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(countries, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.likers)}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.followers === 0 ? '-' : formatterInt.format(followers * itm.followers)}/${itm.followers === 0 ? '-' : formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Location By City</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>City</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(cities, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.likers)}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.followers === 0 ? '-' : formatterInt.format(followers * itm.followers)}/${itm.followers === 0 ? '-' : formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Audience Interests</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Interest</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(interest, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.likers)}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.followers === 0 ? '-' : formatterInt.format(followers * itm.followers)}/${itm.followers === 0 ? '-' : formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box sx={{fontSize: '16px', fontWeight:'600', marginBottom:'.5rem'}}>
          <span style={{fontWeight:'600'}}>Audience Brand Affinity</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Brand</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(brand, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className='subtitle1'>{itm.code}</span>
            <span className='subtitle1'>{`${formatterInt.format(avgs * itm.likers)}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className='subtitle1'>{`${itm.followers === 0 ? '-' : formatterInt.format(followers * itm.followers)}/${itm.followers === 0 ? '-' : formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HashTag;