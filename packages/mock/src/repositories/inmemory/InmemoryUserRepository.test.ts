import { User } from "@zentask/core//entities";
import {
  store as userStore,
  createUserInmemory,
  updateUserInmemory,
  getUserInmemory,
  getUserByEmailInmemory,
} from "./InmemoryUserRepository";
describe("InmemoryUserRepository", () => {
  beforeEach(() => {
    while (userStore.length > 0) {
      userStore.pop();
    }
  });
  describe("createUser", () => {
    test("新しいユーザーを作成できる", () => {
      const user = createUserInmemory({
        email: "test@test.com",
        passwordDigest: "digest",
        passwordSalt: "salt",
      });
      expect(userStore.find((u) => u.email == "test@test.com")).toBe(user);
    });
  });

  describe("getUser", () => {
    let expectedUser: User;
    beforeEach(async () => {
      expectedUser = await createUserInmemory({
        email: "test@test.com",
        passwordDigest: "digest",
        passwordSalt: "salt",
      });
    });
    test("ユーザーを取得できる", () => {
      const user = getUserInmemory({ id: expectedUser.id });
      expect(user).toBe(expectedUser);
    });
  });

  describe("updateUser", () => {
    let expectedUser: User;
    beforeEach(async () => {
      expectedUser = await createUserInmemory({
        email: "test@test.com",
        passwordDigest: "digest",
        passwordSalt: "salt",
      });
    });
    test("ユーザーを更新できる", () => {
      const user = updateUserInmemory({
        id: expectedUser.id,
        email: "hoge@hoge.com",
      });
      expect(userStore.find((u) => u.id == expectedUser.id).email).toBe(
        "hoge@hoge.com"
      );
    });
  });

  describe("getUserByEmail", () => {
    let expectedUser: User;
    beforeEach(async () => {
      expectedUser = await createUserInmemory({
        email: "test@test.com",
        passwordDigest: "digest",
        passwordSalt: "salt",
      });
    });
    test("ユーザーをEmailで取得できる", () => {
      const user = getUserByEmailInmemory({ email: expectedUser.email });
      expect(user).toBe(expectedUser);
    });
  });
});
