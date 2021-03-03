import { sessionRepository } from "@zentask/core/repositories";
import { Session } from "@zentask/core//entities";
import { v4 as uuid } from "uuid";

export let store: Session[] = [];

export const getSessionInmemory: sessionRepository.getSession = (
  session: sessionRepository.GetSessionRequest
): Session => {
  const getSession: Session = store.find((s) => {
    return (s.token = session.token);
  });
  return getSession;
};

export const createSessionInmemory: sessionRepository.createSession = (
  session: sessionRepository.CreateSessionRequest
): Session => {
  const newSession: Session = Object.assign(session, { id: uuid() });
  store.push(newSession);
  store = store.map((session) => {
    return session.userId == newSession.userId ? newSession : session;
  });
  return newSession;
};
