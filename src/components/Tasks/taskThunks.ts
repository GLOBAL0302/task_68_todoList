import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask, ITaskApi, ITaskMutation } from '../../types.ts';
import { RootState } from '../../App/App.ts';
import { axiosApi } from '../../axiosApi.ts';

export const taskFetchThunk = createAsyncThunk<ITask[], void, { state: RootState }>(
  'tasks/FetchTasksThunk',
  async () => {
    const { data } = await axiosApi.get<ITaskApi>('/tasks.json');
    if (data) {
      const responseData = Object.keys(data).map((id) => {
        return {
          id,
          ...data[id],
        };
      });
      return responseData.reverse();
    }
    return [];
  },
);

export const taskDeleteThunk = createAsyncThunk<void, string, { state: RootState }>(
  'task/DeleteTaskThunk',
  async (id) => {
    await axiosApi.delete(`/tasks/${id}.json`);
  },
);

export const taskUpdateThunk = createAsyncThunk<void, ITask, { state: RootState }>(
  'task/UpdateTaskThunk',
  async (task) => {
    const newTask = {
      ...task,
      isCompleted: !task.isCompleted,
    };
    await axiosApi.put(`/tasks/${task.id}.json`, newTask);
  },
);

export const taskSubmitThunk = createAsyncThunk<void, ITaskMutation, { state: RootState }>(
  'task/SubmitTaskThunk',
  async (newTask) => {
    await axiosApi.post('/tasks.json', newTask);
  },
);
