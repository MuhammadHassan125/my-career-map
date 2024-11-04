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
};

const AddSkills = ({ open, handleClose, stepId, handleSubmit }) => {
  const [title, setTitle] = React.useState();
  const step_Id = stepId;

  const handAddSkills = () => {
    Fire.post({
      url: `${baseURL}/add-skill`,
      data: {
        title: title,
        step_id: step_Id,
      },
      onSuccess: (res) => {
        console.log(res);
        Snackbar(res?.data?.message, {
          variant: "success",
          style: { backgroundColor: "var(--primary-btn-color)" },
        });
        setTitle("");
        handleSubmit();
        handleClose();
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
              Add your skill
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
                  handAddSkills();
                }
              }}
            />

            <Button
              onClick={handAddSkills}
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

export default AddSkills;
