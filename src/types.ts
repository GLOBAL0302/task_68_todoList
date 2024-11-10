export interface ITaskMutation{
    title: string;
    isCompleted:boolean;
}

export interface allTasks extends ITaskMutation{
    id:string
}

export interface ITaskApi {
    [id:string]: ITaskMutation;
}