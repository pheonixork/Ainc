import _ from 'lodash';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { userService } from 'services';

import Page from '../components/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import 'scss/react-images.scss';
import 'scss/slick-slider.scss';
import 'scss/common.scss'
import 'scss/manager.scss'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    //console.log(router.asPath);
    if (router.asPath === '/') {
      setAuthorized(true);
      return;
    } else if (router.asPath === '/logout') {
      userService.logout();
    }

    // run auth check on initial load
    authCheck(router.asPath);

    //set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    //run auth check on route change
    router.events.on('routeChangeComplete', authCheck);

    //run when error occured
    //router.events.on('routeChangeError', errorProc);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
      //router.events.off('routeChangeError', errorProc);
    }
  }, []);

  // const errorProc = (err, url) => {
  //   router.push({pathname: '/signin-cover'});
  // }

  const authCheck = (url) => {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/signin-cover', '/password-reset-cover', '/signup-cover', '/register', '/blog', '/features', '/pricing'];
    const path = url.split('?')[0];

    if (!userService.userValue && 
      _.findIndex(publicPaths, itm => path.startsWith(itm) === true) === -1) {
      setAuthorized(false);
      if (url === '/logout')
        router.push({pathname: '/signin-cover'});
      else
        router.push({
          pathname: '/signin-cover',
          query: { returnUrl: router.asPath }
        });
    } else {
      setAuthorized(true);
    }
  }
    
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Ainc | Find, analyze and monitor influencers like the best</title>
      </Head>
      <Page>
        {authorized && <Component {...pageProps} />}
      </Page>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
