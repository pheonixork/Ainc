module.exports = {
  serverRuntimeConfig: {
    secret: 'AINC SECRET TOKEN'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'http://Ain.vercel.app:3000/api' // production api
  },
  images: {
    domains: ['assets.maccarianagency.com'],
  },
}
