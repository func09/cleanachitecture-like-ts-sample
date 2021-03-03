import { AuthenticateUsecase } from "./AuthenticateUsecase";
import { User, Session, digestPassword } from "../../entities";

describe("AuthenticateUsecase", () => {
  test("", async () => {
    const expectedId = "1";
    const expectedToken = "tokentoken";
    const usecase = new AuthenticateUsecase({
      getSession: jest.fn((request: { token: string }) => {
        return {
          id: "1",
          userId: expectedId,
          token: expectedToken,
        };
      }),
      getUser: jest.fn((request: { id: string }) => {
        return {
          id: request.id,
          email: "hoge@example.com",
        };
      }),
    });
    const user = await usecase.execute({
      token: expectedToken,
    });
    expect(user.id).toBe(expectedId);
  });
});
