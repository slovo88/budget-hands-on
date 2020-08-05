import React, { useEffect, useState } from 'react'
import Wrapper from '../shared/Wrapper'
import networthStore from '../../stores/networthStore'

import './Networth.css'
import AddNetworth from './AddNetworth'


export default function Networth() {

  const [ hasLoaded, setHasLoaded ] = useState(false)
  const [ hasError, setHasError ] = useState(false)
  const [ accountLineItems, setAccountLineItems ] = useState([])
  const [ networthLineItems, setNetworthLineItems ] = useState(null)
  
  useEffect(() => {
    const storedNetworth = networthStore.getState()
    let { mostRecentNetworth } = storedNetworth

    if (mostRecentNetworth) {

      setHasLoaded(true)
      
      setAccountLineItems(mostRecentNetworth.networthCollection)
      setNetworthLineItems(mostRecentNetworth.totals)

    } else {
      fetch(`/api/networth/1234`).then((response) => response.json())
        .then((networthCollection) => {
          
          if (networthCollection.length > 0) {
            mostRecentNetworth = networthCollection.reduce((acc, next) => {
              const accDateInMilliseconds = new Date(acc.dateCaptured).getTime()
              const nextDateInMilliseconds = new Date(next.dateCaptured).getTime()
              
              if (nextDateInMilliseconds - accDateInMilliseconds > 0) return next
              
              return acc
            })
            
            networthStore.dispatch({
              type: 'NETWORTH_GET',
              payload: {
                networthCollection,
                mostRecentNetworth,
              },
            })
  
            
            setAccountLineItems(mostRecentNetworth.networthCollection)
            setNetworthLineItems(mostRecentNetworth.totals)
          }

          setHasLoaded(true)

        })
        .catch((error) => {
          console.error(error)
  
          setHasError(true)
        })
    }

  }, [])

  const determineAccountType = ({ isRetirement, isInvestment, isHome }) => {
    if (isRetirement) return 'Retirement'
    if (isHome) return 'Home'
    if (isInvestment) return 'Investment'
    return 'Cash'
  }

  return (
    <main>
      {hasError

        ? <p>Something went wrong.</p>

        : !hasLoaded 

        ? <p>Loading...</p>

        : accountLineItems.length ?

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
                  <tr key={item._id}>
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

        : null
      }

      {hasLoaded && !hasError && networthLineItems &&

        <Wrapper className="budget-breakdown">
          <table>
            <thead>
              {/* <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr> */}
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </Wrapper>
      }

      {hasLoaded &&
        <Wrapper>
          <h2>Add networth</h2>

          <AddNetworth />
        </Wrapper>
      }
    </main>
  )
}