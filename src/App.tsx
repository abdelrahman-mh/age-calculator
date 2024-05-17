import React, { useState } from 'react'
import { ValidFormData, AgeOutput } from './utils/types'
import Form from './components/Form'
import Output from './components/Output'
import { calculateAge } from './utils/helper'

const App: React.FC = () => {
  const [result, setResult] = useState<AgeOutput>({})

  const calc = (data: ValidFormData) => {
    const result = calculateAge(data)
    setResult(result)
  }

  return (
    <>
      <Form calc={calc} />
      <Output date={result} />
    </>
  )
}

export default App
