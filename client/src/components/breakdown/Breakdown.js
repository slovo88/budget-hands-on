import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TransactionTable from '../transactions/TransactionTable'

export default function Breakdown() {
  const [transactions, setTransactions] = useState([])

  const getTransactions = () => {
    fetch('/api/transactions/1234/2020').then((a) => a.json()).then(data => setTransactions(data.transactions))
  }

  const onTableRowClickBreakdown = (transactionId) => {
    // TODO: create modal, pass transaction ID to modal for details
    console.log({ transactionId })
  }

  useEffect(() => {
    // TODO: check local storage for last-chosen state

    // TODO: check if redux already has necessary data
    getTransactions()
  }, [])

  return (
    <main>
      <h1>Budget Breakdown</h1>

      {transactions.length 
        ? <TransactionTable transactions={transactions} onTableRowClick={onTableRowClickBreakdown}>
            <Link to="add-transactions">Add transactions</Link>
          </TransactionTable>
        : <p>There are no transactions to show at this time.</p>
      }
    </main>
  )
}