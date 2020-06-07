import React, { useState } from 'react'
import TransactionTable from './TransactionTable'
import Wrapper from '../shared/Wrapper'
import AddTransactionForm from './AddTransactionForm'

export default function BulkAdd() {

  const [ newTransactions, setNewTransactions ] = useState([])

  const onTableRowClickBulkAdd = (transactionId) => {
    console.log({ transactionId })
  }

  const onTransactionSubmission = (e) => {
    e.preventDefault()

    const { target } = e
    const hasErrors = document.querySelectorAll('.error').length > 0

    if (!hasErrors) {
  
      const data = new FormData(target)
  
      const date = data.get('date')
      const description = data.get('description')
      const amount = parseFloat(data.get('amount').replace('$', ''))
      const category = data.get('category')
  
      const [ month, day, year ] = date.split('/')
      const newArr = newTransactions.concat({ year, month, day, description, category, amount, note: '' })
  
      setNewTransactions(newArr)
      
    } else {
      console.error('Error in transaction form')
    }

    setTimeout(() => { target.querySelector('input').focus() }, 0)
  }

  const saveTransactions = (e) => {
    const body = JSON.stringify({
      transactions: newTransactions
    })

    fetch('/api/transactions/1234', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then(setNewTransactions([]))
  }

  return (
    <Wrapper>
      <h1>Add Transactions</h1>

      <AddTransactionForm onTransactionSubmission={onTransactionSubmission} />

      {newTransactions.length > 0 &&
        <TransactionTable transactions={newTransactions} onTableRowClick={onTableRowClickBulkAdd}>
          <button onClick={saveTransactions}>
            Save Transactions
          </button>
        </TransactionTable>
      }
    </Wrapper>
  )
}