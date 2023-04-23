import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { Link, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 750,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Current Requests
        </Typography>
        <p>Request Type: {requestType}</p>
        <p>Request Status: {requestStatus}</p>
        <p>Request Start Date: {requestStartDate}</p>
        <p>Request End Date: {requestEndDate}</p>
        <p>Request Cost: {requestCost}</p>
        <p>Request Description: {requestDescription}</p>
      </Paper>

      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 750,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Current Requests lists
        </Typography>
        {data.map((serviceRequests) => (
          <Typography>
            <Link>id:{serviceRequests.id}</Link>
            Service Type: {serviceRequests.serviceType}
          </Typography>
        ))}
      </Paper>
    </ThemeProvider>
  );
}
