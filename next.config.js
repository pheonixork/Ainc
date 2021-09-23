module.exports = {
  serverRuntimeConfig: {
    secret: 'AINC SECRET TOKEN'
  },
  publicRuntimeConfig: {
    managerUrl: '/account/research',
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'https://ainc.vercel.app/api' // production api
  },
  images: {
    domains: ['assets.maccarianagency.com', 'imgigp.modash.io'],
  },
  env: {
    mongodb: {
      srv: "localhost",
      port: "27017",
      db: "ainc_db",
      usr: "",
      pwd: ""
    }
  }
}
