import { SignupUsecase } from "./SignupUsecase";

describe("SignupUsecase", () => {
  test("", async () => {
    const expectedToken = "tokentoken";
    const usecase = new SignupUsecase({
      createSession: jest.fn((request: { userId: string; token: string }) => {
        return { id: "1", userId: "1", token: expectedToken };
      }),
      createUser: jest.fn(
        (request: {
          email: string;
          passwordDigest: string;
          passwordSalt: string;
        }) => {
          return {
            id: "1",
            email: request.email,
          };
        }
      ),
    });
    const session = await usecase.execute({
      email: "hoge@example.com",
      password: "password",
    });
    expect(session.id).not.toBeNull();
    expect(session.token).toBe(expectedToken);
  });
});
