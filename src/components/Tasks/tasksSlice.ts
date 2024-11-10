import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types.ts';
import { taskDeleteThunk, taskFetchThunk } from './taskThunks.ts';

interface Props {
  tasks: ITask[];
  tasksLoading: boolean;
  deleteLoading: boolean;
}

const initialState: Props = {
  tasks: [],
  tasksLoading: false,
  deleteLoading: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    deleteTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const oneTask = state.tasks.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isCompleted: !action.payload.isCompleted,
          };
        }
        return { ...item };
      });

      state.tasks = oneTask;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(taskFetchThunk.pending, (state) => {
        state.tasksLoading = true;
      })
      .addCase(taskFetchThunk.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.tasksLoading = false;
      })
      .addCase(taskFetchThunk.rejected, (state) => {
        state.tasksLoading = false;
      });

    builder
      .addCase(taskDeleteThunk.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(taskDeleteThunk.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(taskDeleteThunk.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { updateTask, deleteTask } = tasksSlice.actions;
