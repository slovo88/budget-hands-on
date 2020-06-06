import React from 'react';
import TransactionTable from './TransactionTable'
import Wrapper from '../shared/Wrapper';

export default function BulkAdd() {
  const onTableRowClickBulkAdd = (transactionId) => {
    console.log({ transactionId })
  }

  return (
    <Wrapper>
      <h1>Add Transactions</h1>
  

      <TransactionTable onTableRowClick={onTableRowClickBulkAdd} />
    </Wrapper>
  )
}