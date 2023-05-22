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
import { convertLength } from "@mui/material/styles/cssUtils";

export default function ServiceProviderReport() {
  const fetchURL = "http://localhost:8080/api/service-providers";

  const { data: responseData } = useFetchData(fetchURL);
  const [serviceRequests, setRequests] = useState([]);

  console.log(responseData);
  const instance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (responseData && responseData.serviceRequests) {
        const objectPromise = responseData.serviceRequests.map((id) =>
          instance.get(`http://localhost:8080/api/service-requests/${id}`)
        );
        const serviceProviderRequests = await Promise.all(objectPromise);
        setRequests(serviceProviderRequests.map((request) => request.data));
      }
    };
    fetchData();
  }, [responseData]);

  const today = new Date();
  const fileName = "Tradie_Connect_Report_" + today.toLocaleDateString("en-AU");
  //URLs for fetching data

  const serviceProviderInfoURL = "http://localhost:8080/api/service-providers";
  const { data: serviceProvider } = useFetchData(serviceProviderInfoURL);

  const currentRequestURL =
    "http://localhost:8080/api/service-requests/user-requests";

  const { data: requestData } = useFetchData(currentRequestURL);

  console.log("REQUESTED DATA");
  console.log(requestData);

  const currentRequests = serviceRequests
    .filter((request) => {
      return request.status == "ACCEPTED" || request.status == "PENDING";
    })
    .map((request) => {
      return [
        request.id,
        capitaliseWords(request.serviceType),
        capitaliseWords(request.status),
        request.customer.firstName,
        request.customer.phoneNumber,
        request.customer.suburb.name,
        formatDate(request.scheduledStartDate),
        formatDate(request.scheduledEndDate),
        "$" + request.cost,
      ];
    });

  const completedRequests = serviceRequests
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
        request.customer.suburb.name,
        formatDate(request.scheduledStartDate),
        formatDate(request.scheduledEndDate),
        formatCompleteDate(request.completedAt, request.completedOn),
        "$" + request.cost,
      ];
    });

  const reviews = serviceRequests
    .filter((request) => {
      return request.status == "COMPLETED" && request.review != null;
    })
    .map((request) => {
      return [
        request.id,
        capitaliseWords(request.serviceType),
        request.description,
        request.customer.firstName,
        request.review.rating,
        request.review.comment,
      ];
    });

  const totalCost = requestData.reduce((total, request) => {
    return total + request.cost;
  }, 0);

  const averageCost =
    requestData.length > 0 ? totalCost / requestData.length : 0;

  const averageReview =
    reviews.length > 0
      ? reviews.reduce((total, review) => {
          return total + review[4];
        }, 0) / reviews.length
      : 0;

  const createPDF = () => {
    const doc = new jsPDF({ orientation: "p" });
    doc.setFontSize(30);
    doc.text("TradieConnect Report!", 10, 15);
    doc.setFontSize(20);
    doc.text("Service Provider Information", 10, 30);
    doc.setFontSize(12);
    doc.text("Name: " + serviceProvider.companyName, 10, 40);
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

    //add some statistics
    doc.setFontSize(20);
    doc.text("Statistics", 10, 100);
    doc.setFontSize(12);
    doc.text("Total Requests: " + requestData.length, 10, 110);
    doc.text("Total Completed Requests: " + completedRequests.length, 10, 120);
    doc.text(
      "Total Money Made: $" +
        totalCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      10,
      130
    );
    doc.text(
      "Average Cost: $" +
        averageCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
      10,
      140
    );
    doc.text("Average Rating: " + averageReview.toFixed(2), 10, 150);

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
    } else {
      doc.text("No Current Requests", 10, 280);
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
            "Actual Completion Date",
            "Cost",
          ],
        ],
        body: completedRequests,
      });
    } else {
      doc.text("No Completed Requests", 10, 270);
    }

    if (completedRequests.length > 0) {
      doc.addPage(null, "l");
      doc.setFontSize(20);
      doc.text("Reviews", 10, 15);

      autoTable(doc, {
        margin: { top: 20 },
        styles: { halign: "center", fontSize: 14 },
        head: [
          [
            "Request ID",
            "Service Type",
            "Instructions",
            "Customer Name",
            "Rating",
            "Comment",
          ],
        ],
        body: reviews,
      });
    } else {
      doc.text("No Reviews", 10, 110);
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

function formatCompleteDate(time, date) {
  let hour = time[0];
  const minute = time[1];
  let period = "AM";

  if (hour >= 12) {
    period = "PM";
    hour = hour === 12 ? hour : hour - 12;
  }

  hour = hour.toString().padStart(2, "0");

  const rTime = `${hour}:${minute.toString().padStart(2, "0")} ${period}`;

  return rTime + ", " + date[2] + "/" + date[1] + "/" + date[0];
}
