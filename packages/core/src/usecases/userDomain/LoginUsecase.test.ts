import { digestPassword } from "../../entities";
import { LoginUsecase } from "./LoginUsecase";

describe("LoginUsecase", () => {
  test("", async () => {
    const expectedToken = "tokentoken";
    const usecase = new LoginUsecase({
      createSession: jest.fn((request: { userId: string; token: string }) => {
        return { id: "1", userId: "1", token: expectedToken };
      }),
      getUserByEmail: jest.fn((request: { email: string }) => {
        return {
          id: "1",
          email: request.email,
          ...digestPassword("password"),
        };
      }),
    });
    const session = await usecase.execute({
      email: "hoge@example.com",
      password: "password",
    });
    expect(session.id).not.toBeNull();
    expect(session.token).toBe(expectedToken);
  });
});
