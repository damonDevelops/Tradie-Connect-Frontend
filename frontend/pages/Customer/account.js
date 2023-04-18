
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useJwt } from 'react-jwt';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postCode , setPostCode] = useState("");
    const [suburbState, setState] = useState("");

    // useEffect(() => {
    //     axios
    //   .get(`http://localhost:8080/api/customers`, config)
    //   .then((res) => {
    //     setFirstName(res.data.firstName);
    //     setLastName(res.data.lastName);
    //     setEmail(res.data.email);
    //     setStreetAddress(res.data.streetAddress);
    //     console.log(res.data.firstName);
    //   });
    //   }, []);

    const instance = axios.create({
      withCredentials: true,
      
    });

    instance.get("http://localhost:8080/api/customers")
    .then((response) => console.log(response.data));

    const initialState = {
        access:
          typeof window !== "undefined"
            ? window.localStorage.getItem("JWTToken")
            : false,
      };
    
    const { decodedToken, isExpired } = useJwt(initialState.access);

    const config = {
      //headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + initialState.access}
      
    };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(initialState.access)
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleRoundedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Manage Account Details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <TextField
            autoComplete="street-address"
            name="streetAddress"
            onChange={(event) => setStreetAddress(event.target.value)}
            value={streetAddress}
            required
            fullWidth
            id="email"
            label="Email"
            autoFocus
          />
            <Button
              type="submit"
              color="warning"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Account Information
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}