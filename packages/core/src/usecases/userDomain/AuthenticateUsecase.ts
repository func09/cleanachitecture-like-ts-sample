import { Awaitable } from "../../types";
import * as entities from "../../entities";
import { userRepository, sessionRepository } from "../../repositories";

type Request = entities.RequestParamsFromEntity<
  entities.Session,
  "token",
  null
>;

type Response = entities.User;

export interface AuthenticateUsecase {
  execute(sigauthenticationnin: Request): Awaitable<Response>;
}

export class AuthenticateUsecase implements AuthenticateUsecase {
  constructor(
    private repos: {
      getUser: userRepository.getUser;
      getSession: sessionRepository.getSession;
    }
  ) {}

  async execute(authentication: Request): Promise<Response> {
    const session = await this.repos.getSession({
      token: authentication.token,
    });
    const user = await this.repos.getUser({ id: session.userId });
    return user;
  }
}
