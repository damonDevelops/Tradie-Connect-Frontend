import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

import Link from "next/link";

import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import useFetchData from "../hooks/fetchData";
import axios from "axios";

// for displaying data:
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {} from "../functional_components/formattingUtil";

//import { DataGrid } from "@mui/x-data-grid";

const theme = createTheme();

export default function AvailableRequest() {
  const fetchURL = "http://localhost:8080/api/service-providers";

  const { data: responseData } = useFetchData(fetchURL);
  const [serviceRequests, setRequests] = useState([]);

  console.log(responseData);

  const instance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (responseData && responseData.qualifiedServiceRequests) {
        const objectPromise = responseData.qualifiedServiceRequests.map((id) =>
          instance.get("http://localhost:8080/api/service-requests/" + id)
        );
        const requests = await Promise.all(objectPromise);
        setRequests(requests.map((response) => response.data));
      }
    };

    fetchData();
  }, [responseData]);

  console.log(serviceRequests);

  const rows = serviceRequests.map(
    ({
      id,
      serviceType,
      status,
      requestedDate,
      scheduledEndDate,
      cost,
      customer: {
        suburb: { name: suburbName },
      },
    }) => ({
      id,
      serviceType,
      status,
      requestedDate,
      scheduledEndDate,
      cost,
      customer: { suburbName },
    })
  );

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
          Available Requests
        </Typography>
        <RequestTable data={rows} />
      </Paper>
    </ThemeProvider>
  );
}

function RequestTable({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const Router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (id) => {
    // Navigate to the dynamic route page with a query parameter
    Router.push({
      pathname: `/Service-Provider/ViewRequest/${id}`,
      query: { fromRequests: true },
    });
  };

  // styles for the header row
  const headerStyles = {
    textAlign: "center",
    fontWeight: "bold",
  };

  // styles for cell content
  const cellStyles = {
    textAlign: "center",
  };

  const rowsToDisplay = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minwidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyles}>Work Type</TableCell>
            {/* <TableCell sx={headerStyles}>Work Status</TableCell> */}
            <TableCell sx={headerStyles}>Start Date</TableCell>
            <TableCell sx={headerStyles}>Finish Date</TableCell>
            <TableCell sx={headerStyles}>Location (Suburb)</TableCell>
            <TableCell sx={headerStyles}>Pays ($)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToDisplay.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={cellStyles}>
                {row.serviceType
                  ? capitaliseWords(row.serviceType)
                  : row.serviceType}
              </TableCell>
              {/* <TableCell sx={cellStyles}>
                {row.status ? capitaliseWords(row.status) : row.status}
              </TableCell> */}
              <TableCell sx={cellStyles}>
                {row.requestedDate
                  ? formatDate(row.requestedDate)
                  : row.requestedDate}
              </TableCell>
              <TableCell sx={cellStyles}>
                {row.scheduledEndDate
                  ? formatDate(row.scheduledEndDate)
                  : row.scheduledEndDate}
              </TableCell>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                {row.customer.suburbName}
              </TableCell>
              <TableCell sx={cellStyles}>{"$" + row.cost}</TableCell>
              <TableCell>
                <Link
                  href={{
                    pathname: `/Service-Provider/ViewRequest/[id]`,
                    query: { fromRequests: true, serviceProvider: true },
                  }}
                  as={`/Service-Provider/ViewRequest/${row.id}`}
                  passHref
                  legacyBehavior
                >
                  <Button component="a" variant="outlined">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
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
