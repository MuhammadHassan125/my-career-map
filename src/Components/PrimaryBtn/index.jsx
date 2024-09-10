import React from 'react'
import './index.scss'

const index = ({ text, onSubmit, onClick, icon }) => {
  return (
    <button 
    className="primary-btn"
     type='submit' 
    onSubmit={onSubmit}
    onClick={onClick}
    >
      {icon ? icon : null}
      {text}
      </button>
  )
}

export default index