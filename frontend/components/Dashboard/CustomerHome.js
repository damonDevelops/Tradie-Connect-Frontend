import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomersTable from "../Admin/CustomersTable";
import ServiceProvidersTable from "../Admin/ServiceProvidersTable";
import RequestsTable from "../Admin/RequestsTable";
import { Button, Divider } from "@mui/material";
import CurrentRequest from "../Requests/CurrentRequest";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "auto",
              marginTop: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Make a New Request{" "}
            </Typography>
            <br />
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              href="/customer/new-request"
            >
              New Request{" "}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "auto",
              marginTop: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Past Requests{" "}
            </Typography>
            <br />
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              href="/customer/new-request"
            >
              Past Requests{" "}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              height: "auto",
              marginTop: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Reports{" "}
            </Typography>
            <br />
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              href="/customer/new-request"
            >
              Reports{" "}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{mt: 3}}>
        <CurrentRequest />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
