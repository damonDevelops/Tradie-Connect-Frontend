//import statements for mui components
import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Autocomplete } from "@mui/material";
import PropTypes from "prop-types";
import validator from "validator";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import postCodeToState from "../functional_components/postcodeToState";
import axios from "axios";

//Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//default function for the customer sign up page
export default function CustomerSignUp() {
  //state variables for the alerts
  const [postCodeOpen, setPostCodeOpen] = React.useState(false);
  const [emailOpen, setEmailOpen] = React.useState(false);
  const [ABNOpen, setABNOpen] = React.useState(false);
  const [successfulSignUp, setSuccessfulSignUp] = React.useState(false);
  const [passwordOpen, setPasswordOpen] = React.useState(false);
  const [failedSignUp, setFailedSignUp] = React.useState(false);
  const [finalOpen, setFinalOpen] = React.useState(false);
  const [backdropOpen, setBackdropOpen] = React.useState(false);

  //state variable for the timer
  const timer = React.useRef();

  //function to handle the timer
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //function to handle the alerts
  const handleAlert = (warning_type) => {
    if (warning_type == "abn") {
      setABNOpen(true);
    } else if (warning_type == "email") {
      setEmailOpen(true);
    } else if (warning_type == "postcode") {
      setPostCodeOpen(true);
    } else if (warning_type == "successful") {
      setSuccessfulSignUp(true);
    } else if (warning_type == "password") {
      setPasswordOpen(true);
    } else if (warning_type == "failed") {
      setFailedSignUp(true);
    } else if (warning_type == "final") {
      setFinalOpen(true);
    }
  };

  //function to handle the backdrop redirect
  const redirect = () => {
    window.location.href = "../SignIn";
  };

  //function to close the alerts
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBackdropOpen(false);
    setABNOpen(false);
    setPostCodeOpen(false);
    setEmailOpen(false);
    setSuccessfulSignUp(false);
    setPasswordOpen(false);
    setFailedSignUp(false);
  };

  //state variables for the form
  const [returnMembership, setMembership] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [abn, setABN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [returnState, setState] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [returnTrade, setTradeType] = useState("");

  //regex for the postcode validation
  const postcodeRegex = new RegExp("^(0[289][0-9]{2})|([1-9][0-9]{3})");
  const abnRegex = new RegExp("^[0-9]{11}$");

  //limit the number of characters in the postcode field
  const postcodeLimitChar = 4;

  //function to handle the postcode change
  const handlePostcodeChange = (event) => {
    if (event.target.value.toString().length <= postcodeLimitChar) {
      setPostcode(event.target.value);
      setState(postCodeToState(event.target.value));
    }
  };

  // const to hold the state options
  const stateOptions = [
    { value: "NSW", label: "NSW" },
    { value: "VIC", label: "VIC" },
    { value: "QLD", label: "QLD" },
    { value: "WA", label: "WA" },
    { value: "SA", label: "SA" },
    { value: "TAS", label: "TAS" },
    { value: "NT", label: "NT" },
  ];

  //const to hold the membership options
  const membershipOptions = [
    { value: "Subscription", label: "Subscription" },
    { value: "Commission", label: "Commission" },
  ];

  //const to hold the trade options
  const serviceAreas = [
    { value: "TREE_REMOVAL", label: "Tree Removal" },
    { value: "ROOF_CLEANING", label: "Roof Cleaning" },
    { value: "FENCE_INSTALLATION", label: "Fence Installation" },
    { value: "OVEN_REPAIRS", label: "Oven Repair" },
    { value: "POOL_CLEANING", label: "Pool Cleaning" },
  ];

  //function to handle the form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission (reload)
    event.preventDefault();

    // data validation checks for alert popups
    if (!abnRegex.test(event.target.abn.value)) {
      handleAlert("abn");
    } else if (validator.isEmail(event.target.email.value) == false) {
      handleAlert("email");
    } else if (!postcodeRegex.test(event.target.postcode.value)) {
      handleAlert("postcode");
    } else if (
      event.target.password.value != event.target.confirmPassword.value
    ) {
      handleAlert("password");
    } else {
      event.preventDefault();

      // Get data from the form.
      const returnData = {
        companyName: event.target.companyName.value,
        email: event.target.email.value,
        password: event.target.password.value,
        phoneNumber: phoneNumber.textmask,
        streetAddress: event.target.address.value,
        city: event.target.city.value,
        state: returnState,
        postcode: event.target.postcode.value,
        serviceArea: returnTrade,
        abn: event.target.abn.value,
        membership: {
          membershipType: "ACC_CREATED",
          description: returnMembership,
        },
      };

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(returnData);

      // API endpoint where we send form data.
      const endpoint = `http://localhost:8080/api/auth/SignUp`;

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      };

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);

      // If the response is good, show the success message,
      //A loading symbol will go for 5 seconds (can be reduced)
      //and then the user will be redirected to the sign in page
      if (response.status == 200) {
        setBackdropOpen(true);
        timer.current = window.setTimeout(() => {
          setBackdropOpen(false);
          handleAlert("final");
        }, 3000);

        // Redirect to the sign in page
      } else {
        handleAlert("error");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email) == false) {
      handleAlert("email");
    } else if (!postcodeRegex.test(postcode)) {
      handleAlert("postcode");
    } else if (password != confirmPassword) {
      handleAlert("password");
    } else {
      e.preventDefault();

      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/SignUp",
          {
            email: email,
            password: password,
            role: "ROLE_SERVICE_PROVIDER",
            companyName: companyName,
            abn: abn,
            phoneNumber: newPhoneNumber,
            streetAddress: address,
            suburb: {
              name: city,
              state: returnState,
            },
            postCode: postcode,
          }
        );
        setBackdropOpen(true);
        timer.current = window.setTimeout(() => {
          setBackdropOpen(false);
          handleAlert("final");
        }, 3000);
        console.log(response);
      } catch (error) {
        alert("Registration failed!");
        console.log(error);
      }
    }
  };

  //not going to leave any comments on the implementation of components, you can google
  //material ui components to see how they work or go to the documentation
  //main premise is a grid with form items, a snackbar full of different alert types
  //and a backdrop for the loading symbol
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            disablePortal
            id="combo-box-demo"
            onInputChange={(event, newMembership) => {
              setMembership(newMembership);
            }}
            options={membershipOptions}
            renderInput={(params) => (
              <TextField required {...params} label="Membership Type" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            disablePortal
            id="combo-box-demo"
            onInputChange={(event, newTrade) => {
              setTradeType(newTrade);
            }}
            options={serviceAreas}
            renderInput={(params) => (
              <TextField required {...params} label="Service Area " />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            name="companyName"
            onChange={(event) => setCompanyName(event.target.value)}
            value={companyName}
            required
            fullWidth
            id="companyName"
            label="Company  Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type={"number"}
            fullWidth
            id="abn"
            helperText="Eleven Digit"
            label="ABN"
            name="abn"
            onChange={(event) => setABN(event.target.value)}
            value={abn}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={7.5}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={4.5}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phone"
            onChange={(event) => setNewPhoneNumber(event.target.value)}
            value={newPhoneNumber}
            autoComplete="phone"
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
            autoComplete="address"
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            required
            fullWidth
            id="city"
            label="City"
            name="address-level2"
            onChange={(event) => setCity(event.target.value)}
            value={city}
            autoComplete="address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type={"number"}
            inputProps={{ maxLength: 4 }}
            fullWidth
            id="postcode"
            label="Postcode"
            name="postal-code"
            onChange={(event) => handlePostcodeChange(event)}
            value={postcode}
            autoComplete="postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="state"
            label="State"
            name="state"
            onChange={(event) => setState(event.target.value)}
            value={returnState}
            autoComplete="address-level1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
            label="Re-enter your password"
            type="password"
            id="confirmPassword"
            autoComplete="confirmPassword"
          />
        </Grid>
        <Grid item>
          <Button
            //type="submit"
            onClick={handleRegister}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Grid>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={emailOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Invalid Email Address, please try again
            </Alert>
          </Snackbar>
          <Snackbar
            open={postCodeOpen}
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
          <Snackbar
            open={ABNOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Invalid ABN Format, please try again
            </Alert>
          </Snackbar>
          <Snackbar
            open={passwordOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Passwords do not match, please try again.
            </Alert>
          </Snackbar>
          <Snackbar
            open={successfulSignUp}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Sign Up Successful! Redirecting to Sign In Page.
            </Alert>
          </Snackbar>
          <Snackbar
            open={failedSignUp}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              A network error has occurred, please try again later.
            </Alert>
          </Snackbar>
        </Stack>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/SignIn" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={finalOpen}
        onClose={handleClose}
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
          {" Success!"} <TaskAltIcon />
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
            Your account was successfully created, you will be redirected to the
            sign in page now where you can enter your details to log in. Thanks
            for joining us {companyName}!
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
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
