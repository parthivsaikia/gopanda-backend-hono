import prisma from "../../prisma/prisma-client";
import type { UserInputUserDTO } from "~/utils/types/userTypes";
export const createUser = async (data: UserInputUserDTO) => {
  try {
    const user = await prisma.user.create({
      data,
    });
    return user;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Error in creating user: ${error.message}`
        : `Unknown error in creating user.`;
    throw new Error(errorMessage);
  }
};
