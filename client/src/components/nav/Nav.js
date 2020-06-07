import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav>
      Navigation

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
      </ul>
    </nav>
  )
}