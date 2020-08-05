import React, { useEffect, useState } from 'react'
import { AccountInformation, ConfirmUseCurrent, GetStarted, ReviewAndSubmit, } from './steps'


export default function AddNetworth(props) {
  const [ currentStep, setCurrentStep, ] = useState(0)

  useEffect(() => {
    
  }, [])
  
  function advanceStep() {
    setCurrentStep(currentStep + 1)
  }
  
  const ComponentMap = {
    step0: GetStarted,
    step1: ConfirmUseCurrent,
    step2: AccountInformation,
    step3: ReviewAndSubmit,
  }

  function DynamicComponent(props) {
    const StepComponent = ComponentMap[`step${props.currentStep}`]
    return <StepComponent {...props}/>
  }

  return (
    <div>
      <DynamicComponent currentStep={currentStep} advanceStep={advanceStep} />
      { currentStep > 0 && currentStep < 3 &&
        <button onClick={advanceStep}>Next</button>
      }
    </div>
  )
}