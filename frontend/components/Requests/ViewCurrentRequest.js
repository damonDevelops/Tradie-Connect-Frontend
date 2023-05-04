import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";

import { useRouter } from "next/router";

import { Link, TextField } from "@mui/material";
import { useState } from "react";

// for displaying data:
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

import useFetchData from "../hooks/fetchData";

//import { DataGrid } from "@mui/x-data-grid";

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

  console.log(requestId);
  console.log(fromRequests);
  console.log("original response data:")
  console.log(responseData);
  //console.log(displayData);

  //const displayData = editDisplayData(responseData);
  console.log("After data format: ")
  //console.log(displayData)

  const disabledStyle = {
    "&.MuiInputBase-disabled": {
      bgcolor: "#CEEAD0",
      color: "green",
    },
  }

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
          View Request: {requestId}
           <Box sx={{ p: 2 }}>
            {responseData ? (
              <>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Service Request Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    label="Request ID"
                    value={responseData.id}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Date Submitted"
                    value={responseData.requestedDate}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Scheduled Date"
                    value={responseData.scheduledStartDate}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Scheduled Finish"
                    value={responseData.scheduledStartDate}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Status: "
                    value={responseData.status}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Description"
                    value={responseData.description}
                    disabled
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  {/* <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={handleBackButtonClick}>Back</Button>
                  </Box> */}
                </Box>
              </>
            ) : (
              <Typography variant="h6">Loading...</Typography>
            )}
          </Box> 
          {/* {fromRequests ? (
            <Typography>
              you came here from the current requests page
            </Typography>
          ) : (
            <Typography>
              you naughty naughty, trying to access this page directly
            </Typography>
          )} */}
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}

// export function editDisplayData(data) {
//   const [displayData, setDisplayData] = useState({
//     serviceType: "",
//     requestedDate: "",
//     requestedTime: "",
//     scheduledStartDate: "",
//     scheduledStartTime: "",
//     scheduledEndDate: "",
//     scheduledEndTime: "",
//     cost: "",
//     description: "",
//   });

//   useEffect(() => {
//     const capitaliseWords = (str) => {
//       return str
//         .toLowerCase()
//         .split("_")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     };

//     const formatDate = (date) => {
//       return date[2] + "/" + date[1] + "/" + date[0];
//     };

//     if (data) {
//       setDisplayData({
//         serviceType: capitaliseWords(data.serviceType),
//         requestedDate: formatDate(data.requestedDate),
//         requestedTime: data.requestedTime,
//         scheduledStartDate: formatDate(data.scheduledStartDate),
//         scheduledStartTime: data.scheduledStartTime,
//         scheduledEndDate: formatDate(data.scheduledEndDate),
//         scheduledEndTime: data.scheduledEndTime,
//         cost: data.cost,
//         description: data.description,
//         status: capitaliseWords(data.status),
//       });
//     }


//   }, [data]);

//   return displayData;
// }
