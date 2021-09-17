import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const mock = [
  [
    {
      groupTitle: 'Product',
      items: [
        "Fake Follower Check",
        "Instagram Email Finder",
        "Influencer Database",
        "Engagement Rate Calculator"
      ]
    }
  ],
  [
    {
      groupTitle: 'Company',
      items: [
        "Blog",
        "Case Studies"
      ]
    },
    {
      groupTitle: 'Features',
      items: [
        "Influencer Discovery",
        "Influencer Analytics",
        "Influencer Compaign Monitoring",
      ]
    }
  ],
  [
    {
      groupTitle: 'Support',
      items: [
        "Helpdesk",
        "Ask a Question",
        "Book a Call"
      ]
    },
    {
      groupTitle: 'Legal',
      items: [
        "Terms of Service",
      ]
    }
  ],
]

const Footer = () => {
  return (
    // <Grid container spacing={2}>
    //   {mock.map((column, i) => (
      //   <Grid item xs={3} key={i}>
      //     {column.map((group, i) => (
      //       <Box marginTop={4}>
      //         <Typography
      //           key={i}
      //           color={'#fff'}
      //           fontWeight={'600'}
      //           marginBottom={3}
      //         >
      //           {group.groupTitle}
      //         </Typography>
      //         {group.items.map((item, i) => (
      //           <Box key={i} marginTop={2} marginRight={2}>
      //             <Link
      //               component="a"
      //               href="/"
      //               variant={'subtitle2'}
      //               className="footerItem"
      //             >
      //               {item}
      //             </Link>
      //           </Box>
      //         ))}
              
      //       </Box>
      //     ))}          
      //   </Grid>
      // ))}
      // <Grid item xs={3}>
      //   <Typography
      //     color={'#fff'}
      //     fontWeight={'600'}
      //     marginTop={4}
      //   >
      //     Reviews
      //   </Typography>
      //   <Box
      //     component={LazyLoadImage}
      //     effect="blur"
      //     src={
      //       "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=161378&theme=light"
      //     }
      //     height={50}
      //     width={'auto'}
      //     marginTop={3}
      //   />
      //   <Box
      //     component={LazyLoadImage}
      //     effect="blur"
      //     src={
      //       "https://assets.capterra.com/badge/afc23a2a4755b46287d95f5b328147ae.png?v=2136636&p=195693"
      //     }
      //     height={50}
      //     width={'auto'}
      //     marginTop={3}
      //   />
      // </Grid>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        marginTop={5}
        marginLeft={2}
        marginRight={5}
      >
        <Typography
          color={'hsla(0,0%,98%,.4)'}
          fontWeight={'500'}
          variant={'subtitle2'}
        >
          © 2020 Modash OÜ. All rights reserved.
        </Typography>
        <Box
          display={'flex'}
          columnGap={2}
        >
          <Box
            component={LazyLoadImage}
            effect="blur"
            src={
              "https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e96c581048618fd168cc4_linkedin_white.svg"
            }
            height={24}
            width={24}
            opacity={'0.5'}
          />
          <Box
            component={LazyLoadImage}
            effect="blur"
            src={
              "https://uploads-ssl.webflow.com/5ef4691542433bca43839ceb/5f1e96c60ba49a0720c8e97e_twitter.svg"
            }
            height={24}
            width={24}
            opacity={'0.5'}
          />
        </Box>
      </Box>
    // </Grid>
  );
};

export default Footer;
