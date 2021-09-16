import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import SigninCover from 'views/SigninCover';

import { userService } from 'services';

const SigninCoverPage = () => {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
        router.push('/home');
    }
}, []);

  return <SigninCover />;
};

export default SigninCoverPage;
