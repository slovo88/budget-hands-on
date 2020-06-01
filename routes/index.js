module.exports = (app) => {
  const transactionsApi = require('./transactions-api')
  const breakdownApi = require('./breakdown-api')

  app.use('/api/transactions', transactionsApi)
  app.use('/api/breakdown', breakdownApi)
}