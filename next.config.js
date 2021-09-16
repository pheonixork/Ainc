module.exports = {
  serverRuntimeConfig: {
    secret: 'AINC SECRET TOKEN'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3005/api' // development api
      : 'http://localhost:3005/api' // production api
  },
  images: {
    domains: ['assets.maccarianagency.com'],
  },
}
