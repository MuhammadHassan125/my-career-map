import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { IoMdClose } from "react-icons/io";
import { Button, TextField } from "@mui/material";
import Fire from "../../Fire/Fire";
import { baseURL } from "../../Fire/useFire";
import { Snackbar } from "../../Utils/SnackbarUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline:'none'
};

const EditSkills = ({
  open,
  handleClose,
  skillId,
  skillTitle,
  handleSubmit,
}) => {
  const [title, setTitle] = React.useState(skillTitle || "");

  React.useEffect(() => {
    setTitle(skillTitle);
  }, [skillTitle]);
  const handEditSkills = () => {
    Fire.post({
      url: `${baseURL}/update-skill/${skillId}`,
      data: {
        title: title,
      },
      onSuccess: (res) => {
        console.log(res);
        Snackbar(res?.data?.message, {
          variant: "success",
          style: { backgroundColor: "var(--primary-btn-color)" },
        });
        setTitle("");
        handleClose();
        handleSubmit();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

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
            style={{
              float: "right",
              cursor: "pointer",
              fontSize: "20px",
              marginTop: "-20px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography id="transition-modal-title" variant="h4" component="h2">
              Edit your skills title
            </Typography>

            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              sx={{
                height: 40,
                width: "100%",
                mb: 4,
                mt: 3,
              }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  handEditSkills();
                }
              }}
            />

            <Button
              onClick={handEditSkills}
              sx={{
                backgroundColor: "var(--primary-btn-color)",
                color: "white",
                fontSize: "12px",
                mt: 2,
                padding: "8px 25px",
                width: "100%",
                "&:hover": {
                  opacity: 5,
                },
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditSkills;
