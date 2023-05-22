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

  const instance = axios.create({
    withCredentials: true,
  });

  const [serviceRequests, setRequests] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (customerData && customerData.serviceRequests) {
        const objectPromise = customerData.serviceRequests.map((id) =>
          instance.get(`http://localhost:8080/api/service-requests/${id}`)
        );
        const customerRequests = await Promise.all(objectPromise);
        setRequests(customerRequests.map((request) => request.data));
        setPayments(
          customerRequests.map((request) => request.data.customer.payments)
        );
      }
    };
    fetchData();
  }, [customerData]);

  console.log(serviceRequests);
  console.log(payments);

  //for each request in requestData, store the total cost in a variable called totalCost
  const totalCost = requestData.reduce((total, request) => {
    return total + request.cost;
  }, 0);

  //make a const called averageCost that checks if there are any requests in requestData
  //if there are, calculate the average cost
  //if there aren't, set averageCost to 0
  const averageCost =
    requestData.length > 0 ? totalCost / requestData.length : 0;

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
        request.status,
        "$" + request.cost,
      ];
    });

    console.log("DUCK")
    console.log(serviceRequests)

  //make an array of arrays from requestedData that only contains requests where the status is COMPLETED
  const completedRequests = serviceRequests
    .filter((request) => {
      return request.status == "COMPLETED";
    })
    .map((request) => {
      return [
        request.id,
        capitaliseWords(request.serviceType),
        request.description,
        formatDate(request.scheduledStartDate),
        formatDate(request.scheduledEndDate),
        //formatDate(request.completedDate),
        formatCompleteDate(request.completedAt, request.completedOn),
        request.status,
        "$" + request.cost,
        request.serviceProvider.companyName,
      ];
    });

  const createPDF = () => {
    const doc = new jsPDF({ orientation: "p" });
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
    doc.text(
      "Payment Information: " +
        "XXXX XXXX XXXX " +
        customerData.paymentInformation.cardNumber.slice(-4),
      10,
      90
    );
    doc.setFontSize(20);
    doc.text("Statistics", 10, 110);
    doc.setFontSize(12);
    doc.text("Total Requests: " + requestData.length, 10, 120);
    doc.text("Total Completed Requests: " + completedRequests.length, 10, 130);
    doc.text("Total Pending Requests: " + requests.length, 10, 140);
    doc.text("Total Cost: $" + totalCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), 10, 150);
    doc.text("Average Cost: $" + averageCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'), 10, 160);

    doc.setFontSize(20);

    if (requests.length > 0) {
      doc.addPage(null, "l");
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
            "Status",
            "Cost",
          ],
        ],
        body: requests,
      });
    } else {
      doc.setFontSize(12);
      doc.text("No Current Requests", 10, 270);
    }

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
            "Description",
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
    } else {
      doc.setFontSize(12);
      doc.text("No Completed Requests", 10, 280);
    }

    if (payments.length > 0) {
      doc.addPage(null, "l");
      doc.setFontSize(20);
      doc.text("Payment History", 10, 15);
      //create an autoTable for payment history from serviceRequests
      autoTable(doc, {
        margin: { top: 20 },
        styles: { halign: "center", fontSize: 14 },
        head: [["Request ID", "Amount", "Date", "Time"]],
        body: payments[0].map((payment) => {
          return [
            payment.id,
            "$" + payment.amount,
            formatDate(payment.transactionDate),
            tConvert(payment.transactionDate),
          ];
        }),
      });
    } else {
      doc.setFontSize(12);
      doc.text("No Payment History", 10, 290);
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

function tConvert(time) {
  let hour = time[3];
  const minute = time[4];
  let period = "AM";

  if (hour >= 12) {
    period = "PM";
    hour = hour === 12 ? hour : hour - 12;
  }

  hour = hour.toString().padStart(2, "0");

  const rTime = `${hour}:${minute.toString().padStart(2, "0")} ${period}`;

  return rTime;
}


function formatCompleteDate(time, date){
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