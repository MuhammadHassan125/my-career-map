import React from 'react'
import PrimaryBtn from '../Components/PrimaryBtn/index'
import { useNavigate } from 'react-router-dom'
const AddPathComponent = () => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/documents-upload')
      }
  return (
    <PrimaryBtn text={"Add Path"} onClick={handleNavigate} />
)
}

export default AddPathComponent