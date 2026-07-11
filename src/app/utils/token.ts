import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { envVars } from "../../config/env";
import { Response } from "express";
import { CookieUtils } from "./cookie";
import ms, { StringValue } from "ms";

const getAccessToken = (payload: JwtPayload) => {
  const acccessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    {
      expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN,
    } as SignOptions,
  );
  return acccessToken;
};
const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    {
      expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
    } as SignOptions,
  );
  return refreshToken;
};

const isProduction = envVars.NODE_ENV === "production";
const cookieSameSite = "none";
const isSecureCookie = isProduction;

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: cookieSameSite,
    path: "/",
    maxAge: 60 * 60 * 24 * 1000,
  });
};
const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: cookieSameSite,
    path: "/",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
};

const setBetterAuthSessionCokkie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: cookieSameSite,
    path: "/",
    maxAge: 60 * 60 * 24 * 1000,
  });
};
export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setBetterAuthSessionCokkie,
  setRefreshTokenCookie,
};
