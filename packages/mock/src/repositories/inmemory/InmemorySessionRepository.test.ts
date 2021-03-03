import faker from "faker";
import {
  store as sessionStore,
  createSessionInmemory,
  getSessionInmemory,
} from "./InmemorySessionRepository";

describe("InmemorySessionRepository", () => {
  beforeEach(() => {
    while (sessionStore.length > 0) {
      sessionStore.pop();
    }
  });
  describe("createSession", () => {
    test("新しいセッションを作成できる", () => {
      const token = faker.internet.ipv6();
      const session = createSessionInmemory({
        userId: "1",
        token: token,
      });
      expect(sessionStore.find((s) => s.token == token)).toBe(session);
    });
  });

  describe("getSession", () => {
    test("セッションを取得できる", () => {
      const token = faker.internet.ipv6();
      const expectedSession = createSessionInmemory({
        userId: "1",
        token: token,
      });
      const session = getSessionInmemory({ token: token });
      expect(session).toBe(expectedSession);
    });
  });
});
