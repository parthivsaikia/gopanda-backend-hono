import type { User, Session } from "../../prisma/generated/prisma/index.js";
import prisma from "../../prisma/prisma-client.js";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

const generateSessionToken = (): string => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

const createSession = async (
  token: string,
  userId: bigint,
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
};

const validateSession = async (
  token: string,
): Promise<SessionValidationResult> => {};

const invalidateSession = async (sessionId: string): Promise<void> => {};

const invalidateAllSessions = async (userId: bigint): Promise<void> => {};

export type SessionValidationResult =
  | { session: null; user: null }
  | { session: Session; user: User };
