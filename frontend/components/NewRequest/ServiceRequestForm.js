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
  const [WorkType, setWorkType] = React.useState("");

  const handleChange = (event) => {
    setWorkType(event.target.value);
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
          <MenuItem value="TREE_REMOVAL">Tree Removal</MenuItem>
          <MenuItem value="ROOF_CLEANING">Roof Cleaning</MenuItem>
          <MenuItem value="FENCE_INSTALLATION">Fence Installation</MenuItem>
          <MenuItem value="OVEN_REPAIRS">Oven Repair</MenuItem>
          <MenuItem value="POOL_CLEANING">Pool Cleaning</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default function ServiceRequestForm() {
  const [description, setDescription] = React.useState("");
  const [WorkType, setWorkType] = React.useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Request details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Work Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={WorkType}
                label="Work Type"
                onChange={(event) => setWorkType(event.target.value)}
              >
                <MenuItem value="TREE_REMOVAL">Tree Removal</MenuItem>
                <MenuItem value="ROOF_CLEANING">Roof Cleaning</MenuItem>
                <MenuItem value="FENCE_INSTALLATION">
                  Fence Installation
                </MenuItem>
                <MenuItem value="OVEN_REPAIRS">Oven Repair</MenuItem>
                <MenuItem value="POOL_CLEANING">Pool Cleaning</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline={true}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            label="Enter a description of the work required"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
