import {createSlice} from "@reduxjs/toolkit";
import {allTasks} from "../../types.ts";
import {taskFetchThunk} from "./taskThunks.ts";

interface Props{
    tasks: allTasks[];
    tasksLoading:boolean;
}


const initialState:Props={
    tasks:[],
    tasksLoading:false,
}

export const tasksSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            .addCase(taskFetchThunk.pending, (state)=>{
                state.tasksLoading = true;
            })
            .addCase(taskFetchThunk.fulfilled, (state, action)=>{
                state.tasks = action.payload;
                state.tasksLoading = false;
            })
            .addCase(taskFetchThunk.rejected, (state)=>{
                state.tasksLoading = false;
            })
    }
})


export const tasksReducer = tasksSlice.reducer
export const {} = tasksSlice.actions;