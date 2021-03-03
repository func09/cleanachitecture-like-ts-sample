import { taskRepository } from "@zentask/core/repositories";
import { Awaitable } from "@zentask/core//types";
import { Task } from "@zentask/core//entities";
import { v4 as uuid } from "uuid";

export let store: Task[] = [];

export const createTaskInmemory: taskRepository.createTask = (
  task: taskRepository.CreateTaskRequest
): Task => {
  const newTask: Task = Object.assign(task, { id: uuid() });
  store.push(newTask);
  return newTask;
};

export const updateTaskInmemory: taskRepository.updateTask = (
  task: taskRepository.UpdateTaskRequest
): Awaitable<Task> => {
  let updatedTask: Task = store.find((t) => t.id == task.id);
  updatedTask = Object.assign(updatedTask, task);
  return updatedTask;
};

export const getTaskInmemory: taskRepository.getTask = (
  task: taskRepository.GetTaskRequest
): Awaitable<Task> => {
  const gotTask: Task = store.find((t) => t.id == task.id);
  return gotTask;
};

export const deleteTaskInmemory: taskRepository.deleteTask = (
  task: taskRepository.DeleteTaskRequest
): Awaitable<Task> => {
  const deletedTask: Task = store.find((t) => t.id == task.id);
  store = store.filter((t) => t.id != deletedTask.id);
  return deletedTask;
};

export const getManyTasksInmemory = (): Task[] => {
  return store;
};
