import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  alpha,
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Modal,
  Paper,
  Popper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { AppState } from "../Context/AppProvider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HorizontalUserScroll from "../components/genericCompo/HorizontalUserScroll";
import SendIcon from "@mui/icons-material/Send";
import UserBox from "../components/UserBox";
import ChatBox from "../components/ChatBox";
// import styled from "@emotion/styled";

const MessageInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

const Chats = () => {
  const { user } = AppState();
  console.log(user, "user from app context");
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPoper, setOpenPoper] = React.useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  /* Handlers */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  };

  return (
    <>
      <Grid
        container
        sx={{ p: "20px", background: "#012a4a", height: "100vh" }}
      >
        <UserBox fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Grid>
    </>
  );
};

export default Chats;
