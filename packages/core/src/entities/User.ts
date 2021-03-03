import { randomBytes, scryptSync } from "crypto";
import { Task } from "./Task";
import { Entity } from "./Entity";

export { digestPassword, createPasswordSalt, checkPassword };
export { User, PASSWORD_SALT_LENGTH, PASSWORD_HASH_LENGTH };

const PASSWORD_SALT_LENGTH = 16;
const PASSWORD_HASH_LENGTH = 40;

class User implements Entity {
  id: string;
  email: string;
  password?: string;
  passwordDigest?: string;
  passwordSalt?: string;
  tasks?: Task[];
}

// Methods
const digestPassword = (
  password: string
): Required<Pick<User, "passwordDigest" | "passwordSalt">> => {
  const passwordSalt = createPasswordSalt();
  const passwordDigest = scryptSync(
    password,
    passwordSalt,
    PASSWORD_HASH_LENGTH
  ).toString("hex");
  return {
    passwordDigest,
    passwordSalt,
  };
};

const createPasswordSalt = (): string => {
  return randomBytes(PASSWORD_SALT_LENGTH).toString("base64");
};

const checkPassword = (
  password: string,
  passwordSalt: string,
  passwordDigest: string
): boolean => {
  return (
    scryptSync(password, passwordSalt, PASSWORD_HASH_LENGTH).toString("hex") ===
    passwordDigest
  );
};
