import React from 'react'
import './index.scss'

const PrimaryBtn = ({text, onClick}) => {
  return (
    <>
      <button className="primary-btn" onClick={onClick}>{text}</button>
    </>
  )
}

export default PrimaryBtn