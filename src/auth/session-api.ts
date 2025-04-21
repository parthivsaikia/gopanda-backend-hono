import type { User, Session } from "../../prisma/generated/prisma/index.js";

const generateSessionToken = (): string => {};

const createSession = async (
  token: string,
  userId: bigint,
): Promise<Session> => {};

const validateSession = async (
  token: string,
): Promise<SessionValidationResult> => {};

const invalidateSession = async (sessionId: string): Promise<void> => {};

const invalidateAllSessions = async (userId: bigint): Promise<void> => {};
