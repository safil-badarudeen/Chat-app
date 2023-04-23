import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

function HorizontalUserScroll({ handleFunction, users }) {
  const [active, setActive] = useState(false);
  console.log(users, "HorizontalUserScroll");
  return (
    <Box
      className={"roomContainer"}
      sx={{
        background: "#a9d6e5",
        m: "8px 0px",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: "16px 8px",
          // gap: "8px",
        }}
      >
        {users.map((user) => (
          <IconButton
            sx={{}}
            size="small"
            onClick={() => {
              handleFunction(user);
              setActive(true);
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={user.pic}
              sx={{
                width: "32px",
                height: "32px",
              }}
            />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}

export default HorizontalUserScroll;
