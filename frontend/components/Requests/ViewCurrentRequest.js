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
                      value={capitaliseWords(responseData.status)}
                      disabled
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Type: "
                      value={capitaliseWords(responseData.serviceType)}
                      disabled
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Date Submitted"
                      value={formatDate(responseData.requestedDate)}
                      disabled
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Scheduled Date"
                      value={formatDate(responseData.scheduledStartDate)}
                      disabled
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Scheduled Finish"
                      value={formatDate(responseData.scheduledStartDate)}
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
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}

function capitaliseWords(str) {
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date) {
  return date[2] + "/" + date[1] + "/" + date[0];
}
