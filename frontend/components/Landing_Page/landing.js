import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Fab } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Link from "next/link";

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

            <Link href="/Developer-Dashboard">
                {
                  <Button variant="contained" color="secondary" 
                    sx={{
                        mr: 2,
                    }}
                  >Developer</Button>
                }
            </Link>
            <Link href="/SignIn">
                {
                  <Button variant="contained" color="secondary" 
                    sx={{
                        mr: 2,
                    }}
                  >Sign In</Button>
                }
            </Link>
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
            <Typography variant="h2" component="div" sx={{marginLeft: 5, marginRight: 5, flexGrow: 1, color: "white" }}>
              TradieConnect. The fastest, easiest way to find a tradie.
            </Typography>
          </Grid>
          <Grid item xs={3}>
          <Link href="/SignUp">
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
            </Link>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
