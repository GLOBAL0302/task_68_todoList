import {useState} from "react";
import {ITaskMutation} from "../../types.ts";
import {Button, Checkbox, Grid2, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../App/App.ts";
import {taskSubmitThunk} from "../Tasks/taskThunks.ts";


const initialState:ITaskMutation = {
    title:"",
    isCompleted:false
}

const CreateTask = () => {
    const [taskMutation, setTaskMutation] = useState(initialState);
    const dispatch:AppDispatch = useDispatch();


    const handleTitleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const {value, name} = e.target;
         setTaskMutation((prevState)=>{
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    const handleStatusChange = ()=>{
        setTaskMutation((prevState)=>{
            return{
                ...prevState,
                isCompleted:!prevState.isCompleted
            }
        })
    }


    const onFormSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await dispatch(taskSubmitThunk(taskMutation));
    }

    return (
        <>
            <Grid2 onSubmit={onFormSubmit} container component="form" flexDirection='column'>
                <Grid2>
                    <TextField
                        onChange={handleTitleChange}
                        value={taskMutation.title}
                        name="title"
                        id="title"
                        label="Task Title"
                        variant="outlined"/>
                </Grid2>
                <Grid2>
                    <Checkbox onChange={handleStatusChange} checked={taskMutation.isCompleted}/>
                </Grid2>
                <Button variant="contained" color="primary" type="submit">
                    ADD Task
                </Button>
            </Grid2>
        </>
    );
};

export default CreateTask;