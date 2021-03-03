import { Session, RequestParamsFromEntity } from "./entities";
import { Awaitable } from "./types";

export type GetSessionRequest = RequestParamsFromEntity<Session, "token", null>;
export type CreateSessionRequest = RequestParamsFromEntity<
  Session,
  "userId" | "token",
  null
>;

export type getSession = {
  (session: GetSessionRequest): Awaitable<Session>;
};

export type createSession = {
  (session: CreateSessionRequest): Awaitable<Session>;
};
