import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RadioGroup, Radio } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar } from '@mui/x-date-pickers';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Once',
  },
  {
    value: 20,
    label: 'Weekly',
  },
  {
    value: 40,
    label: 'Monthly',
  },
  {
    value: 60,
    label: 'Qaurterly',
  },
  {
    value: 80,
    label: 'Semi-Annually',
  }, {
    value: 100,
    label: 'Annually',
  }
];


export default function NewTaskForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Create a new Task
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="title"
            label="Title"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            defaultValue="house"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel value="house" control={<Radio />} label="House" />
            <FormControlLabel value="self" control={<Radio />} label="Self" />
            <FormControlLabel value="someone else" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <DateCalendar />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="description"
            label="Description"
            helperText="What should be done?"
            fullWidth
            // variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
        <Slider
  aria-label="Restricted values"
  defaultValue={20}
  // valueLabelFormat={valueLabelFormat}
  // getAriaValueText={valuetext}
  step={null}
  // valueLabelDisplay="auto"
  marks={marks}
/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}