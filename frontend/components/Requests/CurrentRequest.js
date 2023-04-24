import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { Link, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

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

//import { DataGrid } from "@mui/x-data-grid";

const theme = createTheme();

export default function CurrentRequest() {
  const [keyword, setKeyword] = useState("productInventory");
  const [data, setData] = useState([]);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);

  const [requests, setRequests] = useState("");

  const [requestID, setRequestID] = useState("");
  const [requestType, setRequestType] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [requestStartDate, setRequestStartDate] = useState("");
  const [requestEndDate, setRequestEndDate] = useState("");
  const [requestCost, setRequestCost] = useState("");
  const [requestDescription, setRequestDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const instance = axios.create({
    withCredentials: true,
  });

  const fetchData = async () => {
    try {
      const response = await instance.get(
        "http://localhost:8080/api/service-requests/user-requests",
        {
          responseType: "json",
        }
      );
      setData(response.data);
      console.log(response.data);

      response.data.map((data) => {
        setRequestID(data.id);
        setRequestType(data.serviceType);
        setRequestStatus(data.status);
        setRequestStartDate(data.scheduledStartDate);
        setRequestEndDate(data.scheduledEndDate);
        setRequestCost(data.cost);
        setRequestDescription(data.description);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const columns = [
  //   { field: "id", headerName: "Request ID", width: 125, minWidth: 150, maxWidth: 200 },
  //   { field: "serviceType", headerName: "Service Type", width: 125, minWidth: 150, maxWidth: 200 },
  //   { field: "scheduledStartDate", headerName: "Start Date", width: 250, minWidth: 150, maxWidth: 250},
  //   { field: "scheduledEndDate", headerName: "Scheduled End Date", width: 500, minWidth: 150, maxWidth: 500},
  //   { field: "status", headerName: "Request Status", width: 300, minWidth: 150, maxWidth: 300},
  //   { field: "cost", headerName: "Cost", width: 125, minWidth: 150, maxWidth: 200},
  //   { field: "description", headerName: "Description", width: 125, minWidth: 150, maxWidth: 200},
  // ];

  // const rows = [];
  // function createData(id, serviceType, scheduledStartDate, scheduledEndDate, status, cost, description) {
  //   return {id, serviceType, scheduledStartDate, scheduledEndDate, status, cost, description};
  // }

  // data.map((product) =>
  //     rows.push(
  //       createData(product.id, product.name, product.price, product.description, product.quantity, product.parts.length)
  //     )
  // );

  // maps the data from the request into a rows array with only the data required to be shown
  const rows = data.map(
    ({ id, serviceType, status, requestedDate, scheduledEndDate, cost }) => ({
      id,
      serviceType,
      status,
      requestedDate,
      scheduledEndDate,
      cost,
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
        Current Requests
      </Typography>
      <RequestTable data={rows} />

      </Paper>
      
    </ThemeProvider>
  );
}

function RequestTable({ data }) {
  // styles for the header row
  const headerStyles = {
    textAlign: "center",
    fontWeight: "bold",
  };

  // styles for cell content
  const cellStyles = {
    textAlign: "center",
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            <TableCell sx={headerStyles}>Service Request (ID)</TableCell>
            <TableCell sx={headerStyles}>Work Type</TableCell>
            <TableCell sx={headerStyles}>Work Status</TableCell>
            <TableCell sx={headerStyles}>Start Date</TableCell>
            <TableCell sx={headerStyles}>Finish Date</TableCell>
            <TableCell sx={headerStyles}>Cost ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToDisplay.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                {row.id}
              </TableCell>
              <TableCell sx={cellStyles}>{row.serviceType}</TableCell>
              <TableCell sx={cellStyles}>{row.status}</TableCell>
              <TableCell sx={cellStyles}>{row.requestedDate}</TableCell>
              <TableCell sx={cellStyles}>{row.scheduledEndDate}</TableCell>
              <TableCell sx={cellStyles}>{row.cost}</TableCell>
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