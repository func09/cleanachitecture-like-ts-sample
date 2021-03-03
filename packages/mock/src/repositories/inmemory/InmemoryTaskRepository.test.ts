import { Task } from "@zentask/core//entities";
import {
  store as taskStore,
  createTaskInmemory,
  getTaskInmemory,
  getManyTasksInmemory,
  deleteTaskInmemory,
  updateTaskInmemory,
} from "./InmemoryTaskRepository";
import faker from "faker";

describe("InmemoryTaskRepository", () => {
  beforeEach(() => {
    while (taskStore.length > 0) {
      taskStore.pop();
    }
  });
  describe("createTask", () => {
    test("新しいタスクを作成できる", async () => {
      const task = await createTaskInmemory({
        userId: "1",
        title: "牛乳を買う",
      });
      expect(taskStore.find((t) => t.id == task.id)).toBe(task);
    });
  });

  describe("getTask", () => {
    test("タスクを取得できる", async () => {
      const expectedTask = await createTaskInmemory({
        userId: "1",
        title: "牛乳を買う",
      });
      const task = getTaskInmemory({ id: expectedTask.id });
      expect(task).toBe(expectedTask);
    });
  });

  describe("updateTask", () => {
    test("タスクを更新できる", async () => {
      const expectedTask = await createTaskInmemory({
        userId: "1",
        title: "牛乳を買う",
      });
      const task = await updateTaskInmemory({
        id: expectedTask.id,
        title: "トイレットペーパーを買う",
      });
      expect(taskStore.find((t) => t.id == task.id).title).toBe(
        "トイレットペーパーを買う"
      );
    });
  });

  describe("deleteTask", () => {
    test("タスクを削除できる", async () => {
      const expectedTask = await createTaskInmemory({
        userId: "1",
        title: "牛乳を買う",
      });
      deleteTaskInmemory({ id: expectedTask.id });
      expect(taskStore.length).toBe(0);
    });
  });
});
