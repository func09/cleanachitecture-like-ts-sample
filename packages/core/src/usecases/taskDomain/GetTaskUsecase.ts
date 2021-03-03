import { Awaitable } from "../../types";
import * as entities from "../../entities";
import { taskRepository } from "../../repositories";

type Request = entities.RequestParamsFromEntity<entities.Task, "id", null>;
type Response = entities.Task;

export interface GetTaskUsecase {
  execute(task: Request): Awaitable<Response>;
}

export class GetTaskUsecase implements GetTaskUsecase {
  constructor(private repos: { getTask: taskRepository.getTask }) {}
  async execute(task: Request): Promise<Response> {
    return this.repos.getTask(task);
  }
}
