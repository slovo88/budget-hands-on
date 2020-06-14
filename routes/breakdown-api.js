// TODO: implement rollbacks


const express = require('express')
const router = express.Router()

const connection = require('../config/connection')

router.get('/:userId/:year', (req, res) => {
  const { userId, year, } = req.params

  // TODO: check for authorized access

  connection.query(
    `SELECT * FROM pools WHERE userId = ? AND year = ?`, 
    [ userId, year ],
    (errors, pools) => {
      if (errors) res.send({ errors })
      else { 

        const response = {
          monthly: {
            pool: []

          },
          annual: {
            pool: []
          },
          income: {
            pool: []
          }
        }

        pools.forEach(({ pool, category, target }) => {
          response[pool].pool.push({ category, target })
        })
        
        res.send({ response }) 
      }
    }
  )

  // sample response:
  /*
    {
      monthly: {
        pool: [
          {
            category: '', // (home, phone, vehicle, food, discretionary)
            target: 0, // number
          }
        ],
        totals: { target, spent, net }
      },
      annual: {}, // same as monthly
      income: {}, // same as monthly
    } 
  */
})

module.exports = router