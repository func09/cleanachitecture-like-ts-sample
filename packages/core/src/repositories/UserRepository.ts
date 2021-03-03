import { User, RequestParamsFromEntity } from "./entities";
import { Awaitable } from "./types";

export type CreateUserRequest = RequestParamsFromEntity<
  User,
  "email" | "passwordDigest" | "passwordSalt",
  keyof Omit<User, "id">
>;
export type GetUserRequest = RequestParamsFromEntity<User, "id", null>;
export type UpdateUserRequest = RequestParamsFromEntity<
  User,
  "id",
  keyof Omit<User, "id" | "tasks">
>;
export type GetUserByEmailRequest = RequestParamsFromEntity<
  User,
  "email",
  null
>;

export type createUser = {
  (user: CreateUserRequest): Awaitable<User>;
};

export type getUser = {
  (user: GetUserRequest): Awaitable<User>;
};

export type updateUser = {
  (user: UpdateUserRequest): Awaitable<User>;
};

export type getUserByEmail = {
  (user: GetUserByEmailRequest): Awaitable<User>;
};
