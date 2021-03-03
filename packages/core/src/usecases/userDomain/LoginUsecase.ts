import { Awaitable } from "../../types";
import * as entities from "../../entities";
import { userRepository, sessionRepository } from "../../repositories";

type Request = entities.RequestParamsFromEntity<
  entities.User,
  "email" | "password",
  null
>;

type Response = entities.Session;

export interface LoginUsecase {
  execute(signin: Request): Awaitable<Response>;
}

export class LoginUsecase implements LoginUsecase {
  constructor(
    private repos: {
      getUserByEmail: userRepository.getUserByEmail;
      createSession: sessionRepository.createSession;
    }
  ) {}

  async execute(signin: Request): Promise<Response> {
    const user = await this.repos.getUserByEmail({
      email: signin.email,
    });

    if (
      entities.checkPassword(
        signin.password,
        user.passwordSalt,
        user.passwordDigest
      )
    ) {
      return await this.repos.createSession({
        userId: user.id,
        token: entities.createSessionToken(),
      });
    } else {
      throw new Error();
    }
  }
}
