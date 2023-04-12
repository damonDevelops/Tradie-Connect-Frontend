//import statements
import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Autocomplete } from "@mui/material";
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
import postCodeToState from "./postcodeToState";
import axios from "axios";

{
  /*
  BUG: when reloading the page, sometimes react will throw the following error:
   "SyntaxError: Unexpected token 'export'"
   I've looked into this extensively and it seems to be a bug with Next.js and React.
   The only way to fix this is to comment the below imports out, save and reload the page.
   Then uncomment and reload the page again, should work fine.
   If I have time I'll come back and change the packages being used.
*/
}
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//default function for the customer sign up page
export default function CustomerSignUp() {
  //state variables for the alerts
  const [postCodeAlertOpen, setPostCodeOpen] = React.useState(false);
  const [emailAlertOpen, setEmailOpen] = React.useState(false);
  const [successfulSignUpDialogOpen, setSuccessfulSignUp] =
    React.useState(false);
  const [passwordAlertOpen, setPasswordOpen] = React.useState(false);
  const [failedSignUpOpen, setFailedSignUp] = React.useState(false);
  const [finalAlertDialogOpen, setFinalOpen] = React.useState(false);

  const timer = React.useRef();
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [paymentDialogOpen, setPaymentOpen] = React.useState(false);

  //Card Information
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardName, setCardName] = React.useState("");

  const [expiryDate, setExpiryDate] = React.useState("");
  //const [expiryDate, setExpiryDate] = React.useState(dayjs());
  const [cvv, setCVV] = React.useState("");
  const [flag, setFlag] = React.useState(true);
  const [noPayment, setNoPaymentOpen] = React.useState(false);
  const [hasCustomerPaid, setHasCustomerPaid] = React.useState(false);

  //function to close the add payment method dialog
  const closeCard = () => {
    //check if all the fields are filled
    if (cardName && cardNumber && expiryDate && cvv) {
      setPaymentOpen(false);
      setFlag(!flag);
      setHasCustomerPaid(true);
    }
  };

  //function to handle the alerts
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //function to handle the alerts
  const handleAlert = (warning_type) => {
    if (warning_type == "email") {
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
    } else if (warning_type == "noPayment") {
      setNoPaymentOpen(true);
    }
  };

  const handlePaymentOpen = () => {
    setPaymentOpen(true);
  };

  //function to handle the sign up
  const redirect = () => {
    window.location.href = "../Common-Pages/SignIn";
  };

  //function to close the alerts
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setBackdropOpen(false);
    setPostCodeOpen(false);
    setEmailOpen(false);
    setSuccessfulSignUp(false);
    setPasswordOpen(false);
    setFailedSignUp(false);
    setPaymentOpen(false);
  };

  //function to handle the payment dialog
  const handlePaymentClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    setPaymentOpen(false);
  };

  //function to check if the card information is valid
  const validateCardInfo = () => {
    if (cardName && cardNumber && expiryDate && cvv) {
      return true;
    }
  };

  //function to check if the customer has paid
  const paymentPending = () => {
    if (hasCustomerPaid) {
      return true;
    }
  };

  //state variables for the form
  const [returnMemberType, setMembershipType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [returnState, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //regex for the postcode validation
  const postcodeRegex = new RegExp("^(0[289][0-9]{2})|([1-9][0-9]{3})");

  //limit the number of characters in the postcode field
  const postcodeLimitChar = 4;
  const cardNumberLimit = 16;
  const cvvLimit = 3;

  //function to handle the postcode change
  const handlePostcodeChange = (event) => {
    if (event.target.value.toString().length <= postcodeLimitChar) {
      setPostcode(event.target.value);
      setState(postCodeToState(event.target.value));
    }
  };

  //function to handle the card number change to make sure it's less than 16 characters
  const handleCardNumberChange = (event) => {
    if (event.target.value.toString().length <= cardNumberLimit) {
      setCardNumber(event.target.value);
    }
  };

  //function to handle the cvv change to make sure it's less than 3 characters
  const handleCVVChange = (event) => {
    if (event.target.value.toString().length <= cvvLimit) {
      setCVV(event.target.value);
    }
  };

  //const to hold the trade options
  const membershipOptions = [
    { value: "Subscription", label: "Subscription" },
    { value: "Pay on Demand", label: "Pay on Demand" },
  ];

  //function to handle the form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission (reload)
    event.preventDefault();

    // data validation checks for alert popups
    if (validator.isEmail(event.target.email.value) == false) {
      handleAlert("email");
    } else if (!postcodeRegex.test(event.target.postcode.value)) {
      handleAlert("postcode");
    } else if (
      event.target.password.value != event.target.confirmPassword.value
    ) {
      handleAlert("password");
    } else if (cardNumber.length == 0) {
      handleAlert("noPayment");
    } else {
      event.preventDefault();

      // Get data from the form.
      const returnData = {
        //given data
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,

        email: event.target.email.value,
        password: event.target.password.value,
        phoneNumber: newPhoneNumber,
        streetAddress: event.target.address.value,
        city: event.target.city.value,
        state: returnState,
        postCode: event.target.postcode.value.toString(),
        membership: {
          membershipType: "ACC_CREATED",
          description: returnMemberType,
        },

        //CARD INFORMATION
        // cardNumber: cardNumber,
        // cardName: cardName,
        // expiryDate: dayjs(expiryDate).format("MM/YY"),
        // cvv: cvv,
      };
      // console.log(JSON.stringify(returnData));
      // alert(JSON.stringify(returnData));

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(returnData);

      // API endpoint where we send form data.
      const endpoint = `http://localhost:8080/api/customers`;

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
          "http://localhost:8080/api/auth/register",
          {
            email: email,
            password: password,
            role: "ROLE_CUSTOMER",
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
            onInputChange={(event, newInputValue) => {
              setMembershipType(newInputValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={membershipOptions}
            renderInput={(params) => (
              <TextField required {...params} label="Membership Type" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item sm={7}>
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
        <Grid item xs={5}>
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
        <Grid item xs={12}>
          <Button
            onClick={handlePaymentOpen}
            disabled={!flag}
            fullWidth
            variant="contained"
            color={flag ? "primary" : "success"}
            sx={{
              "&.Mui-disabled": {
                background: "#CEEAD0",
                color: "white",
              },
            }}
          >
            {flag ? "Add Payment Method" : "Payment Method Added"}
          </Button>
        </Grid>
        <Dialog open={paymentDialogOpen} onClose={handlePaymentClose}>
          <DialogTitle>Payment Method</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  id="cardName"
                  label="Name on Card"
                  onChange={(event) => setCardName(event.target.value)}
                  value={cardName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  type="number"
                  fullWidth
                  id="cardNumber"
                  label="Card Number"
                  value={cardNumber}
                  onChange={(event) => handleCardNumberChange(event)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  id="expiryDate"
                  label="Expiry Date"
                  onChange={(event) => setExpiryDate(event.target.value)}
                  value={expiryDate}
                  required
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label={"Expiry Date"}
                      views={["month", "year"]}
                      value={expiryDate}
                      minDate={dayjs()}
                      onChange={(event) => setExpiryDate(event)}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  type="number"
                  fullWidth
                  id="cvv"
                  label="CVV"
                  value={cvv}
                  onChange={(event) => handleCVVChange(event)}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeCard} disabled={!validateCardInfo()}>
              Add Payment Method
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={6}>
          <Button
            //type="submit"
            onClick={handleRegister}
            variant="contained"
            disabled={!paymentPending()}
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
            open={emailAlertOpen}
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

          <Snackbar
            open={successfulSignUpDialogOpen}
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
            open={passwordAlertOpen}
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
            open={noPayment}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              No Payment Method Entered, please enter one and try again.
            </Alert>
          </Snackbar>
          <Snackbar
            open={failedSignUpOpen}
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
            <Link href="/Common-Pages/SignIn" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>

        <Dialog
          open={finalAlertDialogOpen}
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
              Your account was successfully created, you will be redirected to
              the sign in page now where you can enter your details to log in.
              Thanks for joing us {firstName}!
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
      </Grid>
    </form>
  );
}
