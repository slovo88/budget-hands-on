import React from 'react'

export default function TransactionDetailsModal({ _id, transaction }) {
  return (
    <ul>
      <li>Date: {transaction.month}/{transaction.day}/{transaction.year}</li>
      <li>Description: {transaction.description}</li>
      <li>Amount: {transaction.amount}</li>
      <li>Category: {transaction.category}</li>
      <li>Note: {transaction.note}</li>
    </ul>
  )
}