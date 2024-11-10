import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../App/App.ts';
import { useEffect } from 'react';
import { taskDeleteThunk, taskFetchThunk, taskUpdateThunk } from './taskThunks.ts';
import { Button, Checkbox, CircularProgress, Grid2, Typography } from '@mui/material';
import { ITask } from '../../types.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, updateTask } from './tasksSlice.ts';

const Tasks = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks: ITask[] = useSelector((state: RootState) => state.tasksReducer.tasks);
  const tasksLoader = useSelector((state: RootState) => state.tasksReducer.tasksLoading);

  useEffect(() => {
    dispatch(taskFetchThunk());
  }, [dispatch]);

  const deleteTaskFunc = async (task: ITask) => {
    await dispatch(taskDeleteThunk(task.id));
    dispatch(deleteTask(task));
  };

  const updateTaskStatus = async (task: ITask) => {
    await dispatch(taskUpdateThunk(task));
    dispatch(updateTask(task));
  };

  return tasksLoader ? (
    <CircularProgress />
  ) : (
    <Grid2
      sx={{
        border: '1px solid black',
        padding: 2,
      }}
      container
      flexDirection="column"
    >
      {tasks.map((task) => (
        <Grid2 key={task.id}>
          <Typography variant="body2" component="span">
            {task.title}
          </Typography>
          <Typography
            onClick={() => {
              updateTaskStatus(task);
            }}
            component="span"
          >
            <Checkbox checked={task.isCompleted} />
          </Typography>
          <Button
            onClick={() => deleteTaskFunc(task)}
            sx={{ marginLeft: 5 }}
            variant="contained"
            color="warning"
            startIcon={<DeleteIcon />}
          >
            delete
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Tasks;
