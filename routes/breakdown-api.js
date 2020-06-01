const express = require('express')
const router = express.Router()

router.get('/:userId/:year/:month?', (req, res) => {
  const { userId, year, month } = req.params
  res.send({ userId, year, month }) // placeholder

  // sample response:
  /*
    {
      monthly: {
        pool: [
          {
            category: '', // (home, phone, vehicle, food, discretionary)
            target: 0, // number
            spent: 0, // number
            net: this.target - this.spent, // number
          }
        ],
        totals: { target, spent, net }
      },
      annual: {}, // same as monthly
      incomeVsExpense: {
        income: {
          target,
          spent,
          net,
        },
        expenses: {}, // same as income
      }
    } 
  */
})

module.exports = router