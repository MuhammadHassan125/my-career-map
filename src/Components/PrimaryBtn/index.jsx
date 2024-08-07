import React from 'react'
import './index.scss'

const index = ({ text, onClick }) => {
  return (
    <button className="primary-btn" onClick={onClick}>{text}</button>
  )
}

export default index