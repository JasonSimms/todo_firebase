/**
 * TaskTable component.
 *
 * This component displays all Tasks created for a household.
 * It should allow the view to learn when the last time it was completed and select it for completion.
 * 
 */

import React, { useState, useEffect, useCallback } from 'react';
import { FirebaseService } from '../services/FirestoreServices';
import {completeTask} from '../services/TaskUtils';


//Table imports
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Dialog Imports
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

//Interface
import { Task } from '../models/Task';


const TaskTable: React.FC = () => {
  //state management
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<Task>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  /**
   * Function demonstrated if a task is assigned or not.
   * @param taskDate ISO 8601 format date from task collection dateAssigned
   * @returns boolean use for color coding table etc.
   */
  const isTaskDue = (taskDate:string) : boolean =>{
    const today = new Date();
    const comparableDate = new Date(taskDate);
    return comparableDate < today;
  }


  //get data for the table
  const fetchTasks = useCallback(async () => {
    const firebaseService = new FirebaseService();
    const data = await firebaseService.getAllTasks(); //TODO add error handling
    if (data) {
      console.log(data);
      setTasksData(data);
      setLoading(false);
    } else console.error('No data from fetchTasks!')
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <Box m={2}>
        {/* {loading ? <CircularProgress /> : JSON.stringify(tasksData)} */}
        <Dialog
          open={dialogOpen}
          // onClose={() => setDialogOpen(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Mark {selectedRow && selectedRow.title} as completed?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {selectedRow && selectedRow.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              selectedRow?.id && completeTask(selectedRow.id, selectedRow.frequency)
              setDialogOpen(false)
            }
            }>Yes</Button>
            <Button onClick={() => setDialogOpen(false)}>No</Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" stickyHeader >
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="right">Frequency</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Assigned&nbsp;To</TableCell>
                <TableCell align="right">Created&nbsp;by</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksData.map((row) => (
                <TableRow
                  key={row.title}
                  onClick={(e) => {
                    setSelectedRow(row)
                    setDialogOpen(true)
                  }}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: isTaskDue(row.assignedDate) ? 'pink' : '' }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="right">{row.frequency}</TableCell>
                  <TableCell align="right">{row.taskType}</TableCell>
                  <TableCell align="right">{row.assignedTo}</TableCell>
                  <TableCell align="right">{row.createdBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TaskTable;