import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SnackBar from "../genericCompo/SnackBar";

function Signup({ setValue }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    type: "success",
  });

  const history = useHistory();

  console.log([name, email, password], "signup state");

  /* Handlers */
  const handleName = ({ target }) => setName(target.value);
  const handleEmail = ({ target }) => setEmail(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);
  const handleConfirmPassword = ({ target }) =>
    setConfirmPassword(target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      setOpen(true);
      setMessage({ title: "All field are required!!", type: "warning" });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setOpen(true);
      setMessage({ title: "Pssword does not match", type: "warning" });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
        },
        config
      );

      setOpen(true);
      setMessage({ title: "You are registered!!!", type: "success" });

      // localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push("/chats");
      setValue("2");
    } catch (err) {
      setOpen(true);
      setMessage({ title: "Somthing went wrong!!!", type: "error" });
      setLoading(false);
      console.log(err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //  const handleClick = () => {
  //    setOpen(true);
  //  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Box>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          // required
          fullWidth
          onChange={handleName}
        />
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          // required
          fullWidth
          onChange={handleEmail}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={handleConfirmPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        <Button variant="contained" fullWidth sx={{ mt: "16px" }} type="submit">
          Sign up
        </Button>
      </form>
      <SnackBar message={message} open={open} handleClose={handleClose} />
    </Box>
  );
}

export default Signup;
