import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./index.scss";
import { useUser } from "../../context/context";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Fire from "../../Fire/Fire";
import { baseURL } from "../../Fire/useFire";
import { Snackbar } from "../../Utils/SnackbarUtils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import PrimaryInput from "../../Components/PrimaryInput/index";
import PrimaryBtn from "../../Components/PrimaryBtn/index";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import { MdOutlineFileUpload } from "react-icons/md";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
  cursor: "pointer",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const Profile = () => {
  const { user, gettingProfileInfo } = useUser();
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [newUsername, setNewUsername] = useState(user?.data?.username);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async () => {
    console.log("upload picture ");
    if (!selectedFile) {
      setUploadMessage("Please select a file first");
      return;
    }
    const token = localStorage.getItem("user-visited-dashboard");
    if (!token) {
      console.log("User not authenticated");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        `${baseURL}/update-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUploadMessage(response.data.message);
      Snackbar(response.data.message, { variant: "success" });
      gettingProfileInfo();
    } catch (error) {
      setUploadMessage("Error uploading file");
      Snackbar(error.response.data.error, { variant: "error" });
    }
  };

  const handleUpdateUsername = (event) => {
    event.preventDefault();

    Fire.put({
      url: `${baseURL}/update-username`,
      data: { newUsername },
      onSuccess: (res) => {
        Snackbar(res.data.message || "Username updated successfully", {
          variant: "success",
        });
        gettingProfileInfo();
      },
      onError: (err) => {
        Snackbar(err.error || "Failed to update username", {
          variant: "error",
        });
      },
    });

    handleClose();
  };

  return (
    <React.Fragment>
      <div className="profile-details">
        <div>
          <h2 style={{ color: "white" }}>Your Profile Details</h2>
          <p style={{ color: "white", marginBottom: "20px" }}>
            Hi {user?.data?.username}, Welcome to your profile settings
          </p>
        </div>

        <div className="details-box">
          <div className="image-box">
            <div>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <label htmlFor="upload-avatar">
                    <SmallAvatar
                      alt="Upload"
                      sx={{
                        backgroundColor: "var(--primary-btn-color)",
                      }}
                    >
                      <MdOutlineFileUpload />
                    </SmallAvatar>
                    <input
                      id="upload-avatar"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                }
              >
                <Avatar
                  alt={user?.data?.username}
                  src={user?.data?.profile_picture}
                  style={{ width: "70px", height: "70px" }}
                />
              </Badge>
            </div>

            <div>
              <h3>{user?.data?.username}</h3>
              <p>Your profile details.</p>
              <Button
                variant="contained"
                sx={{
                  height: "24px",
                  width: "auto",
                  fontSize: "12px",
                  padding: "8px",
                  textTransform: "capitalize",
                  backgroundColor: "var(--primary-btn-color)",
                }}
                onClick={handleOpen}
              >
                Update Username
              </Button>
            </div>
          </div>

          <h3 style={{ marginBottom: "5px" }}>Profile Information:</h3>
          <p style={{ marginBottom: "15px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit,
            asperiores.
          </p>
          <div className="info-box">
            <h4>Email:</h4>
            <p>{user?.data?.email}</p>
          </div>

          <div className="info-box">
            <h4>Username:</h4>
            <p>{user?.data?.username}</p>
          </div>

          <hr />
          <div
            style={{
              width: "50%",
              marginTop: "40px",
              margin: "0 auto",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ChangePassword />
          </div>
        </div>
      </div>

      {/* modal for update username */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleUpdateUsername}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h3">
                Update Username:
              </Typography>
              <div style={{ width: "100%", marginBottom: "10px" }}>
                <PrimaryInput
                  type="text"
                  value={newUsername}
                  placeholder={user?.data?.username}
                  onChange={handleUsernameChange}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <PrimaryBtn text={"Cancel"} onClick={handleClose} />
                <PrimaryBtn text={"Update"} type="submit" />
              </div>
            </Box>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Profile;
