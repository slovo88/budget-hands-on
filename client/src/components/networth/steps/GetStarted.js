import React, { useEffect, useState } from 'react'


export default function GetStarted(props) {

  return (
    <div>
      <p>
        The networth section works best if you gather your balances 
        for all accounts on the same day, and continue to do so at a 
        regular interval.
      </p>

      <button onClick={props.advanceStep}>Get started</button>
    </div>
  )
}