import { Role, User, UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IregisterPatientPayload {
  name: string;
  email: string;
  password: string;
}
interface IloginUserPayload {
  email: string;
  password: string;
}
const resgisterPatient = async (payload: IregisterPatientPayload) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  if (!data.user) {
    throw new Error("failed to register patient");
  }

  //?Todo
  //   const patient = await prisma.$transaction(async(tx)=>{
  // await tx.p
  //   })

  return data;
};

const loginUser = async (payload: IloginUserPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is Blocked");
  }
  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new Error("User is deleted");
  }
  return data;
};
export const authService = {
  resgisterPatient,
  loginUser,
};
