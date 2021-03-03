import { userRepository } from "@zentask/core/repositories";
import { Awaitable } from "@zentask/core//types";
import { User } from "@zentask/core//entities";
import { v4 as uuid } from "uuid";

export let store: User[] = [];

export const createUserInmemory: userRepository.createUser = (
  user: userRepository.CreateUserRequest
) => {
  const newUser: User = Object.assign(user, { id: uuid() });
  store.push(newUser);
  return newUser;
};

export const getUserInmemory: userRepository.getUser = (
  user: userRepository.GetUserRequest
): Awaitable<User> => {
  const getUser: User = store.find((u) => {
    return u.id == user.id;
  });
  return getUser;
};

export const updateUserInmemory: userRepository.updateUser = (
  user: userRepository.UpdateUserRequest
): Awaitable<User> => {
  let updatedUser: User = store.find((u) => {
    return u.id == user.id;
  });
  updatedUser = Object.assign(updatedUser, user);
  return updatedUser;
};

export const getUserByEmailInmemory = (
  user: userRepository.GetUserByEmailRequest
): Awaitable<User> => {
  const getUser: User = store.find((u) => {
    return u.email == user.email;
  });
  return getUser;
};
