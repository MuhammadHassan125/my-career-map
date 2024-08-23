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
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const PremiumModel = ({ open, handleClose }) => {

    const navigate = useNavigate();
    const handleNavigateCheckout =() => {
        navigate('/payment-checkout');
    }
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
                        <Box
                            component='img'
                            sx={{
                                height: 55,
                                width: 60,
                                margin: "10px 0"
                            }}
                            alt="Vector"
                            src="/images/Vector.png"
                        />
                        <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ fontWeight: "600" }}>
                            Premium Feature
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            To add more paths you need a premium account subscription paying only <span style={{ color: "#3749A6", textDecoration: "underline" }}>£2.79 per month</span>
                        </Typography>
                        <Typography sx={{ color: "#5B708B", fontStyle: "italic", mt: 1 }}>
                            Must pay annually, cancel anytime.
                        </Typography>
                        <Button
                            onClick={handleNavigateCheckout}
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
    );
};

export default PremiumModel;
