import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TransactionTable from '../transactions/TransactionTable'
import modalStore from '../../stores/modalStore'
import transactionsStore from '../../stores/transactionsStore'
import breakdownStore from '../../stores/breakdownStore'
import TransactionDetailsModal from '../transactions/TransactionDetailsModal'
import Wrapper from '../shared/Wrapper'

import './Breakdown.css'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Breakdown() {
  const [ arrayOfYearsFrom2020, setArrayOfYears ] = useState([])

  const [ transactions, setTransactions ] = useState([])
  const [ pools, setPools ] = useState({})
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
        const transactions = storedTransactions[`year${year}`].transactions

        setTransactions(transactions)
        getBreakdown(view, year, month, transactions)
      }
      
    } else if (view === 'month') {
      // if month view, check store queryStatus for the month
      hasCurrentData = storedTransactions[`year${year}`] && storedTransactions[`year${year}`][`month${month}`] && storedTransactions[`year${year}`][`month${month}`].isStale !== undefined && !storedTransactions[`year${year}`][`month${month}`].isStale
      
      if (hasCurrentData) {
        const transactions = storedTransactions[`year${year}`][`month${month}`].transactions

        setTransactions(transactions)
        getBreakdown(view, year, month, transactions)
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
          getBreakdown(view, year, month, transactions, true)
        })
    }
  }


  const getBreakdown = (view, year, month, transactions, forceRecalc) => {
    // TODO: implement loading state

    // check if redux already has necessary data
    const storedBreakdownCalc = breakdownStore.getState()
    let hasCurrentData = false
    
    // if year view, check store queryStatus for the year
    if (view === 'year') {
      hasCurrentData = storedBreakdownCalc[`bd${year}`] !== undefined
      
      if (hasCurrentData) {
        setPools(storedBreakdownCalc[`bd${year}`])
      }
      
    } else if (view === 'month') {
      // if month view, check store queryStatus for the month
      hasCurrentData = storedBreakdownCalc[`bd${year}${month}`] !== undefined
      
      if (hasCurrentData) {
        setPools(storedBreakdownCalc[`bd${year}${month}`])
      }
    }

    // TODO: don't make call and just force recalc if pools have been fetched for year
    if (!hasCurrentData || forceRecalc) {
      const monthString = view === 'month' ? month : ''

      fetch(`/api/breakdown/1234/${year}`).then((response) => response.json())
        .then((pools) => {
          breakdownStore.dispatch({
            type: 'BREAKDOWN_CALCULATE',
            payload: {
              year,
              month: monthString,
              transactions,
              pools,
            },
          })
          getBreakdown(view, year, month, transactions)
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

      <h1 className="breakdown-header">
        Breakdown by:
      </h1>
      <button 
        className={`${currentBreakdownView.view === 'year' && 'active'} breakdown-toggle`}
        onClick={() => adjustBreakdownView('view', 'year')}
      >
        Year
      </button>
      <button 
        className={`${currentBreakdownView.view === 'month' && 'active'} breakdown-toggle`}
        onClick={() => adjustBreakdownView('view', 'month')}
      >
        Month
      </button>

      <Wrapper className="budget-breakdown">

        <span>Breakdown for </span>

        {currentBreakdownView.view === 'month' &&
          <select 
            className="breakdown-month"
            defaultValue={currentBreakdownView.month} 
            onChange={(e) => adjustBreakdownView('month', parseInt(e.target.value))}
          >
            {monthNames.map((month, index) => {
              const monthValue = index + 1
              return <option key={month} value={monthValue}>{month}</option>
            })}
          </select>
        }

        {currentBreakdownView.view === 'month' && 
          <span> of </span>
        }
        
        {arrayOfYearsFrom2020.length > 1
          ? <select 
              className="breakdown-year"
              defaultValue={currentBreakdownView.year} 
              onChange={(e) => adjustBreakdownView('year', parseInt(e.target.value))}
            >
              {arrayOfYearsFrom2020.map((year) => 
                <option key={year} value={year}>
                  {year}
                </option> 
              )}
            </select>
          : <p className="breakdown-year">{arrayOfYearsFrom2020[0]}</p>
        }

        {pools.monthlyPool && 
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {pools.monthlyPool.map(({ category, target, spent, remaining, }) => {
                return (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{target}</td>
                    <td>{spent}</td>
                    <td>{remaining}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>{pools.monthlyPool.reduce((acc, { target })=> acc + parseFloat(target), 0).toFixed(2)}</td>
                <td>{pools.monthlyPool.reduce((acc, { spent })=> acc + parseFloat(spent), 0).toFixed(2)}</td>
                <td>{pools.monthlyPool.reduce((acc, { remaining })=> acc + parseFloat(remaining), 0).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        }

        {pools.annualPool && 
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {pools.annualPool.map(({ category, target, spent, remaining, }) => {
                return (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{target}</td>
                    <td>{spent}</td>
                    <td>{remaining}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>{pools.annualPool.reduce((acc, { target })=> acc + parseFloat(target), 0).toFixed(2)}</td>
                <td>{pools.annualPool.reduce((acc, { spent })=> acc + parseFloat(spent), 0).toFixed(2)}</td>
                <td>{pools.annualPool.reduce((acc, { remaining })=> acc + parseFloat(remaining), 0).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        }

        {pools.incomePool && 
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {pools.incomePool.map(({ category, target, spent, remaining, }) => {
                return (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{target}</td>
                    <td>{spent}</td>
                    <td>{remaining}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>{pools.incomePool.reduce((acc, { target })=> acc + parseFloat(target), 0).toFixed(2)}</td>
                <td>{pools.incomePool.reduce((acc, { spent })=> acc + parseFloat(spent), 0).toFixed(2)}</td>
                <td>{pools.incomePool.reduce((acc, { remaining })=> acc + parseFloat(remaining), 0).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        }
      </Wrapper>

      {transactions.length 
        ? <TransactionTable transactions={transactions} onTableRowClick={onTableRowClickBreakdown}>
            <Link to="add-transactions">Add transactions</Link>
          </TransactionTable>
        : <p>There are no transactions to show at this time.</p>
      }
    </main>
  )
}