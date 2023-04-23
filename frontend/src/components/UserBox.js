import {
  Avatar,
  Button,
  Fade,
  FormControl,
  Grid,
  Paper,
  Popper,
  Typography,
  alpha,
  styled,
  InputBase,
  Modal,
  Backdrop,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import HorizontalUserScroll from "./genericCompo/HorizontalUserScroll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useHistory } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { AppState } from "../Context/AppProvider";
import axios from "axios";
import SnackBar from "./genericCompo/SnackBar";
import { getSender } from "../config/ChatLogic";
import GroupChatModel from "./genericCompo/GroupChatModel";

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

function UserBox({ fetchAgain }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPoper, setOpenPoper] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { user, selectedChat, setSelectedChat, chats, setChats } = AppState();
  const [snackOpen, setSnackOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  console.log([loggedUser, selectedChat, chats, user], "logged user");
  const loguser = JSON.parse(localStorage.getItem("userInfo"));

  const fetchChats = async (user) => {
    try {
      console.log("chat fetch data UserBox strt try");
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      console.log(data, "chat fetch data UserBox end try");
    } catch (err) {
      <SnackBar
        message={{
          type: "error",
          title: err.message,
        }}
        open={snackOpen}
        handleClose={() => setSnackOpen(false)}
      />;
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  useEffect(() => {
    if (loggedUser) {
      console.log(loggedUser, "loggedUser from effecft");
      fetchChats(loggedUser);
    }
  }, [loggedUser]);

  /* Handlers */
  const handleOpen = () => setOpen(true);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <Grid
        item
        xs={5}
        sx={{
          borderRight: "2px solid #f5f5f5",
          pr: "16px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#2a6f97",
            p: "8px",
          }}
        >
          <Avatar alt="" src={loguser.pic} />
          <Button variant="contained" size="small" onClick={handleOpen}>
            new room
          </Button>
          <Button variant="contained" size="small" onClick={toggleDrawer}>
            1-o-1
          </Button>
          <MoreVertIcon
            onClick={handleMoreClick}
            style={{ color: "#f5f5f5" }}
          />
        </Paper>
        <Box
          className={"roomContainer"}
          sx={{
            background: "#a9d6e5",
            m: "8px 0px",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="subtitle2"
            textAlign="left"
            sx={{ color: "#013a63", p: "4px 16px" }}
          >
            rooms
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: "16px 8px",
              // gap: "8px",
            }}
          >
            {chats ? (
              <>
                {chats.map((chat) => (
                  <>
                    {chat.isGroupChat ? (
                      <IconButton size="small">
                        <Avatar
                          onClick={() => setSelectedChat(chat)}
                          alt={chat.chatName.toUpperCase()}
                          // src={user.pic}
                          src="#"
                          sx={{
                            width: "32px",
                            height: "32px",
                          }}
                        />
                      </IconButton>
                    ) : null}
                  </>
                ))}
              </>
            ) : null}
          </Box>
        </Box>
        <Box
          className={"usersContainer"}
          sx={{ color: "#f5f5f5", height: "70vh" }}
        >
          {chats
            ? chats.map((chat) => (
                <Box
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "8px",
                    m: "8px 0",
                    // borderBottom: "1px solid #f5f5f5",
                    // background: selectedChat ?"#1976d2":"#013a63" ,
                    background: "#013a63",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt={chat.isGroupChat ? chat.chatName.toUpperCase() : ""}
                      src="#"
                    />
                    <Box>
                      <Typography>
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Typography>
                      <Typography>How are you DK?</Typography>
                    </Box>
                  </Box>
                  <Box>today</Box>
                </Box>
              ))
            : null}
        </Box>
      </Grid>
      <GroupChatModel open={open} setOpen={setOpen} />
      <Popper
        open={openPoper}
        anchorEl={anchorEl}
        placement={"bottom"}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ p: "16px" }}>
              {/* display: "flex", flexDirection: "column" */}
              <Typography sx={{ color: "#012a4a" }}>new room</Typography>
              <Typography sx={{ color: "#012a4a" }} onClick={logoutHandler}>
                logout
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}

export default UserBox;
