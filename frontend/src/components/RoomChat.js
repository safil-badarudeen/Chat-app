import { Box, Typography } from "@mui/material";
import React from "react";
import { AppState } from "../Context/AppProvider";

function RoomChat() {
  const { user, setSelectedChat, selectedChat } = AppState();

  return (
    <>
      {selectedChat ? (
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
                sending....
              </Typography>
            </Box>
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
                reciving....
              </Typography>
            </Box>
          </Box>
        </Box>
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
    </>
  );
}

export default RoomChat;
