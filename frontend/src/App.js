import "./App.css";
import { Box, Button } from "@mui/material";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Chats from "./Pages/Chats";

function App() {
  return (
    <Box className="App">
      <Route path="/" component={Home} exact />
      <Route path="/chats" component={Chats} exact />
    </Box>
  );
}

export default App;
