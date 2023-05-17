import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import useFetchData from "../../components/hooks/fetchData";
import { Divider } from "@mui/material";

export default function Report() {
  const today = new Date();
  const fileName = "Tradie_Connect_Report_" + today.toLocaleDateString("en-AU");
  //URLs for fetching data
  const customerURL = "http://localhost:8080/api/customers";
  const requestURL = "http://localhost:8080/api/service-requests/user-requests";

  //assiging data using hook
  const { data: customerData } = useFetchData(customerURL);
  const { data: requestData } = useFetchData(requestURL);

  //empty requests array for mapping
  const requests = [];

  //pushing data to the array
  requestData.map((request) => {
    requests.push([
      request.id,
      request.serviceType,
      request.requestedDate,
      request.status,
      request.cost,
      request.applicants.map((applicant) => {
        return applicant.serviceProvider.companyName + '('+ applicant.serviceProvider.suburb.name +')' + ",";
      }),
    ]);
  });

  console.log(requestData)

  const csvData = [
    ["CUSTOMER INFORMATION"],

    [
      "Subscription Type",
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Address",
      "Suburb",
      "Postcode",
      "State",
    ],
    [
      customerData.membership.membershipType,
      customerData.firstName,
      customerData.lastName,
      customerData.email,
      customerData.phoneNumber,
      customerData.streetAddress,
      customerData.suburb.name,
      customerData.postCode,
      customerData.suburb.state,
    ],
    [],
    ["REQUESTS"],
    [
      "Request ID",
      "Service Type",
      "Requested Date",
      "Status",
      "Cost",
      "Applicants",
    ],
  ];

  //pushing data to the CSV
  csvData.push(...requests);

  //map the objects from the requestData into an array

  console.log(requests);

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Divider />
        <br />
        <Typography variant="h6" gutterBottom>
          To generate a CSV file of your requests, payment information and more,
          click the button below.
        </Typography>
        <br />
        <CSVLink data={csvData} filename={fileName}>
          <Button variant="contained">Download CSV</Button>
        </CSVLink>
      </Paper>
    </React.Fragment>
  );
}
