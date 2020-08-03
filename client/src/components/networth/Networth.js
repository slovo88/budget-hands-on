import React, { useEffect, useState } from 'react'
import Wrapper from '../shared/Wrapper'

import './Networth.css'

export default function Networth() {

  const [ accountLineItems, setAccountLineItems ] = useState([])
  const [ networthLineItems, setNetworthLineItems ] = useState({})
  
  useEffect(() => {
    fetch(`/api/networth/1234`).then((response) => response.json())
      .then((networth) => {
        // transactionsStore.dispatch({
        //   type: 'TRANSACTIONS_GET',
        //   payload: {
        //     year,
        //     month: monthString,
        //     transactionsArray: transactions,
        //   },
        // })
        // setTransactions(transactions)
        
        const mostRecentNetWorth = networth.reduce((acc, next) => {
          const accDateInMilliseconds = new Date(acc.dateCaptured).getTime()
          const nextDateInMilliseconds = new Date(next.dateCaptured).getTime()

          if (nextDateInMilliseconds - accDateInMilliseconds > 0) return next

          return acc
        })

        console.log({ mostRecentNetWorth })

        setAccountLineItems(mostRecentNetWorth.networthCollection)
        setNetworthLineItems(mostRecentNetWorth.totals)
      })
  }, [])

  const determineAccountType = ({ isRetirement, isInvestment, isHome }) => {
    if (isRetirement) return 'Retirement'
    if (isHome) return 'Home'
    if (isInvestment) return 'Investment'
    return 'Cash'
  }

  return (
    <main>
      <Wrapper className="budget-breakdown">
        <table>
          <thead>
            <tr>
              <th>Institution</th>
              <th>Account</th>
              <th>Current Balance</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {accountLineItems.map((item) => {
              return (
                <tr>
                  <td>{item.accountInstitution}</td>
                  <td>{item.accountName}</td>
                  <td>{!item.isAsset ? '(' : null}{item.accountBalance}{!item.isAsset ? ')' : null}</td>
                  <td>{determineAccountType(item)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Wrapper>

      <Wrapper className="budget-breakdown">
        <table>
          <thead>
            {/* <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr> */}
          </thead>
          <tbody>
            {networthLineItems &&
              <>
                <tr>
                  <td>Total cash</td>
                  <td>{networthLineItems.cashAccounts}</td>
                </tr>
                <tr>
                  <td>Total investments</td>
                  <td>{networthLineItems.nonRetirementInvestments}</td>
                </tr>
                <tr>
                  <td>Total retirement</td>
                  <td>{networthLineItems.retirementAccounts}</td>
                </tr>
                <tr>
                  <td>Home/mortgage</td>
                  <td>{networthLineItems.mortgageAccounts}</td>
                </tr>
                <tr>
                  <td>Total net worth</td>
                  <td>{networthLineItems.netWorthWithMortgages}</td>
                </tr>
                <tr>
                  <td>Total without home/mortgage</td>
                  <td>{networthLineItems.netWorthWithoutMortgages}</td>
                </tr>
              </>
            }
          </tbody>
        </table>
      </Wrapper>
    </main>
  )
}