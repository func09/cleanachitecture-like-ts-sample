import { User } from "./User";
import { Entity } from "./Entity";

export { Task };

class Task implements Entity {
  id: string;
  title: string;
  userId: string;
  user?: User;
  priority?: "NONE" | "LOW" | "NORMAL" | "HIGH";
  deadlineAt?: Date;
  completedAt?: Date;
}
