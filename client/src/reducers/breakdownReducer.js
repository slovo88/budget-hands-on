// const exampleObj = {
//   bdYYYY: {

//   },
//   bdYYYYMM: {
//     monthlyBreakdown: {

//     },
//   },
//   bdYYYYMM: {
//     ...etc,
//   },
//   ...etc,
// }

export default function breakdownReducer(state = {}, { type, payload }) {
  switch (type) {
    case 'BREAKDOWN_CALCULATE':
      const { year, month, transactions, pools, } = payload

      const isForYear = !month

      const monthlyPool = pools.monthly.pool.map((lineItem) => {
        const spent = transactions
                        .filter((transaction) => transaction.category === lineItem.category)
                        .reduce((acc, transaction) => acc + transaction.amount, 0)

        lineItem.target = isForYear ? lineItem.target * 12 : lineItem.target

        const remaining = lineItem.target - spent

        
        return {
          ...lineItem,
          spent,
          remaining,
        }
      })

      const annualPool = pools.annual.pool.map((lineItem) => {
        const spent = transactions
                        .filter((transaction) => transaction.category === lineItem.category)
                        .reduce((acc, transaction) => acc + transaction.amount, 0)

        const remaining = lineItem.target - spent

        return {
          ...lineItem,
          spent,
          remaining,
        }
      })

      const incomePool = pools.income.pool.map((lineItem) => {
        const spent = transactions
                        .filter((transaction) => transaction.category === lineItem.category)
                        .reduce((acc, transaction) => acc + transaction.amount, 0)

        // paychecks are biweekly, so I get 26 checks total
        const targetFactorial = lineItem.category === 'Paycheck' ? 13 : 12
        lineItem.target = isForYear ? lineItem.target * targetFactorial : lineItem.target

        const remaining = lineItem.target - spent

        return {
          ...lineItem,
          spent,
          remaining,
        }
      })

      return {
        ...state,
        [`bd${year}${month}`]: { monthlyPool, annualPool, incomePool }
      }
    default:
      return state
  }
}