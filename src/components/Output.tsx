import React from 'react'
import { AgeOutput } from '../types'

interface Props {
  date: AgeOutput
}

const Output: React.FC<Props> = ({ date }) => {
  return (
    <div className='calc-output'>
      <div className='calc-output__item'>
        <span className='calc-output__item-value'>{date.years ? date.years : '--'}</span>
        <span className='calc-output__item-felid'>years</span>
      </div>
      <div className='calc-output__item'>
        <span className='calc-output__item-value'>{date.months ? date.months : '--'}</span>
        <span className='calc-output__item-felid'>months</span>
      </div>
      <div className='calc-output__item'>
        <span className='calc-output__item-value'>{date.days ? date.days : '--'}</span>
        <span className='calc-output__item-felid'>days</span>
      </div>
    </div>
  )
}

export default Output
