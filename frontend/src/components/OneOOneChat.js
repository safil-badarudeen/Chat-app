import {
  alpha,
  Box,
  Button,
  FormControl,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppState } from "../Context/AppProvider";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import SnackBar from "./genericCompo/SnackBar";
import io from "socket.io-client";

const ENDPOINT = "https://chatapp-8dgp.onrender.com";
var socket = io(ENDPOINT);
var selectedChatCompare;
console.log(socket, "socket from client>>>>>>>>>");

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

function OneOOneChat() {
  const { setSelectedChat, selectedChat } = AppState(); // user,
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  console.log(newMessage, "newMessage");

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [snackOpen, setSnackOpen] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(data, "messages");
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
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

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data, "data from 1-o-1");

        socket.emit("new message", data);
        setMessages([...messages, data]);
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
    }
  };

  const typeNewMessage = ({ target }) => setNewMessage(target.value);

  useEffect(() => {
    if (user) {
      // socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connection", () => setSocketConnected(true));
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recived", (msgRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== msgRecieved.chat._id
      ) {
        //we can notify user
      } else {
        setMessages([...messages, msgRecieved]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Box sx={{ height: "100%", overflow: "hidden" }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column-reverse",
                overflowY: "scroll",
                MsOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {messages.map((msg) =>
                msg.sender._id === user._id ? (
                  <Box
                    sx={{
                      p: "4px 8px",
                      background: "#a9d6e5",
                      width: "fit-content",
                      borderRadius: "8px",
                      m: "4px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontSize: "14px",
                        color: "#012a4a",
                      }}
                    >
                      {msg.content}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      p: "4px 8px",
                      background: "#a9d6e5",
                      width: "fit-content",
                      borderRadius: "8px",
                      m: "4px",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontSize: "14px",
                        color: "#012a4a",
                      }}
                    >
                      {msg.content}
                    </Typography>
                  </Box>
                )
              )}
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#f5f5f5" }}>
            Select user to start chat
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          p: "8px 16px",
          borderRadius: "4px",
          background: "#2a6f97",
        }}
      >
        <FormControl
          variant="standard"
          sx={{ width: "100%" }}
          onKeyDown={selectedChat ? sendMessage : null}
          required
        >
          <MessageInput
            id="bootstrap-input"
            placeholder="Type message"
            onChange={typeNewMessage}
            value={newMessage}
          />
        </FormControl>
        <Button
          disabled={selectedChat ? false : true}
          onClick={sendMessage}
          size="small"
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </>
  );
}

export default OneOOneChat;
