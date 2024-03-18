import React, { useState } from 'react'
import validateDate from '../validate'
import { FormData, ErrorFields, ValidFormData } from '../types'

interface Props {
  calc: (formData: ValidFormData) => void
}

type FormDataInput = {
  [K in keyof FormData]: string
}

const Form: React.FC<Props> = ({ calc }) => {
  const [formData, setFormData] = useState<FormDataInput>({ day: '', month: '', year: '' })
  const [parseDate, setParserDate] = useState<FormData>({ day: undefined, month: undefined, year: undefined })
  const [errors, setErrors] = useState<ErrorFields>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (/^$|^\d{1,16}$/.test(value) && !isNaN(value as unknown as number)) {
      // Max 16 digits

      // Remove error message
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
      setParserDate((prevData) => ({
        ...prevData,
        [name]: value === '' ? undefined : parseInt(value),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationResult = validateDate(parseDate)
    if (validationResult.isValid) {
      calc(parseDate as ValidFormData)
    } else {
      setErrors(validationResult.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='calc-form'>
      <div className='calc-form__form-items'>
        <div className='calc-form__form-item'>
          <label className={`calc-form__input-label ${errors.day ? 'error' : ''}`}>DAY</label>
          <input
            placeholder='DD'
            className={`calc-form__input  ${errors.day ? 'error' : ''}`}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            name='day'
            value={formData.day}
            onChange={handleChange}
          />
          {errors.day && <span className='calc-form__input-error'>{errors.day}</span>}
        </div>
        <div className='calc-form__form-item'>
          <label className={`calc-form__input-label ${errors.month ? ' error' : ''}`}>MONTH</label>
          <input
            placeholder='MM'
            className={`calc-form__input ${errors.month ? ' error' : ''}`}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            name='month'
            value={formData.month}
            onChange={handleChange}
          />
          {errors.month && <span className='calc-form__input-error'>{errors.month}</span>}
        </div>
        <div className='calc-form__form-item'>
          <label className={`calc-form__input-label ${errors.year ? ' error' : ''}`}>YEAR</label>
          <input
            placeholder='YYYY'
            className={`calc-form__input ${errors.year ? ' error' : ''}`}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            name='year'
            value={formData.year}
            onChange={handleChange}
          />
          {errors.year && <span className='calc-form__input-error'>{errors.year}</span>}
        </div>
      </div>
      <button type='submit' className='calc-form__form-submit-button'>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <span className='calc-form__form-line'></span>
    </form>
  )
}

export default Form
