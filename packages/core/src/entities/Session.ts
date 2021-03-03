import { randomBytes } from "crypto";
import { Entity } from "./Entity";

export { SESSION_TOKEN_LENGTH, Session, createSessionToken };

const SESSION_TOKEN_LENGTH = 40;

class Session implements Entity {
  id: string;
  userId: string;
  token: string;
}

const createSessionToken = (): string => {
  return randomBytes(SESSION_TOKEN_LENGTH).toString("base64");
};
