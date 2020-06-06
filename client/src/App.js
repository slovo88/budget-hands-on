import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Breakdown from './components/breakdown/Breakdown'
import BulkAdd from './components/transactions/BulkAdd'
import Nav from './components/nav/Nav'
import Snapshot from './components/snapshot/Snapshot'

import './App.css'

function App() {
  // const get = () => {
  //   fetch('/api/transactions/1234/2020').then((a) => a.json()).then(data => setTransactionsList(data.transactions))
  // }

  // const add = (e) => {
  //   e.preventDefault()
  //   const date = document.getElementById('add-date').value
  //   const [ month, day, year ] = date.split('/')

  //   const body = JSON.stringify({
  //     transactions: [{
  //       year,
  //       month,
  //       day,
  //       description: 'adding stuff',
  //       category: 'movies',
  //       amount: 24.16,
  //       note: ''
  //     }]
  //   })

  //   fetch('/api/transactions/1234', {
  //     method: 'POST', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body,
  //   }).then(get)
  // }

  // const edit = (e) => {
  //   e.preventDefault()
  //   const _id = document.getElementById('edit-id').value
  //   const field = document.getElementById('edit-field').value
  //   const value = document.getElementById('edit-value').value

  //   const body = JSON.stringify({
  //     transaction: {
  //       _id,
  //       field,
  //       value,
  //     }
  //   })

  //   fetch('/api/transactions/1234', {
  //     method: 'PUT', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body,
  //   }).then(get) 
  // }

  // const doDelete = (e) => {
  //   e.preventDefault()
  //   const _id = document.getElementById('delete-id').value

  //   fetch(`/api/transactions/1234/${_id}`, {
  //     method: 'DELETE',
  //   }).then(get)
  // }

  return (
    <Router>
      <div id="modal-wrapper">

      </div>

      <div className="App">
        <Nav />

        <Route path="/add-transactions" component={BulkAdd} />
        <Route path="/breakdown" component={Breakdown} />
        <Route path="/" component={Snapshot} exact />





        {/* <div>
          <h2>Get</h2>
          <button onClick={get}>get</button>
          <table>
            {transactionsList.length ? 
              <thead>
                <td>id</td>
                <td>date</td>
                <td>description</td>
                <td>category</td>
                <td>amount</td>
              </thead>
              : null
            }
            <tbody>
              {transactionsList.map(({ _id, year, month, day, description, category, amount }) => {
                return (
                  <tr>
                    <td>{_id}</td>
                    <td>{`${year}/${month}/${day}`}</td>
                    <td>{description}</td>
                    <td>{category}</td>
                    <td>{amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      
        <div>
          <h2>Add</h2>
          <form>
            <label for="add-date">Date</label>
            <input id="add-date" name="add-date" type="text"/>

            <button onClick={add}>add</button>
          </form>
        </div>

        <div>
          <h2>Edit</h2>
          <form>
            <label for="edit-id">id</label>
            <input id="edit-id" name="edit-id" type="text"/>

            <label for="edit-field">field</label>
            <input id="edit-field" name="edit-field" type="text"/>

            <label for="edit-value">value</label>
            <input id="edit-value" name="edit-value" type="text"/>
            
            <button onClick={edit}>edit</button>
          </form>
        </div>

        <div>
          <h2>Delete</h2>
          <form>
            <label for="delete-id">id</label>
            <input id="delete-id" name="delete-id" type="text"/>
            
            <button onClick={doDelete}>doDelete</button>
          </form>
        </div> */}

      </div>
    </Router>
  )
}

export default App
