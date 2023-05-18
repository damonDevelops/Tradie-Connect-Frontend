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

export default function ServiceProviderReport() {
  const fetchURL = "http://localhost:8080/api/service-providers";

  const { data: responseData } = useFetchData(fetchURL);
  const [serviceRequests, setRequests] = useState([]);

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

  const today = new Date();
  const fileName = "Tradie_Connect_Report_" + today.toLocaleDateString("en-AU");
  //URLs for fetching data

  const serviceProviderInfoURL = "http://localhost:8080/api/service-providers";
  const { data: serviceProvider } = useFetchData(serviceProviderInfoURL);

  const currentRequestURL = "http://localhost:8080/api/service-requests/user-requests";


  const { data: requestData } = useFetchData(currentRequestURL);

  console.log(requestData);

  const currentRequests = requestData
  .filter((request) => {
    return request.status == "ACCEPTED" || request.status == "PENDING";
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
    ];
  });

    const completedRequests = requestData
    .filter((request) => {
        return request.status == "COMPLETED";
    })
    .map((request) => {
        return [
            request.id,
            capitaliseWords(request.serviceType),
            request.description,
            request.customer.firstName,
            request.customer.phoneNumber,
            formatDate(request.scheduledStartDate),
            formatDate(request.scheduledEndDate),
            "COMPLETE_DATE",
            request.status,
            "$" + request.cost,
        ];
    });
  

  const createPDF = () => {
    const doc = new jsPDF({ orientation: "p" });
    doc.setFontSize(30);
    doc.text("TradieConnect Report!", 10, 15);
    doc.setFontSize(20);
    doc.text("Service Provider Information", 10, 30);
    doc.setFontSize(12);
    doc.text(
      "Name: " + serviceProvider.companyName,
      10,
      40
    );
    doc.text("Email: " + serviceProvider.email, 10, 50);
    doc.text("Phone Number: " + serviceProvider.phoneNumber, 10, 60);
    doc.text("ABN: " + serviceProvider.abn, 10, 70);
    doc.text(
      "Address: " +
        serviceProvider.streetAddress +
        ", " +
        serviceProvider.suburb.name +
        ", " +
        serviceProvider.postCode +
        ", " +
        serviceProvider.suburb.state,
      10,
      80
    );


    // doc.setFontSize(20);
    // doc.text("Statistics", 10, 100);
    // doc.setFontSize(12);
    // doc.text("Total Requests: " + requestData.length, 10, 110);
    // doc.text("Total Completed Requests: " + completedRequests.length, 10, 120);
    // doc.text("Total Pending Requests: " + requests.length, 10, 130);
    // doc.text("Total Cost: $" + totalCost, 10, 140);
    // doc.text("Average Cost: $" + averageCost, 10, 150);
    
    //if statement that checks if there are any requests otherwise prints no available requests to the pdf
    if (serviceRequests.length > 0) {
        doc.addPage(null, "l");
        doc.setFontSize(20);
        doc.text("Available Requests", 10, 15);

        autoTable(doc, {
        styles: { halign: "center", fontSize: 14 },
        margin: { top: 20 },
        head: [
            [
            "Request ID",
            "Service Type",
            "Instructions",
            "Customer Name",
            "Customer Phone Number",
            "Location",
            "Start Date",
            "End Date",
            "Cost",
            ],
        ],
        body: serviceRequests.map((request) => [
            request.id,
            capitaliseWords(request.serviceType),
            request.description,
            request.customer.firstName,
            request.customer.phoneNumber,
            request.customer.suburb.name,
            formatDate(request.scheduledStartDate),
            formatDate(request.scheduledEndDate),
            "$" + request.cost,
            ]),
        });
    }
    else {
        doc.text("No Available Requests", 10, 280);
    }

    //check if there are any current requests otherwise print no current requests to the pdf
    if (currentRequests.length > 0) {
        doc.addPage(null, "l");
        doc.setFontSize(20);
        doc.text("Current Requests", 10, 15);
        autoTable(doc, {
            margin: { top: 20 },
            styles: { halign: "center", fontSize: 14 },
            head: [
            [
                "Request ID",
                "Service Type",
                "Instructions",
                "Customer Name",
                "Customer Phone Number",
                "Location",
                "Start Date",
                "End Date",
                "Cost",
            ],
            ],
            body: currentRequests,
        });
    }
    else {
        doc.text("No Current Requests", 10, 290);
    }


    //check if there are any completed requests otherwise print no completed requests to the pdf
    if (completedRequests.length > 0) {

        doc.addPage(null, "l");
        doc.setFontSize(20);
        doc.text("Completed Requests", 10, 15);
        autoTable(doc, {
            margin: { top: 20 },
            styles: { halign: "center", fontSize: 14 },
            head: [
                [
                    "Request ID",
                    "Service Type",
                    "Instructions",
                    "Customer Name",
                    "Customer Phone Number",
                    "Location",
                    "Start Date",
                    "End Date",
                    "Cost",
                ],
            ],
            body: completedRequests,
        });
    }
    else {
        doc.text("No Completed Requests", 10, 110);
    }

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
