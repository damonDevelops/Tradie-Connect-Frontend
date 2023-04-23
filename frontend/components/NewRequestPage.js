import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { Divider } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const theme = createTheme();

export default function NewRequest() {
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
  const [cost, setCost] = React.useState(0);

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
          .post(`http://localhost:8080/api/service-requests/create`, {
            // serviceType: WorkType.toUpperCase(),
            // //scheduledStartDate: startDate.replaceAll("/", "-"),
            // //scheduledEndDate: endDate.replaceAll("/", "-"),
            // scheduledStartDate: [2023, 11, 20],
            // scheduledEndDate: [2023, 11, 20],
            // cost: 10000.00,
            // description: description,

            serviceType: "POOL_CLEANING",
            requestedDate: [2023, 4, 22],
            requestedTime: [16, 54, 14, 240405300],
            scheduledStartDate: [2023, 11, 20],
            scheduledStartTime: [9, 0],
            scheduledEndDate: [2023, 11, 22],
            scheduledEndTime: [17, 0],
            status: "CREATED",
            cost: 10000.0,
            description: "Poo poo",
          })
          .then((res) => {
            setFinalOpen(true);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            <InputLabel id="demo-simple-select-label">Work Type</InputLabel>
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
              <MenuItem value="FENCE_INSTALLATION">Fence Installation</MenuItem>
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
          <br />
          <br />
          <Button color="success" fullWidth type="submit" variant="contained">
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
              You have successfully created a service request! The job has been
              broadcasted to Service Providers in your area who will apply for
              the job shortly. After this you can approve a particular service
              provider and they'll get right to work! To see the progress of
              this service request, visit the Current Requests tabs on the
              siderbar or view them from the dashboard menu.
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
    </ThemeProvider>
  );
}
