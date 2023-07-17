export interface Todo {
    title: string;
    status: TodoStatus;
    priority: TodoPriority;
}

export enum TodoStatus {
    New = "New",
    InProgress = "InProgress",
    Done = "Done"
}

export enum TodoPriority {
    noPriority = 0,
    lowest = 1,
    low = 2,
    medium = 3,
    high = 4,
    highest = 5
}