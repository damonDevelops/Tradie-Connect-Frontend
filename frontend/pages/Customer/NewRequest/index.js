// import statements
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function DashboardContent() {
  const redirect = () => {
    window.location.href = "../Customer/Dashboard";
  };

  const instance = axios.create({
    withCredentials: true,
  });


  var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  var token = Cookies.get("JWT");
  
  const [firstName, setFirstName] = React.useState("");

  const [WorkType, setWorkType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cost, setCost] = React.useState("");
  
  const [startDate, setStartDate] = React.useState(
    new Date().toLocaleDateString("en-GB")
  );
  //make a const variable which returns the day after startDate in the same format
  const [endDate, setEndDate] = React.useState(
    new Date().toLocaleDateString("en-GB")
  );

  const [finalAlertDialogOpen, setFinalOpen] = React.useState(false);

  const handleChange = (event) => {
    setWorkType(event.target.value);
  };

  const [checked, setChecked] = React.useState(true);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [newOpen, setnewOpen] = React.useState(true);

  const handleClick = () => {
    setnewOpen(!newOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //TODO take the token and get the customer subscription type and then display cost
    // console.log(token);
    // console.log(jwt_decode(token).role)

    //validation for start and end date
    if (!date_regex.test(startDate) || !date_regex.test(endDate)) {
      alert("invalid date");
    } else if (startDate > endDate || startDate == endDate) {
      alert("Start Date cannot be after or the same as End Date");
    } else {


      try {
        //post request
        instance
          .post(
            `http://localhost:8080/api/service-requests/create/${WorkType.toUpperCase()}`,
            {
              serviceType: WorkType.toUpperCase(),
              description: description,
              scheduledStartDate: startDate,
              scheduledEndDate: endDate,
              cost: cost,
            }
          )
          .then((res) => {
            setFinalOpen(true);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Link href="/Customer/account" color="inherit">
                {<AccountCircleRoundedIcon fontSize="large" />}
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Requests" />
                {newOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={newOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} href="./NewRequest">
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="New Request" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={newOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Current Requests" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={newOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Past Requests" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Account Details" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListSubheader component="div" inset>
                Saved reports
              </ListSubheader>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 700,
                  }}
                >
                  <form onSubmit={handleSubmit}>
                  <Typography variant="h4" gutterBottom>
                    New Request
                  </Typography>
                  
                    <Divider />
                    <Typography sx={{ mt: 2 }} variant="h5" gutterBottom>
                      Request Details
                    </Typography>
                    <FormControl sx={{ width: "40%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Work Type
                      </InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={WorkType}
                        label="Work Type"
                        onChange={handleChange}
                      >
                        <MenuItem value="TREE_REMOVAL">Tree Removal</MenuItem>
                        <MenuItem value="ROOF_CLEANING">Roof Cleaning</MenuItem>
                        <MenuItem value="FENCE_INSTALLATION">
                          Fence Installation
                        </MenuItem>
                        <MenuItem value="OVEN_REPAIRS">Oven Repair</MenuItem>
                        <MenuItem value="POOL_CLEANING">Pool Cleaning</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <Typography sx={{ mt: 2 }} variant="h6" gutterBottom>
                      Work Description
                    </Typography>
                    <TextField
                      fullWidth
                      id="outlined-m<form onSubmit={handleSubmit}>ultiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      defaultValue="Insert any relevant information about the job here"
                    />
                    <TextField
                      sx={{ width: "30%" }}
                      margin="normal"
                      required
                      id="outlined-required"
                      label="Start Date"
                      name="date"
                      onChange={(event) => setStartDate(event.target.value)}
                      value={startDate}
                      InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                      sx={{ width: "30%" }}
                      margin="normal"
                      required
                      id="outlined-required"
                      label="End Date"
                      name="date"
                      onChange={(event) => setEndDate(event.target.value)}
                      value={endDate}
                      InputLabelProps={{ shrink: true }}
                    />
                    <br /><br />
                    <Button
                      color="success"
                      fullWidth
                      type="submit"
                      variant="contained"
                    >
                      Submit New Work Request
                    </Button>
                    <br />
                    <br />
                    <Button
                      color="primary"
                      fullWidth
                      onclick={redirect}
                      variant="contained"
                    >
                      Back to Dashboard
                    </Button>
                  </form>
                  <Dialog
                    open={finalAlertDialogOpen}
                    //onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      style={{
                        backgroundColor: "#4caf50",
                        color: "white",
                      }}
                      id="alert-dialog-title"
                    >
                      {"Success!"} <TaskAltIcon />
                    </DialogTitle>
                    <DialogContent
                      style={{
                        backgroundColor: "#4caf50",
                      }}
                    >
                      <DialogContentText
                        style={{
                          backgroundColor: "#4caf50",
                          color: "white",
                        }}
                        id="alert-dialog-description"
                      >
                        You have successfully created a service request! The job has been broadcasted to Service
                        Providers in your area who will apply for the job
                        shortly. After this you can approve a particular service
                        provider and they'll get right to work! To see the
                        progress of this service request, visit the Current
                        Requests tabs on the siderbar or view them from the
                        dashboard menu.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions
                      style={{
                        backgroundColor: "#4caf50",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#4caf50",
                          color: "white",
                        }}
                        onClick={redirect}
                        autoFocus
                      >
                        Back to Dashboard
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
