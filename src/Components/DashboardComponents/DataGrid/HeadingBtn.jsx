import React from 'react'
import './index.scss'

const HeadingBtn = ({text, onClick}) => {
  return (
    <React.Fragment>
        <button className='heading__btn' onClick={onClick}>{text}</button>
    </React.Fragment>
  )
}

export default HeadingBtn