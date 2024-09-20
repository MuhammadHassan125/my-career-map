import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { FcCancel } from "react-icons/fc";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  border:'none',
  outline:'none',
  p: 4,
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  textAlign:'center',
};

const UnAuthorizeModal = () => {
  const [open, setOpen] = useState(false); 
  // const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
    // navigate('/')
  }, [])
  const handleClose = () => {
    setOpen(false);
    clearError(); 
  };


  return (
    <Modal open={open} onClose={handleClose}>
    <Box sx={style}>
    <FcCancel style={{fontSize:'3.4rem'}}/>
      <Typography variant="h6" component="h2">
          401 Anthorization Error!
      </Typography>
      <Typography>
          You don't have permission to access this page
      </Typography>
      <Button onClick={handleClose} variant="contained" sx={{ mt: 2, backgroundColor:'red' }}>
        Close
      </Button>
    </Box>
  </Modal>
  );
};

export default UnAuthorizeModal;
