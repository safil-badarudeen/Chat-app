import { Box, Button, Drawer } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppState } from "../Context/AppProvider";
import SnackBar from "./genericCompo/SnackBar";
import UserCard from "./genericCompo/UserCard";

function SideDrawer({ drawerOpen, setDrawerOpen }) {
  const { user, setSelectedChat, chats, setChats } = AppState();
  const [users, setUsers] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");

  const fetchUser = async () => {
    const { data } = await axios.get("/api/user");
    console.log(data, "data from fetchUser ");
    setUsers(data);
  };

  /* Handlers */
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      console.log(data, "data after selecting user");

      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]);
      }
      setLoadingChat(false);

      console.log(data, "data from chat api");
    } catch (err) {
      <SnackBar
        message={{ type: "error", title: err.message }}
        open={open}
        handleClose={handleClose}
      />;
    }
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

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        p: "16px",
        background: "#012a4a",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      {users.map((user, idx) => (
        <UserCard
          key={idx}
          user={user}
          handleFunction={() => accessChat(user._id)}
        />
      ))}
    </Box>
  );

  return (
    <>
      <Drawer anchor={"left"} open={drawerOpen} onClose={toggleDrawer}>
        {list("left")}
      </Drawer>
    </>
  );
}

export default SideDrawer;
