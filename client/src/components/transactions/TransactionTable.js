import React from 'react';
import { Link } from 'react-router-dom'
import Wrapper from '../shared/Wrapper'

export default function TransactionTable({ transactions = [], onTableRowClick }) {

  return (
    <Wrapper>
      <h2>Transactions</h2>
      <Link to="add-transactions">Add transactions</Link>

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
          {transactions.map(({ _id, year, month, day, description, category, amount }) => {
            return (
              <tr key={_id} onClick={() => {
                onTableRowClick(_id)
              }}>
                <td>{`${year}/${month}/${day}`}</td>
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