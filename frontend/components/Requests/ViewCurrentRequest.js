import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

import { useRouter } from "next/router";

import { Grid, Link, TextField } from "@mui/material";

import Box from "@mui/material/Box";

import useFetchData from "../hooks/fetchData";

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
      router.replace("/Customer/CurrentRequest");
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
