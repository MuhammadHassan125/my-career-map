import React from 'react'
import './index.scss'

const PrimaryInput = ({type, placeholder}) => {
  return (
    <>
        <input 
        type={type}
        placeholder={placeholder}
        className='primary-input'
        />
    </>
  )
}

export default PrimaryInput