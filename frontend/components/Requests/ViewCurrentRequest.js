import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";

import { Grid, Link, TextField } from "@mui/material";

import Box from "@mui/material/Box";

import useFetchData from "../hooks/fetchData";
import axios from "axios";

import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const theme = createTheme();

export default function ViewRequest() {
  const router = useRouter();
  const requestId = router.query.id;
  const fromRequests = router.query.fromRequests;
  const fetchURL =
    "http://localhost:8080/api/service-requests/" + router.query.id;

  const { data: responseData } = useFetchData(fetchURL);

  useEffect(() => {
    if (!fromRequests) {
      router.back();
    }
  }, [fromRequests, router]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Service Request Details
        </Typography>

        {router.query.customer ? <CustomerView /> : null}
        {router.query.serviceProvider ? <ServiceProviderView /> : null}
      </Paper>
    </ThemeProvider>
  );
}

// takes a string and capitalises the first letter of each word. Makes every other letter lower case.
function capitaliseWords(str) {
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// formats date specific to how it is held in the date array
// date[0] = year, date[1] = month, date[2] = day
function formatDate(date) {
  return date[2] + "/" + date[1] + "/" + date[0];
}

// this function returns the customer view of the current request
function CustomerView() {
  const router = useRouter();
  const fetchURL =
    "http://localhost:8080/api/service-requests/" + router.query.id;
  const { data: responseData } = useFetchData(fetchURL);
  console.log(responseData);

  return (
    <Box sx={{ p: 2 }}>
      {responseData ? (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Request ID"
                value={responseData.id}
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Status: "
                value={
                  responseData.status
                    ? capitaliseWords(responseData.status)
                    : responseData.status
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Type: "
                value={
                  responseData.serviceType
                    ? capitaliseWords(responseData.serviceType)
                    : responseData.serviceType
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Date Submitted"
                value={
                  responseData.requestedDate
                    ? formatDate(responseData.requestedDate)
                    : responseData.requestedDate
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Scheduled Date"
                value={
                  responseData.scheduledStartDate
                    ? formatDate(responseData.scheduledStartDate)
                    : responseData.scheduledStartDate
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Scheduled Finish"
                value={
                  responseData.scheduledEndDate
                    ? formatDate(responseData.scheduledEndDate)
                    : responseData.scheduledEndDate
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={responseData.description}
                disabled
                InputLabelProps={{ shrink: true }}
                multiline={true}
                fullWidth
              />
            </Grid>
            {/*maybe nest grid inside the tradie table function*/}
            <Grid item xs={12}>
              {responseData.status == "PENDING" ? (
                <TradieTable data={responseData} />
              ) : null}
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
}

// function takes service request object then maps applicants (service providers who have applied for the job)
// then displays them in a list for the customer
function TradieTable({ data }) {
  // rows variable holds list of applicants
  const rows = data.applicants.map((applicant) => applicant.serviceProvider);
  console.log(rows);

  // useState for the final alert diaglog
  const [finalAlertDialogOpen, setFinalOpen] = React.useState(false);

  // style to make the rating stars smaller
  const SmallerRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-icon": {
      fontSize: theme.typography.fontSize - 2,
    },
  }));

  // for the post request
  const instance = axios.create({
    withCredentials: true,
  });

  // async function to submit post request for accepting tradie
  const handleOnAccept = async (id) => {
    try {
      const postURL =
        "http://localhost:8080/api/service-requests/" +
        data.id +
        "/accept-service-provider/" +
        id;
      console.log(postURL);
      const response = instance.post(postURL);
      console.log(response);
      setFinalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableRow>
          <TableCell>Service Provider ID</TableCell>
          <TableCell>Company Name</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>
                {
                  <SmallerRating
                    name="rating"
                    value={row.Rating}
                    precision={0.5}
                    readOnly
                  />
                }
              </TableCell>
              <TableCell>
                <Button
                  component="a"
                  variant="outlined"
                  onClick={() => handleOnAccept(row.id)}
                >
                  ACCEPT
                </Button>
              </TableCell>
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
                    You have successfully accepted {row.companyName} for the
                    job! The Service Provider will complete the job in the set
                    timeframe. Once they have finished they will mark the job as
                    completed. To see the progress of this service request,
                    visit the Current Requests tabs on the siderbar or view them
                    from the dashboard menu.
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  style={{
                    backgroundColor: "#4caf50",
                  }}
                >
                  <Link href="../" passHref legacyBehavior color="inherit">
                    <Button
                      style={{
                        backgroundColor: "#4caf50",
                        color: "white",
                      }}
                      autoFocus
                    >
                      Back to Dashboard
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
              {/*Add more TableCell components for additional columns*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// function returns the serrvice provider view of the current request
function ServiceProviderView() {
  const router = useRouter();
  // for the get request
  const fetchURL =
    "http://localhost:8080/api/service-requests/" + router.query.id;
  const { data: responseData } = useFetchData(fetchURL);

  // to get user id
  const userInfo = jwtDecode(Cookies.get("JWT"));

  // for the post request
  const instance = axios.create({
    withCredentials: true,
  });

  console.log(responseData);
  console.log(userInfo);

  // to determine whether appy button should show
  const [canApply, setCanApply] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // use effect checks if it's created or pending, then checks if current user has already applied
  useEffect(() => {
    if (responseData.status == "CREATED" || responseData.status == "PENDING") {
      setCanApply(true);
    }
    try {
      const applicantIds = responseData.applicants.map(
        (applicant) => applicant.serviceProvider.id
      );
      console.log(applicantIds);
      if (applicantIds.includes(userInfo.userId)) setHasApplied(true);
      else setHasApplied(false);
    } catch (error) {
      setCanApply(false);
    }
  }, [responseData.status]);

  // function for service-provider to apply for a job
  const handleOnApply = async () => {
    try {
      const postURL =
        "http://localhost:8080/api/service-requests/" +
        responseData.id +
        "/apply";
      const response = instance.post(postURL);
      console.log(response);
      setHasApplied(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [canComplete, setCanComplete] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  useEffect(() => {
    if (responseData.status == "ACCEPTED") {
      setCanComplete(true);
    }
  });

  // useState for the final alert diaglog
  const [finalAlertDialogOpen, setFinalOpen] = useState(false);
  //
  // handles mark as completed button
  const handleOnCompleted = async () => {
    try {
      const postURL =
        "http://localhost:8080/api/service-requests/" +
        responseData.id +
        "/complete";
      const response = instance.post(postURL);
      console.log(response);
      setHasCompleted(true);
      setFinalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {responseData ? (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Request ID"
                value={responseData.id}
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Status: "
                value={
                  responseData.status
                    ? capitaliseWords(responseData.status)
                    : responseData.status
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Type: "
                value={
                  responseData.serviceType
                    ? capitaliseWords(responseData.serviceType)
                    : responseData.serviceType
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Date Submitted"
                value={
                  responseData.requestedDate
                    ? formatDate(responseData.requestedDate)
                    : responseData.requestedDate
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Scheduled Date"
                value={
                  responseData.scheduledStartDate
                    ? formatDate(responseData.scheduledStartDate)
                    : responseData.scheduledStartDate
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Scheduled Finish"
                value={
                  responseData.scheduledEndDate
                    ? formatDate(responseData.scheduledEndDate)
                    : responseData.scheduledEndDate
                }
                disabled
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={responseData.description}
                disabled
                InputLabelProps={{ shrink: true }}
                multiline={true}
                fullWidth
              />
            </Grid>
            {canApply && !hasApplied && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnApply}
                >
                  Apply
                </Button>
              </Grid>
            )}
            {canApply && hasApplied && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled
                  style={{ backgroundColor: "lightgreen", color: "black" }}
                >
                  Applied
                </Button>
              </Grid>
            )}
            {canComplete && !hasCompleted && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnCompleted}
                >
                  Mark job as completed
                </Button>
              </Grid>
            )}
            {canComplete && hasCompleted && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "lightgreen", color: "black" }}
                  onClick={handleOnCompleted}
                  disabled
                >
                  Completed
                </Button>
              </Grid>
            )}
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
                  You have successfully completed the job! The customers payment
                  will be paid into your account shortly. To see the history of
                  your completed jobs, check out the Finished Requests page.
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{
                  backgroundColor: "#4caf50",
                }}
              >
                <Link
                  href="../Current-Requests"
                  passHref
                  legacyBehavior
                  color="inherit"
                >
                  <Button
                    style={{
                      backgroundColor: "#4caf50",
                      color: "white",
                    }}
                    autoFocus
                  >
                    Back to Current Requests
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
          </Grid>
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
}
