import * as React from "react";
import Paper from "@mui/material/Paper";

import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

// for displaying data:
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";


export default function ServiceProviders() {
  const [data, setData] = useState([]);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "id",
      sort: "desc",
    },
  ]);


  useEffect(() => {
    fetchData();
  }, []);

  const instance = axios.create({
    withCredentials: true,
  });

  const fetchData = async () => {
    try {
      const response = await instance.get(
        "http://localhost:8080/api/customers/all",
        {
          responseType: "json",
        }
      );
      setData(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  // maps the data from the request into a rows array with only the data required to be shown
  const rows = data.map(
    ({ id, email, firstName, membership, postCode }) => ({
      id,
      firstName,
      email,
      membership,
      postCode,
    })
  );

  return (
      <CustomersTable data={rows} />
  );
}

function CustomersTable({ data }) {
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
            <TableCell sx={headerStyles}>Customer (ID)</TableCell>
            <TableCell sx={headerStyles}>Email</TableCell>
            <TableCell sx={headerStyles}>Name</TableCell>
            <TableCell sx={headerStyles}>Membership Type</TableCell>
            <TableCell sx={headerStyles}>Postcode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToDisplay.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ width: "20%", textAlign: "center" }}>
                {row.id}
              </TableCell>
              <TableCell sx={cellStyles}>{row.email}</TableCell>
              <TableCell sx={cellStyles}>{row.firstName}</TableCell>
              <TableCell sx={cellStyles}>{row.membership.membershipType
                  ? capitaliseWords(row.membership.membershipType)
                  : row.membership.membershipType}</TableCell>
              <TableCell sx={cellStyles}>{row.postCode}</TableCell>
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