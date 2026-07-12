import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { envVars } from "../../config/env";
import { sendEmail } from "../utils/email";

// `better-auth` ships as ESM-only (no CJS build), so it can't be loaded with
// require() now that this project compiles to CommonJS. We lazily load it via
// dynamic import() and cache the instance so it's only initialized once.
let authPromise: ReturnType<typeof buildAuth> | null = null;

export const dynamicImport = new Function("specifier", "return import(specifier)") as <
  T = any,
>(
  specifier: string,
) => Promise<T>;
 async function buildAuth() {

  
  const { betterAuth } =
    await dynamicImport<typeof import("better-auth")>("better-auth");
  const { prismaAdapter } = await dynamicImport<
    typeof import("better-auth/adapters/prisma")
  >("better-auth/adapters/prisma");
  const { bearer, emailOTP } = await dynamicImport<
    typeof import("better-auth/plugins")
  >("better-auth/plugins");

  return betterAuth({
    baseURL: envVars.BETTER_AUTH_URL || "http://localhost:5000",
    secret: envVars.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
      google: {
        clientId: envVars.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE_CLIENT_SECRET,
        mapProfileToUser: () => {
          return {
            role: Role.PATIENT,
            status: UserStatus.ACTIVE,
            needPasswordChange: false,
            emailVerified: true,
            isDeleted: false,
            deletedAt: null,
          };
        },
      },
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: true,
          defaultValue: Role.PATIENT,
        },
        status: {
          type: "string",
          required: true,
          defaultValue: UserStatus.ACTIVE,
        },
        needPasswordChange: {
          type: "boolean",
          required: true,
          defaultValue: false,
        },
        isDeleted: {
          type: "boolean",
          required: true,
          defaultValue: false,
        },
        deletedAT: {
          type: "date",
          required: false,
          defaultValue: null,
        },
      },
    },
    plugins: [
      bearer(),
      emailOTP({
        overrideDefaultEmailVerification: true,
        async sendVerificationOTP({ email, otp, type }) {
          if (type === "email-verification") {
            const user = await prisma.user.findUnique({
              where: { email },
            });
            if (!user) {
              console.log(
                `User with email ${email} not found. Cannot send verification OTP.`,
              );
              return;
            }
            if (user && user.role === Role.SUPER_ADMIN) {
              console.log(
                `User with email ${email} is a super admin. Skipping sending verification OTP.`,
              );
              return;
            }
            if (user && !user.emailVerified) {
              sendEmail({
                to: email,
                subject: "Verify Your Email",
                templateName: "otp",
                templateData: {
                  name: user.name,
                  otp,
                },
              });
            }
          } else if (type === "forget-password") {
            const user = await prisma.user.findUnique({
              where: { email },
            });
            if (user) {
              sendEmail({
                to: email,
                subject: "Reset Your Password",
                templateName: "otp",
                templateData: {
                  name: user.name,
                  otp,
                },
              });
            }
          }
        },
        expiresIn: 2 * 60,
        otpLength: 6,
      }),
    ],
    session: {
      expiresIn: 60 * 60 * 60 * 24,
      updateAge: 60 * 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 60 * 60 * 24,
      },
    },

    redirectURLs: {
      signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`,
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:5000"],
    advanced: {
      useSecureCookies: false,
      cookies: {
        state: {
          attributes: {
            sameSite: "none",
            secure: true,
            path: "/",
            httpOnly: true,
          },
        },
      },
    },
  });
}

export function getAuth() {
  if (!authPromise) {
    authPromise = buildAuth();
  }
  return authPromise;
}
