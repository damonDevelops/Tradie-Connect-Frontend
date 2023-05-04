import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomersTable from "../Admin/CustomersTable";
import ServiceProvidersTable from "../Admin/ServiceProvidersTable";
import RequestsTable from "../Admin/RequestsTable";
import { Divider } from "@mui/material";


const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 'auto',
        }}
      >
        
        <Typography variant="h4" gutterBottom>
          Home
        </Typography>
       
      </Paper>
    </ThemeProvider>
  );
}
