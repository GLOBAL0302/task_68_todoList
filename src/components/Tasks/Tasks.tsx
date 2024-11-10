import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../App/App.ts";
import {useEffect} from "react";
import {taskFetchThunk} from "./taskThunks.ts";
import {Checkbox, CircularProgress, Grid2, Typography} from "@mui/material";
import {allTasks} from "../../types.ts";

const Tasks = () => {
    const dispatch:AppDispatch = useDispatch();
    const tasks:allTasks[] = useSelector((state:RootState)=> state.tasksReducer.tasks);
    const taskLoader = useSelector((state:RootState)=> state.tasksReducer.tasksLoading);

    useEffect(() => {
        dispatch(taskFetchThunk());
    }, [dispatch]);


    return (
        taskLoader?  <CircularProgress/>:
        <Grid2 container flexDirection="column">
            {tasks.map((task)=>(
                <Grid2 key={task.id}>
                    <Typography variant='body2' component='span'>{task.title}</Typography>
                    <Typography component='span'><Checkbox checked={task.isCompleted} /></Typography>
                </Grid2>
            ))}
        </Grid2>
    )
};

export default Tasks;