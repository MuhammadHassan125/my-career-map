import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../Components/PrimaryBtn/index';
import { FiPlus } from "react-icons/fi";
import Loading from '../Components/Loading';
import {useUser} from '../context/context'
import PremiumModel from './PremiumModel';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import { Button } from '@mui/material';
import useFire, { baseURL } from '../Fire/useFire';
import { Snackbar } from '../Utils/SnackbarUtils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  padding: 3,
  '@media (max-width: 600px)': {
      width: '90%',
      p: 2,
  }
};

const AddPathComponent = () => {

  const navigate = useNavigate();
  const {checkSubscription, setCheckSubscription} = useUser();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleNavigate = () => {
  //   navigate('/documents-upload');
  // };

  const {data, setData, errors, post} = useFire({title:'', prompt:''});

  const handleInput= (e) => {
    const {name, value} = e.target;
    setData(name, value);
  }

  const handleCreatePath = (e) => {
      e.preventDefault();
      post({
        url:`${baseURL}/create-path`,
        onSuccess : (res) => {
          console.log(res);
          Snackbar(res.data.message, {variant: 'success'})
          handleClose();
        },

        onError: (err) => {
          console.log(err);
          Snackbar(err.message, {variant: 'error'})
        }
      })
  };

  useEffect(() => {
    if(checkSubscription === false){
      navigate('/documents-upload');

    } else {setCheckSubscription(true);}
  }, []);

  return (
    <>
      <Loading />
      <PrimaryBtn text={"Add Path"} icon={<FiPlus />} onClick={handleOpen} />
      {/* <PremiumModel open={open} handleClose={handleClose} /> */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>

            <Typography id="transition-modal-title" variant="h6" component="h4" sx={{ fontWeight: "500", fontSize:'18px' }}>
              Add New Path
            </Typography>
            <IoMdClose
              onClick={handleClose}
              style={{ float: "right", cursor: "pointer", fontSize: "20px", marginTop: "-25px" }} />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent:'center',
              width: "100%",
            }}>

              <Box sx={{ width: "100%", padding: "20px", marginTop: "10px" }}>
                <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "14px" }}>
                  Title</p>
                <input 
                  type="text"
                  placeholder='Enter Title'
                  name="title"
                  value={data.title}
                  onChange={handleInput}
                  style={{ width: "100%", marginTop: "5px", backgroundColor: "#F5F6FA", border: "#D5D5D5", outline: "none", padding: "12px 10px", borderRadius: "5px" }} />
              </Box>

              <Box sx={{ width: "100%", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ width: "100%", }}>
                  <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "14px" }}>
                    Description</p>
                  <input 
                  type="text"
                    placeholder='Enter your description'
                    name="prompt"
                    value={data.prompt}
                    onChange={handleInput}
                    style={{ width: "100%", marginTop: "5px", backgroundColor: "#F5F6FA", border: "#D5D5D5", outline: "none", padding: "12px 10px", borderRadius: "5px" }} />
                </Box>

              </Box>

              {/* <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", martinTop: "10px", width: "100%", padding: "15px 20px 0 20px" }}>
                <Box>
                  <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "14px" }}>
                    Skills:</p>
                </Box>

                <Box sx={{ flexWrap: "wrap", display: "flex", gap: "10px" }}>

                  <button className='skills-btn'>
                    Skill necessary
                    <IoMdClose />
                  </button>
                  <button className='skills-btn'>
                    Skill necessary
                    <IoMdClose />
                  </button>
                </Box>
              </Box> */}


              <Box sx={{ width: "100%", padding: "20px", marginTop: "10px" }}>
                <Button
                  onClick={handleCreatePath}
                  sx={{
                    width: "100%", backgroundColor: "#3749A6", textTransform: "capitalize",
                    '&:hover': {
                      backgroundColor: "#2e3a8c",
                    },
                  }} variant="contained">Add</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddPathComponent;
