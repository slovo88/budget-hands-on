import React from 'react'

import './Wrapper.css'

export default function Wrapper({ className, children }) {
  return (
    <section className={`${className} wrapper`}>
      {children}
    </section>
  )
}