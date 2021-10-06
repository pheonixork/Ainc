import React, { useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import SigninCover from 'views/SigninCover';

import { userService } from 'services';

const { publicRuntimeConfig } = getConfig();

const SigninCoverPage = () => {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push(`${publicRuntimeConfig.managerUrl}`);//?id=${userService.userValue.id}`);
    }
}, []);

  return <SigninCover />;
};

export default SigninCoverPage;
