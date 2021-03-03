import { Task, RequestParamsFromEntity } from "./entities";
import { Awaitable } from "./types";

export type CreateTaskRequest = RequestParamsFromEntity<
  Task,
  "userId" | "title",
  keyof Omit<Task, "id" | "user">
>;
export type UpdateTaskRequest = RequestParamsFromEntity<
  Task,
  "id",
  keyof Omit<Task, "id" | "user">
>;
export type GetTaskRequest = RequestParamsFromEntity<Task, "id", null>;
export type DeleteTaskRequest = RequestParamsFromEntity<Task, "id", null>;

export type createTask = { (task: CreateTaskRequest): Awaitable<Task> };
export type updateTask = { (task: UpdateTaskRequest): Awaitable<Task> };
export type getTask = { (task: GetTaskRequest): Awaitable<Task> };
export type deleteTask = { (task: DeleteTaskRequest): Awaitable<Task> };
export type getManyTasks = { (): Awaitable<Task[]> };
