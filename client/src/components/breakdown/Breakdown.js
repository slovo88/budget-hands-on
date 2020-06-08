import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TransactionTable from '../transactions/TransactionTable'
import modalStore from '../../stores/modalStore'
import transactionsStore from '../../stores/transactionsStore'
import TransactionDetailsModal from '../transactions/TransactionDetailsModal'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Breakdown() {
  const [ arrayOfYearsFrom2020, setArrayOfYears ] = useState([])

  const [ transactions, setTransactions ] = useState([])
  const [ currentBreakdownView, setCurrentBreakdownView ] = useState({ view: 'year', year: 2020 })

  const getTransactions = ({ view, year, month }) => {
    // TODO: implement loading state
    
    // check if redux already has necessary data
    const storedTransactions = transactionsStore.getState()
    let hasCurrentData = false
    
    // if year view, check store queryStatus for the year
    if (view === 'year') {
      hasCurrentData = storedTransactions[`year${year}`] && storedTransactions[`year${year}`].isStale !== undefined && !storedTransactions[`year${year}`].isStale
      
      if (hasCurrentData) {
        setTransactions(storedTransactions[`year${year}`].transactions)
      }
      
    } else if (view === 'month') {
      // if month view, check store queryStatus for the month
      hasCurrentData = storedTransactions[`year${year}`] && storedTransactions[`year${year}`][`month${month}`] && storedTransactions[`year${year}`][`month${month}`].isStale !== undefined && !storedTransactions[`year${year}`][`month${month}`].isStale
      
      if (hasCurrentData) {
        setTransactions(storedTransactions[`year${year}`][`month${month}`].transactions)
      }
    }
  
    if (!hasCurrentData) {
      const monthString = view === 'month' ? month : ''
      fetch(`/api/transactions/1234/${year}/${monthString}`).then((response) => response.json())
        .then(({ transactions }) => {
          transactionsStore.dispatch({
            type: 'TRANSACTIONS_GET',
            payload: {
              year,
              month: monthString,
              transactionsArray: transactions,
            },
          })
          setTransactions(transactions)
        })
    }
  }

  const onTableRowClickBreakdown = (transactionId) => {
    modalStore.dispatch({ 
      type: 'MODAL_OPEN',
      payload: {
        modalComponent: TransactionDetailsModal,
        modalProps: {
          _id: transactionId,
          transaction: transactions.find((transaction) => transaction._id === transactionId)
        } 
      }
    })
  }

  useEffect(() => {
    // check local storage for last-chosen year and/or month
    const storedBreakdownView = JSON.parse(localStorage.getItem('budgetBreakdownView'))
    const systemDate = new Date()
    const currentYear = new Date().getFullYear()

    // determine whether to use system date or previously stored values
    const year = storedBreakdownView ? storedBreakdownView.year : currentYear
    const month = storedBreakdownView ? storedBreakdownView.month : systemDate.getMonth() + 1
    
    // set initial breakdown and transactions view (set visible month and year)
    const initialBreakdownView = { view: month ? 'month' : 'year', year, month }
    // getBreakdown(initialBreakdownView)
    getTransactions(initialBreakdownView)
    setCurrentBreakdownView(initialBreakdownView)

    // create an array of years since 2020 (starting year of app / tracking)
    const years = []
    
    let startYear = 2020
    while ( startYear <= currentYear ) {
        years.push(startYear++)
    }

    setArrayOfYears(years)

  }, [])

  const adjustBreakdownView = (key, value) => {
    const newBreakdown = {...currentBreakdownView, [key]: value }
    getTransactions(newBreakdown)
    setCurrentBreakdownView(newBreakdown)
  }

  return (
    <main>
      <h1>Budget Breakdown</h1>

      <button onClick={() => adjustBreakdownView('view', 'year')}>Show year</button>
      <button onClick={() => adjustBreakdownView('view', 'month')}>Show month</button>

      {currentBreakdownView.view === 'month' &&
        <select 
          defaultValue={currentBreakdownView.month} 
          onChange={(e) => adjustBreakdownView('month', parseInt(e.target.value))}
        >
          {monthNames.map((month, index) => {
            const monthValue = index + 1
            return <option key={month} value={monthValue}>{month}</option>
          })}
        </select>
      }
      
      {arrayOfYearsFrom2020.length > 1
        ? <select 
            defaultValue={currentBreakdownView.year} 
            onChange={(e) => adjustBreakdownView('year', parseInt(e.target.value))}
          >
            {arrayOfYearsFrom2020.map((year) => 
              <option key={year} value={year}>
                {year}
              </option> 
            )}
          </select>
        : <p>{arrayOfYearsFrom2020[0]}</p>
      }

      {transactions.length 
        ? <TransactionTable transactions={transactions} onTableRowClick={onTableRowClickBreakdown}>
            <Link to="add-transactions">Add transactions</Link>
          </TransactionTable>
        : <p>There are no transactions to show at this time.</p>
      }
    </main>
  )
}