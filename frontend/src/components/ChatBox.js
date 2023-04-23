import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import OneOOneChat from "./OneOOneChat";
import { AppState } from "../Context/AppProvider";

function ChatBox({ setFetchAgain, fetchAgain }) {
  const { user, setSelectedChat, selectedChat } = AppState();

  let users = [];

  if (selectedChat) {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    users = selectedChat.users.filter((u) => u._id !== user._id);
  }

  return (
    <Grid
      item
      xs={7}
      sx={{
        pl: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#2a6f97",
            p: "8px",
            height: !users.length ? "56px" : "auto",
            boxSizing: "border-box",
          }}
        >
          {users.length ? (
            <>
              {users.map((user) => (
                <Avatar
                  alt="Remy Sharp"
                  src={user.pic}
                  sx={{
                    marginRight: "-15px",
                    boxShadow: "2px 2px 4px #012a4a",
                    border: "1px solid #012a4a",
                  }}
                  size="small"
                />
              ))}
            </>
          ) : (
            <Typography variant="h6" sx={{ color: "#f5f5f5" }}>
              chatapp
            </Typography>
          )}
        </Paper>
      </Box>

      {/* {selectedChat && setSelectedChat.isGroupChat ? (
        <RoomChat setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
      ) : (
        <OneOOneChat setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
      )} */}
      <OneOOneChat setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
    </Grid>
  );
}

export default ChatBox;
