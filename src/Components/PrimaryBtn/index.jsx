import React from 'react'
import './index.scss'

const index = ({ text, onSubmit, onClick }) => {
  return (
    <button 
    className="primary-btn" type='submit' 
    onSubmit={onSubmit}
    onClick={onClick}
    >{text}</button>
  )
}

export default index