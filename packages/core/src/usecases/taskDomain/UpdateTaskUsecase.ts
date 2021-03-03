import { Awaitable } from "../../types";
import * as entities from "../../entities";
import { taskRepository } from "../../repositories";

type Request = entities.RequestParamsFromEntity<
  entities.Task,
  "id",
  keyof Omit<entities.Task, "id" | "user">
>;
type Response = entities.Task;
export interface UpdateTaskUsecase {
  execute(task: Request): Awaitable<Response>;
}

export class UpdateTaskUsecase implements UpdateTaskUsecase {
  constructor(private repos: { updateTask: taskRepository.updateTask }) {}

  async execute(task: Request): Promise<Response> {
    return await this.repos.updateTask(task);
  }
}
