import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import {Stack} from "@mui/material";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/material";

export default function Account() {
  const [companyName, setCompanyName] = useState("");
  const [abn, setABN] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState("");

  const [confirmationOpen, setConfirmationOpen] = React.useState(false);

  //open variables for alerts
  const [postCodeAlertOpen, setPostCodeAlertOpen] = useState(false);

  const postcodeRegex = new RegExp("^(0[289][0-9]{2})|([1-9][0-9]{3})");
  const postcodeLimitChar = 4;

  const suburbHandler = (event) => {
    setSuburb(event.target.value.toLowerCase());
  };

  const handlePostcodeChange = (event) => {
    if (event.target.value.toString().length <= postcodeLimitChar) {
      setPostcode(event.target.value);
      setState(postCodeToState(event.target.value));
    }
  };

  const handleAlert = (warning_type) => {
    if (warning_type == "postcode") {
      setPostCodeAlertOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPostCodeAlertOpen(false);
    setConfirmationOpen(false);
  };

  const handleConfirmOpen = () => {
    setConfirmationOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const instance = axios.create({
    withCredentials: true,
  });

  const fetchData = async () => {
    try {
      const response = await instance.get(
        "http://localhost:8080/api/service-providers"
      );

      setCompanyName(response.data.companyName);
      setABN(response.data.abn);
      setPhone(response.data.phoneNumber);
      setAddress(response.data.streetAddress);
      setCity(response.data.suburb.name);
      setPostcode(response.data.postCode);
      setState(response.data.suburb.state);


    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!postcodeRegex.test(postcode)) {
      handleAlert("postcode");
    } else {
      try {
        instance
          .put(`http://localhost:8080/api/customers`, {
            companyName: companyName,
            abn: abn,
            phoneNumber: phone,
            streetAddress: address,
            suburb: {
              name: city,
              state: state,
            },
            postCode: postcode,
          })
          .then((res) => {
            window.location.reload(true);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 750,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Update Account Information
        </Typography>

        <TextField
          autoComplete="given-name"
          name="companyName"
          onChange={(event) => setCompanyName(event.target.value)}
          value={companyName}
          required
          fullWidth
          id="companyName"
          label="First Name"
          autoFocus
        />
        <br />
        <TextField
          autoComplete="given-name"
          name="abn"
          onChange={(event) => setABN(event.target.value)}
          value={abn}
          required
          fullWidth
          id="abn"
          label="Last Name"
          autoFocus
        />
        <br />
        <TextField
          autoComplete="phone"
          name="phone"
          onChange={(event) => setPhone(event.target.value)}
          value={phone}
          required
          fullWidth
          id="phone"
          label="Phone"
          autoFocus
        />
        <br />
        <TextField
          autoComplete="address"
          name="address"
          onChange={(event) => setAddress(event.target.value)}
          value={address}
          required
          fullWidth
          id="address"
          label="Address"
          autoFocus
        />
        <br />
        <TextField
          autoComplete="city"
          name="city"
          onChange={(event) => setCity(event.target.value)}
          value={city}
          required
          fullWidth
          id="city"
          label="City"
          autoFocus
        />
        <br />
        <TextField
          autoComplete="postcode"
          name="postcode"
          onChange={(event) => handlePostcodeChange(event)}
          value={postcode}
          required
          fullWidth
          id="postcode"
          label="Postcode"
          autoFocus
        />
        <br />
        <TextField
          autoComplete="state"
          name="state"
          onChange={(event) => setState(event.target.value)}
          value={state}
          required
          fullWidth
          id="state"
          label="State"
          autoFocus
        />
        <br />
        <Button
          //type="submit"
          onClick={handleConfirmOpen}
          variant="contained"
          color="warning"
        >
          Update Account Details
        </Button>
        <br />
        <Button
          //type="submit"
          href="/Customer/Dashboard"
          variant="contained"
        >
          Back to Dashboard
        </Button>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={postCodeAlertOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Invalid Postcode, please try again
            </Alert>
          </Snackbar>
        </Stack>
        <Dialog
          open={confirmationOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmation of New Account Details"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check that the following details are correct:
            </DialogContentText>
            <br />
            <DialogContentText id="alert-dialog-description">
              Updated First Name: {companyName}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Updated Last Name: {abn}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Updated Phone Number: {phone}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Updated Address: {address}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Updated City: {city}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Updated Postcode: {postcode}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Updated State: {state}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Edit Details</Button>
            <Button onClick={handleSubmit} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
      </React.Fragment>
  );
}
