import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomersTable from "../Admin/CustomersTable";
import ServiceProvidersTable from "../Admin/ServiceProvidersTable";
import RequestsTable from "../Admin/RequestsTable";
import { Divider } from "@mui/material";
import Button from '@mui/material/Button';
import Link from "next/link";

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
        <Divider />
        <br />
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>
        <CustomersTable />
        <br />
        <Link href="/Admin/Customers" passHref legacyBehavior color="inherit">
        <Button variant="contained" sx={{width: '30%', marginLeft: "auto"}} color="primary" href="/admin/customers">View All Customers</Button>
        </Link>
        <br />
        <Divider />
        <br />
        <Typography variant="h4" gutterBottom>
          Service Providers
        </Typography>
        <ServiceProvidersTable />
        <br />
        <Link href="/Admin/ServiceProviders" passHref legacyBehavior color="inherit">
        <Button variant="contained" sx={{width: '30%', marginLeft: "auto"}} color="primary" href="/admin/customers">View All Providers</Button>
        </Link>
        <br />
        <Divider />
        <br />
        <Typography variant="h4" gutterBottom>
          Requests
        </Typography>
        <RequestsTable />
        <br />
        <Link href="/Admin/Requests" passHref legacyBehavior color="inherit">
        <Button variant="contained" sx={{width: '30%', marginLeft: "auto"}} color="primary" href="/admin/customers">View All Requests</Button>
        </Link>
        <br />
      </Paper>
    </ThemeProvider>
  );
}
