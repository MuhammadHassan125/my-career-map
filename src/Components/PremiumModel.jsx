
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import { Button } from '@mui/material';
import { useState } from 'react';

const PremiumModel = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
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
                    <IoMdClose
                        onClick={handleClose}
                        style={{ float: "right", cursor: "pointer", fontSize: "20px", marginTop: "-20px" }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>

                        {/* <img src={"/images/modal-img.png"} alt="img" /> */}
                        <Box
                            component='img'
                            sx={{
                                height: 55,
                                width: 60,
                                margin: "10px 0"
                            }}
                            alt="The house from the offer."
                            src="/public/images/Vector.png"
                        />
                        <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ fontWeight: "600" }}>
                            Premium Feature
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            To add more paths you need a premium account subscription paying only <span style={{ color: "#3749A6", textDecoration: "underline" }}>£2.79 per month</span></Typography>
                        <Typography sx={{ color: "#5B708B", fontStyle: "italic", mt: 1 }}>
                            Must paid annually, cancel anytime.
                        </Typography>

                        <Button
                            onClick={handleClose}
                            sx={{
                                backgroundColor: "#3749A6", color: 'white', fontSize: "12px", mt: 2, padding: "8px 25px",
                                '&:hover': {
                                    backgroundColor: "#2e3a8c", // Slightly darker shade for hover effect
                                },
                            }}
                        >Continue</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default PremiumModel