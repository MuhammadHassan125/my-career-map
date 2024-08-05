import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './index.scss';
import HeadingBtn from '../../../components/DashboardComponents/DataGrid/HeadingBtn';
import DataGrid from '../../../components/DashboardComponents/DataGrid/DataGrid';
import { MdOutlineClose } from "react-icons/md";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import { Button } from '@mui/material';
import { IoCheckmarkSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const columns = [
  { Header: "File Name", accessor: "Path" },
  { Header: "Date", accessor: "Date" },
  { Header: "Status", accessor: "Status" },
  { Header: "Skills", accessor: "Skills" },
  { Header: "", accessor: "Btn" },
];

const data = [
  {
    id: 1,
    Path: "designer-resume.pdf",
    Date: "12-09-2024",
    Skills: "4",
    Status: (
      <button style={{
        backgroundColor: '#00B69B', border: 'none', outline: 'none',
        color: 'white', borderRadius: '10px', padding: '3px 10px', cursor: "pointer"
      }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Scanned
      </button>
    ),
    Btn: (
      <p>Analyze Again</p>
    )
  },
  {
    id: 2,
    Path: "Sales Rep",
    Date: "12.09.2019 - 12.53 PM",
    Skills: "2",
    Status: (
      <button style={{
        backgroundColor: '#E8E8E8', border: 'none', outline: 'none',
        borderRadius: '10px', padding: '3px 10px', cursor: "pointer"
      }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Pending
      </button>),
    Btn: (
      <button
        style={{ backgroundColor: '#3749A6', border: 'none', outline: 'none', color: 'white', borderRadius: '5px', padding: '5px 10px', cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >Analyze Again</button>
    )
  },
];


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const UploadDocuments = () => {

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleSuccess = (value) => {
    setSuccess(value);
  };

  const handleClose = () => {
    setSuccess(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if(success) {
      setTimeout(() => {
        handleOpen();
      }, 2000);

      return () => handleCloseModal();
    }
  })
  
  const handleNavigate = () => {
    navigate('/dashboard')
  }
  return (
    <React.Fragment>
      <main className='documents-upload__section'>
        {success && (
          <div className='success__message'>
            <p>Resume file uploaded successfully!</p> 
            <MdOutlineClose 
              onClick={handleClose}
              style={{ cursor: 'pointer', fontSize: '18px' }}
            />
          </div>
        )}
        <div className='main__heading'>
          <h2>Upload Documents</h2>
          <HeadingBtn text={"Done"} onClick={handleNavigate}/>
        </div>
        <FileUpload onUploadSuccess={handleSuccess} />
        <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleCloseModal}
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
                            <IoMdClose 
                            onClick={handleCloseModal}
                            style={{float:"right", cursor:"pointer", fontSize:"20px", marginTop:"-20px"}}/>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}>
                                <Box 
                                sx={{
                                  padding:"18px 20px ",
                                  borderRadius:"50%",
                                  backgroundColor:"#ECF2FF",
                                  marginBottom:"10px",
                                  color:"#1E5EFF",
                                  fontWeight:"800",
                                  fontSize:"18px"
                                }}>
                                <IoCheckmarkSharp />
                                </Box>
                                <Typography id="transition-modal-title" variant="h5" component="h2" sx={{fontWeight:"600"}}>
                                Import Successfull
                                </Typography>
                                <Typography id="transition-modal-description" sx={{fontSize:"15px"}}>
                                Added 5 new skills to your path
                                    </Typography>

                                    <Button
                                    onClick={handleCloseModal}
                                    sx={{backgroundColor:"#3749A6", color:'white', fontSize:"12px", mt:2, padding:"8px 25px",
                                        '&:hover': {
                                                backgroundColor: "#2e3a8c", 
                                                },
                                    }}
                                    >Continue</Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
        <DataGrid columns={columns} data={data} heading={"Uploaded Documents"} dropdown={"October"} />
      </main>
    </React.Fragment>
  );
};

export default UploadDocuments;

const FileUpload = ({ onUploadSuccess }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the files
    console.log(acceptedFiles);
    onUploadSuccess(true);
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='file-upload__section' {...getRootProps()}>
      <input {...getInputProps()} />
      <img src='/images/upload.png' alt='upload' />
      <p>
        {isDragActive ?
          'Drop the files here...' :
          'Drop your document here to upload.'
        }
      </p>
    </div>
  );
};
