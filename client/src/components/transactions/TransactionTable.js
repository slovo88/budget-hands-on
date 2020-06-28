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
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
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