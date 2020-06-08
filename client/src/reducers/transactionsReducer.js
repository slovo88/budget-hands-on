// const exampleObj = {
//   year2020: {
//     isStale: true, 
//     month3: {
//       transactions: [],
//       isStale: true, 
//     },
//     ...etc,
//   },
//   year2021: {
//     isStale: false,
//     month4: {
//       transactions: [],
//       isStale: false, 
//     },
//     ...etc,
//   },
//   ...etc,
// }

export default function transactionsReducer(state = {}, action) {
  switch (action.type) {
    case 'TRANSACTIONS_GET':
      const { month, year, transactionsArray } = action.payload
      const yearKey = `year${year}`
      
      // if month is provided, update isStale and transactions array for month of year
      if (month) {
        return {
          ...state, 
          [yearKey]: {
            ...state[yearKey],
            [`month${month}`]: {
              isStale: false,
              transactions: transactionsArray,
            }
          }
        }
      }
      
      // if no month provided, map transactions to appropriate month(s) for year
      const yearObj = {
        isStale: false,
        // TODO: don't duplicate entries with transactions object (e.g. [...month12.transactions, ...month11.transactions, ...])
        transactions: transactionsArray,
      }

      for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
        const monthlyTransactions = transactionsArray.filter((transaction) => transaction.month === monthNumber)
        
        yearObj[`month${monthNumber}`] = {
          isStale: false,
          transactions: monthlyTransactions,
        }
      }

      return {
        ...state,
        [yearKey]: yearObj
      }
    case 'TRANSACTIONS_ADD':
      const { impactedDates } = action.payload
      let updatedState = state
      // flag status as stale for impacted years/months
      impactedDates.forEach(({ month, year }) => {
        const yearKey = `year${year}`
        updatedState = {
          ...updatedState, 
          [yearKey]: {
            ...updatedState[yearKey],
            isStale: true,
            [`month${month}`]: {
              isStale: true,
            }
          }
        }
      })

      return updatedState
    case 'TRANSACTION_EDIT':
      const { updatedTransaction } = action.payload
      // edit transaction locally - data doesn't need to be considered stale

      return state
    case 'TRANSACTION_DELETE':
      const { transactionId, transactionYear, transactionMonth } = action.payload
      // delete transaction locally - data doesn't need to be considered stale

      return state
    default:
      return state
  }
}

