import * as entities from "../../entities";
import { userRepository, sessionRepository } from "../../repositories";
import { Awaitable } from "../../types";

type Request = entities.RequestParamsFromEntity<
  entities.User,
  "email" | "password",
  null
>;

type Response = entities.Session;

export interface SignupUsecase {
  execute(signup: Request): Awaitable<Response>;
}

export class SignupUsecase implements SignupUsecase {
  constructor(
    private repos: {
      createUser: userRepository.createUser;
      createSession: sessionRepository.createSession;
    }
  ) {}

  async execute(signup: Request): Promise<Response> {
    const { passwordDigest, passwordSalt } = entities.digestPassword(
      signup.password
    );

    const u = await this.repos.createUser({
      email: signup.email,
      passwordDigest,
      passwordSalt,
    });

    const sessionToken = entities.createSessionToken();

    const s = await this.repos.createSession({
      userId: u.id,
      token: sessionToken,
    });
    return s;
  }
}
