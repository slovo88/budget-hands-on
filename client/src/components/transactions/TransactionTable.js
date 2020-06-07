import React from 'react'
import Wrapper from '../shared/Wrapper'

export default function TransactionTable({ transactions = [], onTableRowClick, children }) {

  return (
    <Wrapper>
      <h2>Transactions</h2>

      {children}

      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Description</td>
            <td>Category</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ _id, year, month, day, description, category, amount }, index) => {
            return (
              <tr key={_id || index} onClick={() => {
                onTableRowClick(_id || index)
              }}>
                <td>{`${month}/${day}/${year}`}</td>
                <td>{description}</td>
                <td>{category}</td>
                <td>{amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}