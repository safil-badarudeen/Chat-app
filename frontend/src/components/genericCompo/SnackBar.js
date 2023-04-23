import { Alert, Snackbar } from "@mui/material";
import React from "react";

function SnackBar({ open, handleClose, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={message.type}
        sx={{ width: "100%" }}
      >
        {message.title}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
