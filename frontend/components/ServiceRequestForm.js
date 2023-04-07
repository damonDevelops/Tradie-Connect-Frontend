import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ServiceRequestForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Request details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline={true}
            label="Enter a description of the work required"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
