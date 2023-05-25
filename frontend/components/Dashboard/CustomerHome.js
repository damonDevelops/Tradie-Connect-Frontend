import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import CurrentRequest from "../Requests/CustomerCurrentRequest";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 2,
              width: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "auto",
              marginTop: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              New Request{" "}
            </Typography>
            <br />
            <Link
              href="/Customer/NewRequest"
              passHref
              legacyBehavior
              color="inherit"
            >
              <Button variant="contained" sx={{ width: "100%" }}>
                New Request{" "}
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
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
            <Link
              href="/Customer/PastRequests"
              passHref
              legacyBehavior
              color="inherit"
            >
              <Button variant="contained" sx={{ width: "100%" }}>
                Past Requests{" "}
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
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
            <Link
              href="/Customer/Reports"
              passHref
              legacyBehavior
              color="inherit"
            >
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                href="/Customer/NewRequest"
              >
                Reports{" "}
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <CurrentRequest />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
