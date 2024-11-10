export interface ITaskMutation {
  title: string;
  isCompleted: boolean;
}

export interface ITask extends ITaskMutation {
  id: string;
}

export interface ITaskApi {
  [id: string]: ITaskMutation;
}
