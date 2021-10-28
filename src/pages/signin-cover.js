import React, { useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import SigninCover from 'views/SigninCover';

import {userService} from 'services';
import Constants from 'constants/constants';
const {publicRuntimeConfig} = getConfig();

const SigninCoverPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     if (!userService.userValue)
//       return;
    
//     if (userService.userValue.role === Constants.roleInfo.admin) 
//       router.push(`${publicRuntimeConfig.adminUrl}`);//?id=${userService.userValue.id}`);
//     else 
//       router.push(`${publicRuntimeConfig.managerUrl}`);//?id=${userService.userValue.id}`);
// }, []);

  return <SigninCover />;
};

export default SigninCoverPage;
