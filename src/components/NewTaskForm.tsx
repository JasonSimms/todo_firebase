/**
 * NewTaskForm component.
 *
 * This component renders a form for creating a new task.
 * It includes fields for the task title, description, assignee, type, frequency, and due date.
 * The form data is processed and returned when the form is submitted.
 */


import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RadioGroup, Radio } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

//Interface imports
import { Task } from '../models/Task';

//Service imports
import { FirebaseService } from '../services/FirestoreServices';
import { useAuth } from '../contexts/AuthContext';
// import {completeTask} from '../services/TaskUtils';

//Service setup
const submitTask = async (task: Task) => {  //todo remove firebaseServices and migrate to utils.
  const firebaseService = new FirebaseService();
  firebaseService.createTask(task);
}


//Provide the values for the Slider Component
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
    label: 'Quarterly',
  },
  {
    value: 80,
    label: '6mo',
  }, {
    value: 100,
    label: 'Annually',
  }
];

/**
 * Preprocesses the task form data.
 *
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param assignedTo - The person or entity assigned to the task.
 * @param taskType - The type of the task.
 * @param frequency - The frequency at which the task should be performed.
 * @param assignedDate - The date when the task was assigned.
 * @returns A new task object with the processed data.
 */
const preProcessTaskForm = (title: string, description: string, assignedTo: string, taskType: string, frequency: number, assignedDate: Dayjs, createdBy: string) => {



  const newTask: Task = {
    title, description, assignedTo, taskType, createdBy, assignedDate:'placeholder', frequency:'Once', lastCompletedDate: null,
    dateCreated: new Date().toISOString(),
  }

  //return the label from the slider instead of a numerical value.
  const mark = marks.find(mark => mark.value === frequency);
  newTask['frequency'] = mark ? mark.label as "Once" | "Weekly" | "Monthly" | "Quarterly" | "6mo" | "Annually" : 'Once';

  //stringify they date object from Dayjs.
  const date = assignedDate?.toISOString()
  newTask['assignedDate'] = date;

  return newTask;
}

export default function NewTaskForm() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  //Form state
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs>((dayjs().add(1, 'day')));
  const [assignedToValue, setAssignedToValue] = React.useState<string>('self');
  const [taskType, setTaskTypeValue] = React.useState<string>('cleaning');
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [frequencyValue, setFrequencyValue] = React.useState<number>(20);

  //Handle submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the current user and logout function from AuthContext
    if (!currentUser) throw Error('no user found this should not be possible');
    const createdBy = currentUser.email //todo support displayname

    if (title !== null && description !== null && createdBy !== undefined) {
      const newForm = preProcessTaskForm(title, description, assignedToValue, taskType, frequencyValue, datePickerValue, createdBy);
      const result = await submitTask(newForm);
      // console.log('result!', result)
      navigate('/tasks')
    } else {
      console.error('Title, createdBy or Description is null');
    }
  }

  return (
    <React.Fragment>
      <Box component="form" noValidate onSubmit={handleSubmit} m={2}>
        <Container component="main" maxWidth="lg">
          <Typography variant="h6" gutterBottom>
            Create a new Task
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <TextField
                required
                id="title"
                label="Title"
                fullWidth
                variant="outlined"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <p>Who should do this?</p>
              <Box display="flex" flexGrow={1} m={2}>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  onChange={(e) => setAssignedToValue(e.target.value)}
                  value={assignedToValue}
                  defaultValue={assignedToValue}
                  name="asignedTo"
                  row
                  sx={{ width: '100%' }}
                >
                  <FormControlLabel value="house" control={<Radio />} label="House" />
                  <FormControlLabel value="self" control={<Radio />} label="Self" />
                  <FormControlLabel value="someone else" control={<Radio />} label="Other" />
                </RadioGroup>
              </Box>
              <p>What kind of task is this?</p>
              <Box display="flex" flexGrow={1} m={2}>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  onChange={(e) => setTaskTypeValue(e.target.value)}
                  value={taskType}
                  defaultValue={taskType}
                  name="taskType"
                  row
                  sx={{ width: '100%' }}
                >
                  <FormControlLabel value="cleaning" control={<Radio />} label="Cleaning" />
                  <FormControlLabel value="improvement" control={<Radio />} label="Improvement" />
                  <FormControlLabel value="logistics" control={<Radio />} label="Logistical" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />

                </RadioGroup>
              </Box>
              <p>How often should this be completed?</p>
              <Box m={2}>

                <Slider
                  aria-label="Restricted values"
                  defaultValue={20}
                  step={null}
                  marks={marks}
                  name="frequency"
                  onChange={(e, newValue) => {
                    setFrequencyValue(newValue as number)
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <TextField
                required
                id="description"
                label="Description"
                helperText="What should be done?"
                fullWidth
                variant="outlined"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DateCalendar
                // minDate={new Date()}
                // name="assignedDate"
                value={datePickerValue}
                onChange={(newValue) => {
                  setDatePickerValue(newValue)
                }}
              />
            </Grid>

          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              // onClick={handleNext}
              type={'submit'}
              sx={{ mt: 3, ml: 1 }}
            >
              Create Task
            </Button>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}