import _ from 'lodash';
import clsx from 'clsx';
import NextLink from 'next/link'
import React, {useMemo} from 'react';
import {Typography, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import styles from './styles';
export default function QABrief() {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  return (
    <Box sx={{width: '80%', margin: '10px auto'}} data-aos={'fade-up'}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography className={clsx(classes.qaTitle, classes.mb40)}>Frequently asked questions</Typography>
      </Box>
      <Box className={'qaSubWrapper'}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>How do I decide which plan is best for me and my team?</Typography>
        <Typography className={classes.mb20}>Modash is great for companies ranging from a solo freelancer to a 10,000 employee multinational company and everything in between. With that in mind, how do you choose which plan is best for you?</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Essentials plan:</span> This plan is best for companies that have already started with influencer marketing and plan to do more regular projects or ongoing campaigns and want to get a bit more serious about working with influencers.</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Performance plan:</span> This plan is best for teams sharing an account in multiple countries, agencies working with or verifying influencers, brands that are heavily focused on influencers or big organisations with global campaigns.</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Advanced Plan:</span> This plan is best for teams who have scaled influencer marketing and are using Modash to optimize existing processes.</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Enterprise:</span> If you need more, we've got your back. Modash works with several of the top influencer platforms, numerous multinational agencies and more.</Typography>
        <Typography className={classes.mb40}>Learn more how to choose the plan from <NextLink href="#">here.</NextLink></Typography>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>What is a search?</Typography>
        <Typography className={classes.mb40}>Modash is a search engine for finding influencers. To use it, you input some information about your target audience and click the “Find influencers” button. When you click the “Find influencers” button, we show you as many influencers as possible that speak to your target audience. When you click the find influencers button, count 1 search towards your monthly searches.</Typography>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>What is a profile summary?</Typography>
        <Typography className={classes.mb20}>You can view an influencer’s profile summary by clicking on a result from search. When click a search result to view these stats, it is counted as 1 profile summary towards your monthly total.</Typography>
        <Typography className={classes.mb20}>Profile summary includes details such as:</Typography>
        <Box className={classes.mb40}>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Average likes
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Top 3 audience locations by country
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Followers
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Top 3 audience locations by city
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Engagement rate
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Audience gender
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Most recent posts
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Audience age
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Fake followers
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              And more!
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>What is a full report?</Typography>
        <Typography className={classes.mb20}>Similar to profile summary, full report shows audience and influencer data. However, full report shows several pages of more granular information. When you click “View full report” inside of audience summary, we count this as one full report towards your monthly total.</Typography>
        <Typography className={classes.mb20}>Full report includes details such as:</Typography>
        <Box className={classes.mb40}>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Growth rate
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              All audience locations
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Influencer followers
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              All audience interests
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Engagements over time
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              All audience brand affinity
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              All data included in summary
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              And more!
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              All audience languages
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>What is a profile export?</Typography>
        <Typography className={classes.mb20}>If you choose, you can export influencer and audience details to CSV. CSV exports also contain contact details for influencers. If you are not allowed to process contact details you can opt out of this feature.</Typography>
        <Typography className={classes.mb20}>Exports are great for optimizing influencer campaigns, importing emails to your favourite outreach tools or sharing info with your team and clients.</Typography>
        <Typography className={classes.mb20}>Exports contain details like:</Typography>
        <Box className={classes.mb40}>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Influencer country
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Top 3 audience city
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Username
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Content vertical / audience interests
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
               Influencer contact details
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Engagement rate
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              Followers
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
               And more!
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}