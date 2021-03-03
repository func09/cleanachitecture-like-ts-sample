import { Awaitable } from "../../types";
import * as entities from "../../entities";
import { taskRepository } from "../../repositories";

type Request = entities.RequestParamsFromEntity<
  entities.Task,
  "userId" | "title",
  keyof Omit<entities.Task, "userId" | "id" | "user">
>;

type Response = entities.Task;

export interface CreateTaskUsecase {
  execute(task: Request): Awaitable<Response>;
}

export class CreateTaskUsecase implements CreateTaskUsecase {
  constructor(private repos: { createTask: taskRepository.createTask }) {}

  async execute(task: Request): Promise<Response> {
    return await this.repos.createTask(task);
  }
}
