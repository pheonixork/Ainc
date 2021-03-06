import { SystemSecurityUpdateWarningSharp } from "@mui/icons-material";
import Lang from 'constants/lang';
const pages = {
  navigation: [
    {
      title: Lang.nav.accountresearch,
      href: '/account/research',
      icon: '/images/svgs/search.svg'
    },
    {
      title: Lang.nav.insightlist,
      href: '/insight/list',
      icon: '/images/svgs/bookmark.svg',
      isInsight: true,
    },
    {
      title: Lang.nav.campaignlist,
      href: '/campaign/list',
      icon: '/images/svgs/payment.svg',
    },
    {
      title: Lang.nav.keyaccount,
      href: '/keyaccount',
      icon: '/images/svgs/record.svg'
    },
    {
      title: Lang.nav.academy,
      href: '/academy',
      icon: '/images/svgs/trending-up.svg'
    }
  ],
  settings: [
    {
      title: Lang.nav.plan,
      href: '/setting',
      icon: '/images/svgs/gear.svg'
    },
    // {
    //   title: Lang.nav.support,
    //   href: '/manager/support',
    //   icon: '/images/svgs/support.svg'
    // },
    {
      title: Lang.nav.question,
      target: '_blank',
      href: 'https://intercom.help/astream/en/',
      icon: '/images/svgs/question.svg'
    },
    {
      title: Lang.nav.logout,
      href: '/logout',
      icon: '/images/svgs/logout.svg'
    }
  ],
  users: [
    {
      title: Lang.nav.user.create,
      href: '/users/create',
      icon: '/images/svgs/usercreate.svg'
    },
    {
      title: Lang.nav.user.list,
      href: '/users/userlist',
      icon: '/images/svgs/userlist.svg'
    },
    {
      title: Lang.nav.user.setting,
      href: '/users/plansetting',
      icon: '/images/svgs/usersettings.svg'
    },
    {
      title: Lang.nav.user.load,
      href: '/users/influencers',
      icon: '/images/svgs/search-magnifier.svg'
    },
  ]
};

export default pages;
