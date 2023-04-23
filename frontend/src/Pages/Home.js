import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect } from "react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [value, setValue] = React.useState("1");
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box sx={{ padding: "24px", width: "400px", height: "400px" }}>
        <Typography variant="h5">chatApp</Typography>
        <TabContext value={value}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-end",
                },
              }}
            >
              <Tab label="Signup" value="1" />
              <Tab label="Login" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <Signup setValue={setValue} />
          </TabPanel>
          <TabPanel value="2">
            <Login />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Home;
