import Lang from './lang';

const keywords = {
  roleInfo: {
    admin: "admin",
    user: "user"
  },
  blurImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0tdWLBAACagEDaHUA1gAAAABJRU5ErkJggg==',
  snsInstagram: 'instagram',
  snsYoutube: 'youtube',
  snsTiktok: 'tiktok',
  snsTypes: {'instagram': Lang.caption.instagram, 'youtube': Lang.caption.youtube, 'tiktok': Lang.caption.tiktok},
  campaignTypes: ['ファッション', 'ビューティー', 'グルメ', 'インテリア', '電化製品', '不動産', '動物', '旅行', '日用品', 'エンタメ', '旅行・ホテル', 'ゲーム', 'キッズ', '乗り物', 'アート(音楽・映画)', 'ビジネス', 'スポーツ・アクティブ', 'その他'],
  errors: {
    badrequest: 400,
    unauthorized: 401,
    forbidden: 403,
    error: 500
  }
};

export const evaluateValue = (val) => {
  if (val > 1000 * 1000 * 1000)
    return (val / (1000 * 1000 * 1000)).toFixed(1) + 'B'
  else if (val > 1000 * 1000)
    return (val / (1000 * 1000)).toFixed(1) + 'M'
  else if (val > 1000)
    return (val / 1000).toFixed(1) + 'K'

  return val
}

export default keywords;