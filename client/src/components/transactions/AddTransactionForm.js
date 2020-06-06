import React, { useEffect, useState } from 'react'

export default function AddTransactionForm({ onTransactionSubmission }) {

  useEffect(() => {
    
  }, [])
  
  const categories = ['Home', 'Vehicle', 'Phone', 'Food', 'Discretionary', 'Paycheck', 'Bonus', 'Rent', 'Loan repayment', 'Annual expenses', 'Vacations', 'Master bathroom renovation', '2020 IRA', '2021 IRA', 'Exercise room setup', 'Misc spending (furniture/gifts/etc)']
  
  const blurMethods = {
    dateBlur: ({ target }, errorSetter) => {
      errorSetter('')
      const { value } = target

      // checks for one or two digits, 
      // then optionally one or two more after a /, -, or .
      // then optionally two or 4 more after another /, -, or .
      const isValidFormat = /^\d{1,2}([/.-]\d{1,2})?([/.-](\d{4}|\d{2}))?$/.test(value)

      if (isValidFormat) {
        const [ month, day, year = new Date().getFullYear() ] = value.split(/\/|-|\./)
        
        const determinedMonth = day ? month : (new Date().getMonth() + 1).toString()
        const determinedDay = day ? day : month
  
        const yearChars = year.toString().length
  
        const determinedYear = yearChars === 4 ? year : `20${year}`
  
        target.value = `${determinedMonth}/${determinedDay}/${determinedYear}`

      } else {
        errorSetter('Enter a valid date')
      }
    },
    amountBlur: ({ target }, errorSetter) => {
      errorSetter('')

      const { value } = target

      const parsedValue = parseFloat(value.replace('$', ''))
      
      if (parsedValue) {
        target.value = `$${parsedValue.toFixed(2)}`
      } else {
        errorSetter('Enter a valid amount')
      }
    }
  }

  const Input = ({ label, type = "text", name }) => {
    const [ error, setError ] = useState('')

    const onBlur = (e) => {
      const emptyFunc = () => {}
      const blurMethod = blurMethods[`${name}Blur`] || emptyFunc
      blurMethod(e, setError)
    }

    return (
      <div>
        <label htmlFor={name}>{label}: </label>
        {type === 'select' 
          ? (
            <select name={name} id={name}>
              {categories.map((category) => {
                return <option key={category} value={category}>{category}</option>
              })}
            </select>
          )
          : <input type={type} name={name} id={name} onBlur={onBlur} />
        }
        
        {error &&
          <p className='error'>{error}</p>
        }
      </div>
    )
  }

  return (
    <form onSubmit={onTransactionSubmission}>
      <Input name="date" label="Date" />
      <Input name="description" label="Description" />
      <Input name="amount" label="Amount" />
      <Input name="category" label="Category" type="select" />
      <button type="submit">Submit</button>
    </form>
  )
}