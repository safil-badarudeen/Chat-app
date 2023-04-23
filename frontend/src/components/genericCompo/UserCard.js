import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function UserCard({ user, handleFunction }) {
  console.log(user, "user from user card");
  return (
    <Box
      onClick={handleFunction}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "8px",
        m: "8px 0",
        background: "#013a63",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          color: "#f5f5f5",
        }}
      >
        <Avatar alt={user.name} src={user.pic} />
        <Box>
          <Typography sx={{ color: "#f5f5f5" }}>{user.name}</Typography>
          {/* <Typography sx={{ color: "#f5f5f5" }}>How are you DK?</Typography> */}
        </Box>
      </Box>
      <Box>
        <Typography sx={{ color: "#f5f5f5" }}>today</Typography>
      </Box>
    </Box>
  );
}

export default UserCard;
