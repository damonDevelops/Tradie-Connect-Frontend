import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import useFetchData from "../hooks/fetchData";
import { Divider } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Report() {
  const today = new Date();
  const fileName = "Tradie_Connect_Report_" + today.toLocaleDateString("en-AU");
  //URLs for fetching data
  const customerURL = "http://localhost:8080/api/customers";
  const requestURL = "http://localhost:8080/api/service-requests/user-requests";
  const [formattedMembership, setFormattedMembership] = useState("");

  //assiging data using hook
  const { data: customerData } = useFetchData(customerURL);
  const { data: requestData } = useFetchData(requestURL);

  console.log(requestData);

  //convert requestData from an array of objects to an array of arrays

//for each request in requestData, store the total cost in a variable called totalCost
    const totalCost = requestData.reduce((total, request) => {
        return total + request.cost;
    }, 0);

    const averageCost = totalCost / requestData.length;

  const requests = requestData
    .filter((request) => {
      return request.status == "CREATED" || request.status == "PENDING";
    })
    .map((request) => {
      return [
        request.id,
        capitaliseWords(request.serviceType),
        formatDate(request.scheduledStartDate),
        formatDate(request.scheduledEndDate),
        //formatDate(request.completedDate),
        "COMPLETE_DATE",
        request.status,
        "$" + request.cost,
        //if the request.applicants is not empty, return all applicant's company name, otherwise return "No Applicants"
        request.applicants.length > 0
            ? request.applicants.map((applicant) => {
                return applicant.serviceProvider.companyName + " (" + applicant.serviceProvider.suburb.name + ")" + ", ";
            })
            : "No Applicants",

        

      ];
    });

  //make an array of arrays from requestedData that only contains requests where the status is COMPLETED
  const completedRequests = requestData
    .filter((request) => {
      return request.status == "COMPLETED";
    })
    .map((request) => {
      return [
        request.id,
        capitaliseWords(request.serviceType),
        formatDate(request.scheduledStartDate),
        formatDate(request.scheduledEndDate),
        //formatDate(request.completedDate),
        "COMPLETE_DATE",
        request.status,
        "$" + request.cost,
        request.serviceProvider.companyName,
      ];
    });


  console.log(completedRequests);

  const createPDF = () => {
    const doc = new jsPDF({orientation: 'p'});
    doc.setFontSize(30);
    doc.text("TradieConnect Report!", 10, 15);
    doc.setFontSize(20);
    doc.text("Customer Information", 10, 30);
    doc.setFontSize(12);
    doc.text(
      "Name: " + customerData.firstName + " " + customerData.lastName,
      10,
      40
    );
    doc.text(
      "Type: " + capitaliseWords(customerData.membership.membershipType),
      10,
      50
    );
    doc.text("Email: " + customerData.email, 10, 60);
    doc.text("Phone Number: " + customerData.phoneNumber, 10, 70);
    doc.text(
      "Address: " +
        customerData.streetAddress +
        ", " +
        customerData.suburb.name +
        ", " +
        customerData.postCode +
        ", " +
        customerData.suburb.state,
      10,
      80
    );
    doc.setFontSize(20);
    doc.text("Statistics", 10, 100);
    doc.setFontSize(12);
    doc.text("Total Requests: " + requestData.length, 10, 110);
    doc.text("Total Completed Requests: " + completedRequests.length, 10, 120);
    doc.text("Total Pending Requests: " + requests.length, 10, 130);
    doc.text("Total Cost: $" + totalCost, 10, 140);
    doc.text("Average Cost: $" + averageCost, 10, 150);
    doc.addPage(null, "l");
    doc.setFontSize(20);
    doc.text("Current Requests", 10, 15);

    autoTable(doc, {
      styles: { halign: "center", fontSize: 14 },
      margin: { top: 20 },
      head: [
        [
          "Request ID",
          "Service Type",
          "Start Date",
          "End Date",
          "Completed Date",
          "Status",
          "Cost",
          "Applicants",
        ],
      ],
      body: requests,
    });

    doc.addPage();

    doc.setFontSize(20);
    doc.text("Completed Requests", 10, 15);
    autoTable(doc, {
    margin: { top: 20 },
      styles: { halign: "center", fontSize: 14 },
      head: [
        [
          "Request ID",
          "Service Type",
          "Start Date",
          "End Date",
          "Completed Date",
          "Status",
          "Cost",
          "Service Provider",
        ],
      ],
      body: completedRequests,
    });

    doc.save(fileName + ".pdf");
  };


  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        <Divider />
        <br />
        <Typography variant="h6" gutterBottom>
          To generate a PDF file of your requests, payment information and more,
          click the button below.
        </Typography>
        <br />

        <Button variant="contained" onClick={createPDF}>
          Download PDF
        </Button>
      </Paper>
    </React.Fragment>
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
