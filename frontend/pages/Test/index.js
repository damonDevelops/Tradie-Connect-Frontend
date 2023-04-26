import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Fab } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";

export default function ButtonAppBar() {
  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ boxShadow: "none" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
              TradieConnect
            </Typography>
            <Fab
              variant="extended"
              sx={{
                boxShadow: "none",
                backgroundColor: "#000007",
                color: "white",
                width: 150,
                fontSize: "20px",
                ":hover": {
                  bgcolor: "#092c4e",
                  color: "white"
                }
              }}
            >
              Sign In
            </Fab>
          </Toolbar>
        </AppBar>
        <Grid
          container
          height={"100%"}
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor="	#000007"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Typography variant="h2" component="div" sx={{ flexGrow: 1, color: "white" }}>
              TradieConnect. The fastest, easiest way to find a tradie.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Fab
              variant="extended"
              sx={{
                boxShadow: "none",
                backgroundColor: "#1976d2",
                fontSize: "20px",
                color: "white",
                marginTop: "20px",
                ":hover": {
                  bgcolor: "#092848",
                  color: "white"
                }
              }}
            >
              Get Started
            </Fab>
          </Grid>
        </Grid>

        {/* <Paper
          sx={{
            //backgroundImage: `url(https://www.tarauniforms.com.au/wp-content/uploads/2021/03/TU-Tradies-Header-1.jpg)`,
            backgroundColor: "#414756",
            width: "100%",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <Typography
            align="center"
            variant="h2"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            TradieConnect
          </Typography>
        </Paper> */}
      </Box>
    </ThemeProvider>
  );
}
