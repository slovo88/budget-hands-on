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
  
      const newArr = newTransactions.concat({ year, month, day, description, category, amount })
  
      setNewTransactions(newArr)
      
    } else {
      console.error('Error in transaction form')
    }

    setTimeout(() => { target.querySelector('input').focus() }, 0)
  }

  return (
    <Wrapper>
      <h1>Add Transactions</h1>
      {console.log('render bulk add')}

      <AddTransactionForm onTransactionSubmission={onTransactionSubmission} />

      {newTransactions.length > 0 &&
        <TransactionTable transactions={newTransactions} onTableRowClick={onTableRowClickBulkAdd}>
          <button>Save Transactions</button>
        </TransactionTable>
      }
    </Wrapper>
  )
}