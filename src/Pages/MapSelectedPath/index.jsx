import React, { useState } from 'react'
import PrimaryBtn from '../../Components/PrimaryBtn'
import { BiExport } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import './index.scss'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  padding: 2,
  '@media (max-width: 600px)': {
    width: '90%',
    p: 2,
  }
};
const MapSelectedPath = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <main className='map-section'>
        {/* heading div  */}
        <div className='main__heading'>
          <div>
            <h2>Map Career Path</h2>
          </div>
          <div className='map-section__btn-div'>
            <p><strong>Sales Rep </strong>/ 19 Paths</p>
            <button className='map-section__btn'>
              <BiExport style={{ fontSize: "18px" }} />
              Export your Training PDF
            </button>
            <PrimaryBtn text={"Add Path"} onClick={handleOpen} />
          </div>
        </div>

        <div className='map-section__map-div'>
          <img src={"/images/Capture.PNG"} alt="map" />
        </div>

        <GPTComponent />

      </main>

      {/* se;ected path btn  modal  */}
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

            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ fontWeight: "600" }}>
              Add New Path
            </Typography>
            <IoMdClose
              onClick={handleClose}
              style={{ float: "right", cursor: "pointer", fontSize: "20px", marginTop: "-25px" }} />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: "100%",
            }}>

              <Box sx={{ width: "100%", padding: "20px", marginTop: "10px" }}>
                <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "14px" }}>
                  Title</p>
                <input type="text"
                  placeholder='Enter Title'
                  style={{ width: "100%", marginTop: "5px", backgroundColor: "#F5F6FA", border: "#D5D5D5", outline: "none", padding: "12px 10px", borderRadius: "5px" }} />
              </Box>

              <Box sx={{ width: "100%", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ width: "48%", }}>
                  <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "14px" }}>
                    Description</p>
                  <input type="text"
                    placeholder='Enter your last name'
                    style={{ width: "100%", marginTop: "5px", backgroundColor: "#F5F6FA", border: "#D5D5D5", outline: "none", padding: "12px 10px", borderRadius: "5px" }} />
                </Box>

                <Box sx={{ width: "48%", }}>
                  <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "14px" }}>
                    Role</p>
                  <input type="text"
                    placeholder='Enter your Role'
                    style={{ width: "100%", marginTop: "5px", backgroundColor: "#F5F6FA", border: "#D5D5D5", outline: "none", padding: "12px 10px", borderRadius: "5px" }} />
                </Box>

              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", martinTop: "10px", width: "100%", padding: "15px 20px 0 20px" }}>
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
              </Box>


              <Box sx={{ width: "100%", padding: "20px", marginTop: "10px" }}>
                <Button
                  onClick={handleClose}
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
    </React.Fragment>
  )
}

const GPTComponent = () => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };
  return (
    <main className='gpt-section'>
      {/* left sales executive  */}
      <div className='gpt-section__left'>
        <h5>Details</h5>
        <h2>Sales Executive</h2>
        <div className='gpt-section__skills-div'>
          <button>Skill necessary</button>
          <button>Skill necessary</button>
          <button>Skill necessary</button>
        </div>
        <div className='gpt-section__bottom-div'>
          <button onClick={() => navigate('/list-career-path')}>
            Get Started
          </button>
          <p><strong>Next Role:</strong>Sales Team Lead</p>
        </div>
      </div>



      {/* right  section  */}
      <div className={`gpt-section__right ${isMinimized ? 'minimized' : ''}`}>
        <div className='gpt-section__heading'>
          <div>
            {isMinimized ?
              <h4>See Description Details</h4>
              : null
            }

          </div>

          <div className='gpt-section__close' onClick={handleToggle}>
            {isMinimized ? <IoIosArrowDown style={{ fontSize: "20px" }} /> : <MdOutlineClose style={{ fontSize: "20px" }} />}
          </div>
        </div>

        {!isMinimized && (
          <div className='description-details'>
            <h4>Description Details</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Ligula venenatis in ipsum ut. Senectus imperdiet elementum libero aliquet. Egestas sit a lobortis tellus diam. Consectetur etiam pellentesque elit pulvinar sed proin faucibus. Adipiscing amet orci urna amet sem massa. Mauris vel nibh massa tincidunt lectus quam rhoncus. Magna ac mi risus dui sem ut non eu pharetra. Leo viverra morbi commodo sed. Purus at elit diam adipiscing. Nunc vel libero odio eleifend non at commodo. Consectetur etiam pellentesque elit pulvinar sed proin faucibus.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default MapSelectedPath