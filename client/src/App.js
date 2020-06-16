import React, { useState } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Breakdown from './components/breakdown/Breakdown'
import BulkAdd from './components/transactions/BulkAdd'
import Nav from './components/nav/Nav'
// import Snapshot from './components/snapshot/Snapshot'
import modalStore from './stores/modalStore'

import './App.css'

function App() {
  const [ modalSettings, setModalSettings ] = useState({ 
    modalOpen: false, modalComponent: null, modalProps: {} 
  })

  modalStore.subscribe(() => {
    setModalSettings(modalStore.getState())
  })

  // TODO: move into separate component
  const closeModal = (e) => {
    modalStore.dispatch({ type: 'MODAL_CLOSE' })
  }

  const stopProp = (e) => {
    e.stopPropagation()
  }

  // TODO: refine and move to css file
  const fullPage = {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    background: 'rgb(0, 0, 0, 0.7'
  }

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
  //   const _id = parseInt(document.getElementById('edit-id').value)
  //   const year = parseInt(document.getElementById('edit-year').value)
  //   const month = parseInt(document.getElementById('edit-month').value)
  //   const day = parseInt(document.getElementById('edit-day').value)
  //   const description = document.getElementById('edit-description').value
  //   const amount = parseFloat(document.getElementById('edit-amount').value)
  //   const category = document.getElementById('edit-category').value
  //   const note = document.getElementById('edit-note').value

  //   const body = JSON.stringify({
  //     transaction: {
  //       _id,
  //       year,
  //       month,
  //       day,
  //       description,
  //       amount,
  //       category,
  //       note,
  //     }
  //   })

  //   fetch('/api/transactions/1234', {
  //     method: 'PUT', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body,
  //   }).then(console.log) 
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

      {modalSettings.modalOpen && 
        // TODO: move to component, refine styling and move to css
        <div style={fullPage} id="modal-wrapper" onClick={closeModal}>
          <div onClick={stopProp} style={{ position: 'relative', backgroundColor: 'white', width: '30%', padding: '50px', margin: 'auto', top: '35vh' }}>
            <modalSettings.modalComponent {...modalSettings.modalProps}/>
          </div>
        </div>
      }

      <div className="App">
        <Nav />

        <Route path="/add-transactions" component={BulkAdd} />
        <Route path="/breakdown" component={Breakdown} />
        <Route path="/" component={Breakdown} exact />





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
        </div> */}
      
        {/* <div>
          <h2>Add</h2>
          <form>
            <label for="add-date">Date</label>
            <input id="add-date" name="add-date" type="text"/>

            <button onClick={add}>add</button>
          </form>
        </div> */}

        {/* <div>
          <h2>Edit</h2>
          <form>
            <label for="edit-id">id</label>
            <input id="edit-id" name="edit-id" type="text"/>

            <label for="edit-year">year</label>
            <input id="edit-year" name="edit-year" type="text"/>

            <label for="edit-month">month</label>
            <input id="edit-month" name="edit-month" type="text"/>

            <label for="edit-day">day</label>
            <input id="edit-day" name="edit-day" type="text"/>

            <label for="edit-description">description</label>
            <input id="edit-description" name="edit-description" type="text"/>

            <label for="edit-amount">amount</label>
            <input id="edit-amount" name="edit-amount" type="text"/>

            <label for="edit-category">category</label>
            <input id="edit-category" name="edit-category" type="text"/>

            <label for="edit-note">note</label>
            <input id="edit-note" name="edit-note" type="text"/>
            
            <button onClick={edit}>edit</button>
          </form>
        </div> */}

        {/* <div>
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
