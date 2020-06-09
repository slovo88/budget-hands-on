// TODO: implement rollbacks


const express = require('express')
const router = express.Router()

const connection = require('../config/connection')

const _applyToPools = (userId, transactions) => {
  console.log({ userId, transactions })
  // check for pool's existence
    // create if doesn't exist
  
  // apply amounts to pools and save
}

const _getSingleTransaction = (transactionId) => {
  // return promise
  return new Promise(function(resolve, reject) {
    connection.query('SELECT amount, year, month, category FROM transactions WHERE _id = ?', 
    transactionId, 
    (err, transactions) => {
        if (err) {
          return reject(err);
        }
        if (transactions.length === 0) {
          return reject('No matching transactions')
        }
        resolve(transactions[0]);
    });
  });
}

const _convertAmountsToNegative = (transactionsArray) => {
  return transactionsArray.map((transaction) => {
    transaction.amount = -transaction.amount
    return transaction
  })
}

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
      else {
        // apply to annual and monthly pools
        _applyToPools(userId, transactions)

        res.status(201).send()
      }
    }
  )
})

router.put('/:userId/', (req, res) => {
  const { userId, } = req.params
  const {
    _id,
    year,
    month,
    day,
    category,
    amount,
    description,
    note = '',
  }  = req.body.transaction

  // TODO: check for authorized access

  // TODO: will need to get old value before changing
  _getSingleTransaction(_id)
    .then((previousTransaction) => {
      connection.query(
        'UPDATE transactions SET year = ?, month = ?, day = ?, category = ?, amount = ?, description = ?, note = ? WHERE _id = ?', // placeholder until tested, then the other columns need to be added
        [year, month, day, category, amount, description, note, _id],
        (errors, results) => {
          if (errors) res.status(503).send({ errors })
          else {
            // update pools (will need to check old vs new: date, category, and amount)
            const negativePreviousTransaction = _convertAmountsToNegative([previousTransaction])

            _applyToPools(userId, [...negativePreviousTransaction, req.body.transaction])
    
            res.send({ results })
          }
        }
      )
    })
    .catch(err => console.error(err))
})

router.delete('/:userId/:transactionId', (req, res) => {
  const { userId, transactionId, } = req.params

  // TODO: check for authorized access

  _getSingleTransaction(transactionId)
    .then((deletedTransaction) => {
      connection.query(
        'DELETE FROM transactions WHERE _id = ?',
        transactionId,
        (errors, results) => {
          if (errors) res.status(503).send({ errors })
          else {
            const negativePreviousTransaction = _convertAmountsToNegative([deletedTransaction])

            _applyToPools(userId, negativePreviousTransaction)

            res.status(204).send({ results })
          }
        }
      )
    })
    .catch(err => console.error(err))
})

module.exports = router