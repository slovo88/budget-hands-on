import React, { useState } from 'react'
import TransactionTable from './TransactionTable'
import Wrapper from '../shared/Wrapper'
import AddTransactionForm from './AddTransactionForm'
import TransactionDetailsModal from './TransactionDetailsModal'
import modalStore from '../../stores/modalStore'
import transactionStore from '../../stores/transactionsStore'

export default function BulkAdd() {

  const [ newTransactions, setNewTransactions ] = useState([])

  const onTableRowClickBulkAdd = (transactionIndex) => {
    modalStore.dispatch({ 
      type: 'MODAL_OPEN',
      payload: {
        modalComponent: TransactionDetailsModal,
        modalProps: {
          _id: transactionIndex,
          transaction: newTransactions[transactionIndex]
        } 
      }
    })
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
    // TODO: implement loading state on submission
    const body = JSON.stringify({
      transactions: newTransactions
    })

    fetch('/api/transactions/1234', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then(() => {
      const impactedDates = 
        newTransactions.length === 1 ?
        
        [{ year: newTransactions[0].year, month: newTransactions[0].month }] :
        
        newTransactions.reduce((acc, { month, year }) => {
        const accumulatedArray = !Array.isArray(acc) ? [] : acc

        if (!Array.isArray(acc)) {
          const { month, year } = acc
          accumulatedArray.push({ month, year })
        }
        
        if (!accumulatedArray.some((dateItem) => dateItem.month === month && dateItem.year === year)) {  
          accumulatedArray.push({ month, year })
        }

        return accumulatedArray
      })

      transactionStore.dispatch({
        type: 'TRANSACTIONS_ADD',
        payload: {
          impactedDates,
        }
      })
      setNewTransactions([])
    })
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