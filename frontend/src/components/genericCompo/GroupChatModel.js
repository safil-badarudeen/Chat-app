import {
  alpha,
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputBase,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppState } from "../../Context/AppProvider";
import HorizontalUserScroll from "./HorizontalUserScroll";
import SnackBar from "./SnackBar";

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
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
  background: "#012a4a",
};

function GroupChatModel({ setOpen, open }) {
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const { user, setSelectedChat, chats, setChats } = AppState();

  const fetchUser = async () => {
    const { data } = await axios.get("/api/user");

    console.log(data, "data from fetchUser ");
    setUsers(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log([roomName, selectedUsers, users], "GroupChatModel");

  /* Handlers */
  const handleClose = () => setOpen(false);
  const handleSnackClose = () => setSnackOpen(false);
  const handleRoomName = ({ target }) => setRoomName(target.value);

  const handleAddedInRoom = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      <SnackBar
        message={{ type: "warning", title: "user already added" }}
        open={snackOpen}
        handleClose={handleClose}
      />;
      return;
    }
    setSelectedUsers((prev) => [...prev, userToAdd]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomName || !selectedUsers) {
      <SnackBar
        message={{ type: "warning", title: "All field required" }}
        open={snackOpen}
        handleClose={handleClose}
      />;
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/room",
        {
          name: roomName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setOpen(false);
    } catch (err) {
      <SnackBar
        message={{ type: "error", title: err.message }}
        open={snackOpen}
        handleClose={handleClose}
      />;
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: "16px", color: "#f5f5f5" }}
          >
            new room
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <MessageInput
                id="bootstrap-input"
                placeholder="room name"
                onChange={handleRoomName}
                value={roomName}
              />
            </FormControl>
            <HorizontalUserScroll
              //   user={user}
              handleFunction={handleAddedInRoom}
              users={users}
            />
            <Button variant="contained" sx={{ mt: "16px" }} type="submit">
              create
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

export default GroupChatModel;
