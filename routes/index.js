module.exports = (app) => {
  const transactionsApi = require('./transactions-api')
  const breakdownApi = require('./breakdown-api')
  const networthApi = require('./networth-api')

  app.use('/api/transactions', transactionsApi)
  app.use('/api/breakdown', breakdownApi)
  app.use('/api/networth', networthApi)
}