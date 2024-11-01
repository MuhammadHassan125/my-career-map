import React, { useState, useEffect } from 'react';
import './index.scss';
import { TextField, InputAdornment } from '@mui/material';
import { MdOutlineClose } from "react-icons/md";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import { Button } from '@mui/material';
import { IoCheckmarkSharp } from "react-icons/io5";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BiSolidSend } from "react-icons/bi";
// import { Snackbar } from '../../Utils/SnackbarUtils';
import Fire from '../../Fire/Fire';
import useFire, { baseURL } from '../../Fire/useFire';
import FileUpload from './FileUpload';
import UploadDataGrid from './UploadDataGrid';
import { useUser } from '../../context/context';
import Loading from '../../Components/Loading';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Snackbar } from '../../Utils/SnackbarUtils';
import axios from 'axios';

const columns = [
  { Header: "Id", accessor: "id" },
  { Header: "Prompt", accessor: "prompt" },
  { Header: "File Path", accessor: "file" },
  { Header: "Skills", accessor: "total_skill_count" },
{
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <button style={{
        backgroundColor: value === 'analyzed' ? '#00B69B' : 'grey',
        border: 'none',
        outline: 'none',
        color: 'white',
        borderRadius: '10px',
        padding: '3px 10px',
        cursor: 'pointer',
      }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </button>
    )
  },  { Header: "", accessor: "Btn" },
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

const EditPath = () => {

  const { setLoading, setCheckSubscription} = useUser();
  const location = useLocation();
  const params = useParams();

  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('1');
  const [prompt, setPrompt] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [file, setFile] = useState(null);


  const navigate = useNavigate();
  const {data, setData, errors, post, put} = useFire(
    // {title:'', prompt:''}
    { title: location.state?.title || '',
  prompt: location.state?.prompt || ''}
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSuccess = (value) => {
    setSuccess(value);
  };

  const handleClose = () => {
    setSuccess(false);
  };

  const checkSubscription = () => {
    setLoading(true);
    Fire.get({
      url: `${baseURL}/check-user-subscription`,

      onSuccess: (res) => {
        setLoading(false);
        data();
        getUploadDataList();
        if (res?.data?.Subscription_Status === false) {
          navigate(-1, { state: setCheckSubscription(true)  });
        }return;

      },

      onError: (err) => {
        console.log(err)
        setLoading(false);
      }
    })
  };

  const handleFileChange = (e) => {
        setFile(e.target.files[0] );
    };

    const handleFileUpdate = async () => {
        const token = localStorage.getItem('user-visited-dashboard');
        if (!file) return alert('Please select a file');
        if (!token) return alert('Please upload a token');

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', data.title); 
            try {
                setLoading(true);
                const response = await axios.put(`${baseURL}/update-path/${params.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                });
                Snackbar(`File upload complete! ID: ${response.data.message}`, {variant: 'success',  style: { backgroundColor:'var(--primary-btn-color)' }});
                handleSuccess();
                setFile(null); 
                // data();
                setLoading(false);
                // getUploadDataList();
            } catch (error) {
                Snackbar(`Error uploading file: ${error.error || error.message}`, {variant: 'error'});
                setLoading(false);
            }
        }
    };

  //   useEffect(() => {
  //     if (file) {
  //         handleFileUpload();
  //     }
  // }, [file]);
  
  const handleInput= (e) => {
    const {name, value} = e.target;
    setData(name, value);
  }
  const handleUpdatePathWithPrompt = (e) => {
    e.preventDefault();
    put({
      url:`${baseURL}/update-path/${params.id}`,
      onSuccess : (res) => {
        console.log(res);
        Snackbar(res.data.message, {variant: 'success'})
        setData({ title: '', prompt: '' });
        // setData((prevState) => ({ ...prevState, title: location.state?.title || '', prompt: '' }));
        navigate('/path')
        handleClose();
      },

      onError: (err) => {
        console.log(err);
        Snackbar(err.message, {variant: 'error'})
      }
    })
};


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
    checkSubscription();
  }, [success]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        handleOpen();
      }, 2000);

      return () => handleCloseModal();
    }
  });

  useEffect(() => {
    if (location.state && location.state.prompt) {
      setPrompt(location.state.prompt || location.state.title);
    }
  }, [location.state.prompt]);

  return (
    <React.Fragment>
      <Loading/>
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
        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TextField id="standard-basic" label="Enter title" variant="standard"
          sx={{ width: '40%', height: '100%', position: 'relative', marginBottom:"30px", marginLeft:"25px" }}
          onChange={handleInput}
          name="title"
          value={data.title || location.state?.title}

          />
          <TabContext value={value}>
            <Box>

              <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ padding: '0 25px' }}>

                <Tab label="Add Path" value="1" sx={{ fontWeight: 700, fontFamily: "Nunito Sans, sans-serif" }} /> 
                <Tab label="Upload CV" value="2" sx={{ fontWeight: 700, fontFamily: "Nunito Sans, sans-serif" }} />

               </TabList> 
            </Box>

            <TabPanel value="1" sx={{position:"relative", mb:5}}>
              <TextField
                id="outlined-multiline-static"
                label="Enter Your Prompt"
                onChange={handleInput}
                name="prompt"
                // value={data.prompt}
                value={data.prompt || location.state?.prompt}
                multiline
                rows={6}
                defaultValue=""
                sx={{ width: '100%', height: '100%', position: 'relative' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <BiSolidSend                          
                      style={{ cursor: 'pointer', position: 'absolute', bottom: 8, right: 15, fontSize:'20px' }}
                      /> */}
                    </InputAdornment>
                  ),
                }}
              />
                <Button variant="contained"
                sx={{cursor:"pointer", 
                  position: 'absolute', 
                  bottom: -10,
                   right: 25, 
                   fontSize:'10px', 
                   padding:"3px 5px",
                   backgroundColor:'var(--primary-btn-color)',
                  }}
                onClick={handleUpdatePathWithPrompt}
                >Submit</Button>
            </TabPanel>

            <TabPanel value="2" sx={{position:"relative", mb:3}}>
              {/* <FileUpload onUploadSuccess={handleSuccess}/> */}
              <div className='file-upload__section' >
            <img src='/images/upload.png' alt='upload' />
            <label style={{
              padding:'5px 10px', 
              borderBottom: '1px solid #879aad', 
              cursor:'pointer', 
              color:'#3749A6'}}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                    
                />
                Click here to Browse.
            </label>
            {file && <p>{file.name}</p>} 
           
           
        </div> 
        <Button variant="contained"
                  sx={{
                    cursor: "pointer",
                    fontSize: '10px',
                    padding: "3px 5px",
                    position:"absolute",
                    bottom: 15,
                    right: 25, 
                    backgroundColor:'var(--primary-btn-color)',
                  }}
                  onClick={handleFileUpdate}
                >
                Submit
                </Button>
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
                      style={{ float: "right", cursor: "pointer", fontSize: "20px", marginTop: "-20px" }} />
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                      <Box
                        sx={{
                          padding: "18px 20px ",
                          borderRadius: "50%",
                          backgroundColor: "#ECF2FF",
                          marginBottom: "10px",
                          color: "#1E5EFF",
                          fontWeight: "800",
                          fontSize: "18px"
                        }}>
                        <IoCheckmarkSharp />
                      </Box>
                      <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ fontWeight: "600" }}>
                        Import Successfull
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ fontSize: "15px" }}>
                        Added 5 new skills to your path
                      </Typography>

                      <Button
                        onClick={handleCloseModal}
                        sx={{
                          backgroundColor: "#3749A6", color: 'white', fontSize: "12px", mt: 2, padding: "8px 25px",
                          '&:hover': {
                            backgroundColor: "#2e3a8c",
                          },
                        }}
                      >Continue</Button>
                    </Box>
                  </Box>
                </Fade>
              </Modal>
            </TabPanel>

          </TabContext>
        </Box>

        <UploadDataGrid columns={columns} heading={"Path Details"} dropdown={"October"} />

      </main>
    </React.Fragment>
  );
};

export default EditPath;

