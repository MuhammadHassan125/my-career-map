import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../Components/PrimaryBtn/index';
import { FiPlus } from "react-icons/fi";
import Loading from '../Components/Loading';
import {useUser} from '../context/context'
import PremiumModel from './PremiumModel';
const AddPathComponent = () => {
  
  const navigate = useNavigate();
  const {checkSubscription, setCheckSubscription} = useUser();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleNavigate = () => {
    navigate('/documents-upload');
  };

  useEffect(() => {
    if(checkSubscription === false){
      handleOpen();
    } else {setCheckSubscription(true);}
  }, []);

  return (
    <>
      <Loading />
      <PrimaryBtn text={"Add Path"} icon={<FiPlus />} onClick={handleNavigate} />
      <PremiumModel open={open} handleClose={handleClose} />
    </>
  );
};

export default AddPathComponent;
