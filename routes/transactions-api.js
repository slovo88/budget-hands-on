const express = require('express')
const router = express.Router()

const connection = require('../config/connection')


router.get('/:userId/:year/:month?', (req, res) => {
  const { 
    userId, 
    year, 
    month, 
  } = req.params

  // TODO: check for authorized access

  connection.query(
    `SELECT * FROM transactions WHERE userId = ? AND year = ? ${month ? 'AND month = ?' : ''} ORDER BY year DESC, month DESC, day DESC, _id DESC`, 
    [ userId, year, month ],
    (errors, transactions) => {
      if (errors) res.send({ errors })
      else res.send({ transactions })
    }
  )
})

router.post('/:userId/', (req, res) => {
  const { userId, } = req.params
  const { transactions } = req.body

  // TODO: check for authorized access

  connection.query(
    'INSERT INTO transactions (userId, year, month, day, description, category, amount, note) VALUES ?',
    [transactions.map((transaction) => {
      const transactionWithUserId = Object.assign({ userId }, transaction)
      return Object.values(transactionWithUserId)
    })],
    (errors) => {
      if (errors) res.status(503).send({ errors })
      else res.status(201).send()
    }
  )
})

router.put('/:userId/', (req, res) => {
  const { userId, } = req.params
  const {
    _id,
    date,
    category,
    amount,
    description,
    note,
    field,
    value,
  }  = req.body.transaction

  // TODO: check for authorized access

  console.log({field, value, _id})

  connection.query(
    'UPDATE transactions SET ?? = ? WHERE _id = ?', // placeholder until tested, then the other columns need to be added
    [field, value, _id],
    (errors, results) => {
      if (errors) res.status(503).send({ errors })
      else res.send({ results })
    }
  )

})

router.delete('/:userId/:transactionId', (req, res) => {
  const { userId, transactionId, } = req.params

  // TODO: check for authorized access

  connection.query(
    'DELETE FROM transactions WHERE _id = ?',
    transactionId,
    (errors, results) => {
      if (errors) res.status(503).send({ errors })
      else res.status(204).send({ results })
    }
  )
})

module.exports = router