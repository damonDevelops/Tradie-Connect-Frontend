import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { TextField } from "@mui/material";
import Grid from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {Button} from "@mui/material";

function preventDefault(event) {
  event.preventDefault();
}

export default function Account() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [state, setState] = useState("");

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
        setEmail(data.email);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    instance.put(`http://localhost:8080/api/customers`, {
        firstName: firstName,
        suburb:{
          name: "suburb",
          state: "NSW"
        }
    }, config) 
    .then((res) => {
        console.log(res);
        console.log(res.data);
      }
    )
  };

  return (
    <React.Fragment>
      <Title> Update Account Information </Title>

      <TextField
        autoComplete="given-name"
        name="firstName"
        onChange={(event) => setFirstName(event.target.value)}
        value={firstName}
        required
        fullWidth
        id="firstName"
        label="First Name"
        autoFocus
      />
      <br />
      <TextField
        autoComplete="given-name"
        name="lastName"
        onChange={(event) => setLastName(event.target.value)}
        value={lastName}
        required
        fullWidth
        id="lastName"
        label="Last Name"
        autoFocus
      />
      <br />
      <TextField
        autoComplete="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        required
        fullWidth
        id="email"
        label="Email"
        autoFocus
      />
      <br />
      <TextField
        autoComplete="phone"
        name="phone"
        onChange={(event) => setPhone(event.target.value)}
        value={phone}
        required
        fullWidth
        id="phone"
        label="Phone"
        autoFocus
      />
      <br />
      <TextField
        autoComplete="address"
        name="address"
        onChange={(event) => setAddress(event.target.value)}
        value={address}
        required
        fullWidth
        id="address"
        label="Address"
        autoFocus
      />
      <br />
      <TextField
        autoComplete="city"
        name="city"
        onChange={(event) => setCity(event.target.value)}
        value={city}
        required
        fullWidth
        id="city"
        label="City"
        autoFocus
      />
      <br />
      <TextField
        autoComplete="postcode"
        name="postcode"
        onChange={(event) => setPostcode(event.target.value)}
        value={postcode}
        required
        fullWidth
        id="postcode"
        label="Postcode"
        autoFocus
      />
      <br />
      <TextField
        autoComplete="state"
        name="state"
        onChange={(event) => setState(event.target.value)}
        value={state}
        required
        fullWidth
        id="state"
        label="State"
        autoFocus
      />
      <br />
      <Button
        //type="submit"
        onClick={handleSubmit}
        variant="contained"
        color="warning"
      >
        Update Account Details
      </Button>
      <br />
      <Button
        //type="submit"
        href="/Customer/Dashboard"
        variant="contained"
      >
        Back to Dashboard
      </Button>
    </React.Fragment>
  );
}
