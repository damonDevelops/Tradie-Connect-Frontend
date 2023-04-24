import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create styles
const MyDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>TradieConnect Requests Report</Text>
      </View>

    </Page>
  </Document>
);

export default function Account() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState("");

  const [confirmationOpen, setConfirmationOpen] = React.useState(false);

  //open variables for alerts
  const [postCodeAlertOpen, setPostCodeAlertOpen] = useState(false);

  const postcodeRegex = new RegExp("^(0[289][0-9]{2})|([1-9][0-9]{3})");
  const postcodeLimitChar = 4;

  const suburbHandler = (event) => {
    setSuburb(event.target.value.toLowerCase());
  };

  const handlePostcodeChange = (event) => {
    if (event.target.value.toString().length <= postcodeLimitChar) {
      setPostcode(event.target.value);
      setState(postCodeToState(event.target.value));
    }
  };

  const handleAlert = (warning_type) => {
    if (warning_type == "postcode") {
      setPostCodeAlertOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPostCodeAlertOpen(false);
    setConfirmationOpen(false);
  };

  const handleConfirmOpen = () => {
    setConfirmationOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const instance = axios.create({
    withCredentials: true,
  });

  const fetchData = async () => {
    try {
      const response = await instance.get(
        "http://localhost:8080/api/customers"
      );

      response.data.map((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhone(data.phoneNumber);
        setAddress(data.streetAddress);
        setCity(data.suburb.name);
        setPostcode(data.postCode);
        setState(data.suburb.state);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 750,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>

        <PDFDownloadLink document={<MyDoc />} fileName="report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download PDF"
          }
        </PDFDownloadLink>
      </Paper>
    </React.Fragment>
  );
}
