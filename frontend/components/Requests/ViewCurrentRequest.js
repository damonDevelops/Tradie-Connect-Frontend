import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { Link, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

import { useRouter } from "next/router";

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

export default function ViewRequest() {
  const router = useRouter();
  const requestId = router.query.id;
  const fromRequests = router.query.fromRequests;

  useEffect(() => {
    if (!fromRequests) {
      router.replace("/Customer/CurrentRequest");
    }
  }, [fromRequests, router]);

  console.log(requestId);
  console.log(fromRequests);

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
