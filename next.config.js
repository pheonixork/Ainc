module.exports = {
  serverRuntimeConfig: {
    secret: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8',
    cookie: 'AINC SESSION INFO COOKIE',
  },
  publicRuntimeConfig: {
    managerUrl: '/account/research',
    adminUrl: '/users/create',
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'http://localhost:3000/api' // production api
  },
  images: {
    domains: ['assets.maccarianagency.com', 'imgigp.modash.io'],
  },
}
