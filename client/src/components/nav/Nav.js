import React from 'react'
import { NavLink } from 'react-router-dom'

import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      
      <p>Budget App</p>

      <ul>
        {/* <li>
          <NavLink activeStyle={{fontWeight:'bold'}} to="/" exact>Dashboard</NavLink>
        </li> */}
        <li>
          <NavLink activeStyle={{fontWeight:'bold'}} to="/add-transactions">Add Transactions</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight:'bold'}} to="/breakdown">Budget Breakdown</NavLink>
        </li>
        <li>
          <NavLink activeStyle={{fontWeight:'bold'}} to="/net-worth">Net Worth</NavLink>
        </li>
      </ul>
    </nav>
  )
}