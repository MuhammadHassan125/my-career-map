import React, {useState} from 'react'
import './index.scss'

const PrimaryInput = ({type, placeholder, value, onChange, ...restProps}) => {
  return (
    <>
        <input 
        type={type}
        placeholder={placeholder}
        className='primary-input'
        value={value}
        onChange={onChange}
        {...restProps}
        />
    </>
  )
}

export default PrimaryInput