import { SystemSecurityUpdateWarningSharp } from "@mui/icons-material";

const pages = {
  navigation: [
    {
      title: 'アカウントリサーチ',
      href: '/account/research',
      icon: '/images/svgs/search.svg'
    },
    {
      title: 'インサイトリスト',
      href: '/insight/list',
      icon: '/images/svgs/bookmark.svg'
    },
    {
      title: 'キャンペーンリスト',
      href: '/campaign/list',
      icon: '/images/svgs/payment.svg'
    },
    {
      title: 'キーアカウント調整',
      href: '/docs/quick-start-gatsbyjs',
      icon: '/images/svgs/record.svg'
    },
    {
      title: 'アカデミー',
      href: '/accademy',
      icon: '/images/svgs/trending-up.svg'
    }
  ],
  settings: [
    {
      title: '利用プラン',
      href: '/manager/setting',
      icon: '/images/svgs/gear.svg'
    },
    {
      title: 'よくある質問',
      href: '/manager/support',
      icon: '/images/svgs/support.svg'
    },
    {
      title: 'お問合せ',
      href: '/manager/question',
      icon: '/images/svgs/logout.svg'
    },
    {
      title: 'ログアウト',
      href: '/logout',
      icon: '/images/svgs/logout.svg'
    }
  ]
};

export default pages;
