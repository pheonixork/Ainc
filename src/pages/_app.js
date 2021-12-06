import _ from 'lodash';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';

import {userService} from 'services';

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
  const [isShowIntecom, setShowIntercom] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (router.asPath === '/') {
      setAuthorized(true);
      setShowIntercom(false);
      return;
    } else if (router.asPath === '/logout') {
      setShowIntercom(false);
      userService.logout();
    }

    // run auth check on initial load
    authCheck(router.asPath);

    //set authorized to false to hide page content while changing routes
    const hideContent = () => {setAuthorized(false); setShowIntercom(false);}
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
    const afterURLS = ['/account', '/insight', '/campaign', '/keyaccount', '/academy', '/setting'];
    const publicPaths = ['/signin-cover', '/password-reset-cover', '/signup-cover', '/register'];
    const path = url.split('?')[0];

    const isLogined = _.findIndex(afterURLS, itm => path.startsWith(itm) === true);
    if (isLogined === -1 || path === '/')
      setShowIntercom(false);
    else
      setShowIntercom(true);

    if (path === '/') {
      setAuthorized(true);
    } else if (!userService.userValue && 
      _.findIndex(publicPaths, itm => path.startsWith(itm) === true) === -1) {
      setAuthorized(false);
      // if (url === '/logout')
      //   router.push({pathname: '/signin-cover'});
      // else
      //   router.push({
      //     pathname: '/signin-cover',
      //     query: { returnUrl: router.asPath }
      //   });
      router.push({pathname: '/signin-cover'});
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

        {isShowIntecom && 
          <script>
            {`window.intercomSettings = {app_id: "vtgey0iz", name: "${userService.userValue.username}", email: "${userService.userValue.email}", created_at: "${userService.userValue.createdTime}"};`}
          </script>
        }
        {isShowIntecom && 
          <script>
            {`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/vtgey0iz';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
          </script>
        }
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
