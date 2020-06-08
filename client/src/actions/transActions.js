export const TRANSACTIONS_GET = ({ year, month }) => ({
  type: 'TRANSACTIONS_GET',
  payload: {
    year,
    month,
  },
})

export const TRANSACTIONS_ADD = ({ impactedDates }) => ({
  type: 'TRANSACTIONS_ADD',
  payload: {
    impactedDates,
  }
})

export const TRANSACTION_EDIT = ({ updatedTransaction }) => ({
  type: 'TRANSACTION_EDIT',
  payload: {
    updatedTransaction,
  }
})

export const TRANSACTION_DELETE = ({ transactionId, transactionYear, transactionMonth }) => ({
  type: 'TRANSACTION_DELETE',
  payload: {
    transactionId,
    transactionYear,
    transactionMonth,
  }
})