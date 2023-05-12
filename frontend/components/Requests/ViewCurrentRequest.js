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

import usePostData from "../hooks/postData";

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
          height: 700,
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
          </Grid>
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
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

  // use effect checks if it's created or pending, then checks if current user as already applied
  useEffect(() => {
    if (responseData.status == "CREATED" || responseData.status !== "PENDING") {
      setCanApply(true);
    } else {
      try {
        const applicantIds = responseData.applicants.map(
          (applicant) => applicant.id
        );
        console.log(applicantIds);
        if (applicantIds.includes(userInfo.userId)) setHasApplied(true);
        else setHasApplied(false);
      } catch (error) {
        setCanApply(false);
      }
    }
  }, [responseData.status]);

  const handleOnApply = async () => {
    try {
      const postURL =
        "http://localhost:8080/api/service-requests/" +
        userInfo.userId +
        "/apply";
      console.log(instance.post(postURL));
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
                <Button variant="contained" color="primary" disabled>
                  Applied
                </Button>
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
}

// apply function for service providers
function ApplyButton({ userId }) {
  const [isApplying, setIsApplying] = useState(false);
  const postURL = `http://localhost:8080/api/service-requests/${userId}/apply`;
  const { postData, isLoading, isError, post } = usePostData(postURL);

  const handleOnClick = () => {
    setIsApplying(true);
    post();
  };

  if (isApplying) {
    if (isLoading) {
      return <div>Applying...</div>;
    } else if (isError) {
      return <div>Error applying</div>;
    } else {
      return <div>Applied!</div>;
    }
  }

  return (
    <Button onClick={handleOnClick}>
      {isLoading ? "Loading..." : "Apply"}
    </Button>
  );
}
