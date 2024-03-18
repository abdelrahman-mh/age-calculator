import React, { useState } from 'react'
import { ValidFormData, AgeOutput } from './types'
import Form from './components/Form'
import Output from './components/Output'
import { calculateAge } from './helper'

const App: React.FC = () => {
  const [result, setResult] = useState<AgeOutput>({})

  const handleCalc = (data: ValidFormData) => {
    const result = calculateAge(data)
    setResult(result)
  }

  return (
    <>
      <Form calc={handleCalc} />
      <Output date={result} />
    </>
  )
}

export default App
