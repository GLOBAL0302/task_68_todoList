import {createAsyncThunk} from "@reduxjs/toolkit";
import {allTasks, ITaskApi, ITaskMutation} from "../../types.ts";
import {RootState} from "../../App/App.ts";
import {axiosApi} from "../../axiosApi.ts";


export const taskFetchThunk = createAsyncThunk<allTasks[], void, {state:RootState}>(
    "tasks/FetchThunk",
    async()=>{
        const {data} = await axiosApi.get<ITaskApi>("/tasks.json");
        if(data){
            return Object.keys(data).map((id) => {
                return {
                    id,
                    ...data[id]
                }
            })
        }
        return []
    }
);

export const taskSubmitThunk = createAsyncThunk<void, ITaskMutation, {state:RootState}>(
    "task/SubmitThunk",
    async(newTask)=>{
       await axiosApi.post("/tasks.json", newTask);
    }
)