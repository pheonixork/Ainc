import { SystemSecurityUpdateWarningSharp } from "@mui/icons-material";
import Keyword from 'constants/lang';
const pages = {
  navigation: [
    {
      title: Keyword.nav.accountresearch,
      href: '/account/research',
      icon: '/images/svgs/search.svg'
    },
    {
      title: Keyword.nav.insightlist,
      href: '/insight/list',
      icon: '/images/svgs/bookmark.svg'
    },
    {
      title: Keyword.nav.campaignlist,
      href: '/campaign/list',
      icon: '/images/svgs/payment.svg'
    },
    {
      title: Keyword.nav.keyaccount,
      href: '/docs/quick-start-gatsbyjs',
      icon: '/images/svgs/record.svg'
    },
    {
      title: Keyword.nav.accademy,
      href: '/accademy',
      icon: '/images/svgs/trending-up.svg'
    }
  ],
  settings: [
    {
      title: Keyword.nav.plan,
      href: '/manager/setting',
      icon: '/images/svgs/gear.svg'
    },
    {
      title: Keyword.nav.support,
      href: '/manager/support',
      icon: '/images/svgs/support.svg'
    },
    {
      title: Keyword.nav.question,
      href: '/manager/question',
      icon: '/images/svgs/question.svg'
    },
    {
      title: Keyword.nav.logout,
      href: '/logout',
      icon: '/images/svgs/logout.svg'
    }
  ]
};

export default pages;
