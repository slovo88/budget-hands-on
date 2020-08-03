// TODO: implement rollbacks


const express = require('express')
const router = express.Router()

const connection = require('../config/connection')


function groupByCaptureDate(arr) {
  return arr.reduce(function(acc, item) {
    const date = `${item.year}-${item.month}-${item.day}`

    let dateObj = acc.find(accItem => accItem.dateCaptured === date)
    if (!dateObj) { 
      acc.push({
        dateCaptured: date,
        networthCollection: [item]
      })
    } else {
      dateObj.networthCollection.push(item)
    }

    return acc
  }, [])
}

function calculateTotals(arr) {
  const totals = {}
        
  // total cash items
  totals.cashAccounts = arr.reduce((acc, { isRetirement, isInvestment, isHome, isAsset, accountBalance, }) => {
    if (!isRetirement && !isInvestment && !isHome) {
      const posOrNegMultiplier = isAsset ? 1 : -1
      const accountValue = accountBalance * posOrNegMultiplier

      return parseFloat((acc + accountValue).toFixed(2))
    }

    return acc

  }, 0)
  
  // total investment items
  totals.nonRetirementInvestments = arr.reduce((acc, { isRetirement, isInvestment, isAsset, accountBalance, }) => {
    if (!isRetirement && isInvestment) {
      const posOrNegMultiplier = isAsset ? 1 : -1
      const accountValue = accountBalance * posOrNegMultiplier

      return parseFloat((acc + accountValue).toFixed(2))
    }

    return acc

  }, 0)
  
  // total retirement items
  totals.retirementAccounts = arr.reduce((acc, { isRetirement, isAsset, accountBalance, }) => {
    if (isRetirement) {
      const posOrNegMultiplier = isAsset ? 1 : -1
      const accountValue = accountBalance * posOrNegMultiplier

      return parseFloat((acc + accountValue).toFixed(2))
    }

    return acc

  }, 0)
  
  // total mortgage items
  totals.mortgageAccounts = arr.reduce((acc, { isHome, isAsset, accountBalance, }) => {
    if (isHome) {
      const posOrNegMultiplier = isAsset ? 1 : -1
      const accountValue = accountBalance * posOrNegMultiplier

      return parseFloat((acc + accountValue).toFixed(2))
    }

    return acc

  }, 0)
  
  // total assets
  totals.assets = arr.reduce((acc, { isAsset, accountBalance, }) => {
    if (isAsset) {
      return parseFloat((acc + accountBalance).toFixed(2))
    }

    return acc

  }, 0)
  
  // total liabilities
  totals.liabilities = arr.reduce((acc, { isAsset, accountBalance, }) => {
    if (!isAsset) {
      return parseFloat((acc + accountBalance).toFixed(2))
    }

    return acc

  }, 0)
  
  // total net worth
  totals.netWorthWithMortgages = parseFloat((totals.assets - totals.liabilities).toFixed(2))
  
  // total net worth without mortgage items
  totals.netWorthWithoutMortgages = parseFloat((totals.assets - totals.liabilities - totals.mortgageAccounts).toFixed(2))

  return totals
}

router.get('/:userId', (req, res) => {
  const { userId, } = req.params

  // TODO: check for authorized access

  connection.query(
    `SELECT * FROM networth WHERE userId = ?`, 
    [ userId ],
    (errors, networthResponse) => {
      if (errors) res.send({ errors })
      else { 
        const groupedByDate = groupByCaptureDate(networthResponse)

        const response = groupedByDate.map(({ dateCaptured, networthCollection, }) => {
          return {
            dateCaptured,
            totals: calculateTotals(networthCollection),
            networthCollection,
          }
        })

        res.send(response) 
      }
    }
  )

  // sample response:
  /*
    {
      dateCaptured: "2020-06-01", // YYYY-MM-DD
      totals: {
        cashAccounts: 0,
        nonRetirementInvestments: 0,
        retirementAccounts: 0,
        mortgageAccounts: 0,
        netWorthWithMortgages: 0,
        netWorthWithoutMortgages: 0,
      },
      networthCollection: [
        {
          year: 2020,
          month: 6,
          day: 12,
          accountInstitution: USAA,
          accountName: Checking,
          accountBalance: 0,
          isAsset: true,
          isRetirement: false,
          isInvestment: false,
          isHome: false
        },
        {
          year: 2020,
          month: 6,
          day: 12,
          accountInstitution: Vanguard,
          accountName: VTSAX,
          accountBalance: 0,
          isAsset: true,
          isRetirement: false,
          isInvestment: true,
          isHome: false
        },
        {
          year: 2020,
          month: 6,
          day: 12,
          accountInstitution: Fidelity,
          accountName: Roth IRA,
          accountBalance: 0,
          isAsset: true,
          isRetirement: true,
          isInvestment: true,
          isHome: false
        },
        {
          year: 2020,
          month: 6,
          day: 12,
          accountInstitution: PennyMacUSA,
          accountName: Mortgage,
          accountBalance: 0,
          isAsset: false,
          isRetirement: false,
          isInvestment: false,
          isHome: true
        },
        {
          year: 2020,
          month: 6,
          day: 12,
          accountInstitution: Zillow,
          accountName: Zestimate,
          accountBalance: 0,
          isAsset: true,
          isRetirement: false,
          isInvestment: false,
          isHome: true
        },
      ]
    }
  */
})

module.exports = router