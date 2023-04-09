import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function BasicSelect() {
  const [WorkType, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Work Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={WorkType}
          label="Work Type"
          onChange={handleChange}
        >
          <MenuItem value={10}>Plumbing</MenuItem>
          <MenuItem value={20}>Fence Repair</MenuItem>
          <MenuItem value={30}>Tiling</MenuItem>
          <MenuItem value={40}>Electrical</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default function ServiceRequestForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Request details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BasicSelect />
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
